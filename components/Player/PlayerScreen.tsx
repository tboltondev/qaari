import React from 'react'
import {StyleSheet} from 'react-native'
import { ThemedView } from '@/components/theme/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { RecitationInfo } from '@/components/Player/RecitationInfo'
import uthmaniText from '@/constants/uthmani.hafs.json'
import TranlsationText from '@/constants/en-sahih.json'
import { getArabicNumber } from '@/utils/getArabicNumber'
import Jotai from "jotai";
import {currentReciterAtom} from "@/globalState/currentReciter";
import {currentAyahRangeEndAtom, currentAyahRangeStartAtom} from "@/globalState/currentAyahRange";
import {useAudioPlayerContext} from "@/components/Player/AudioPlayerContext";
import {AudioControls2} from "@/components/Player/AudioControls2";
import {ProgressBar2} from "@/components/Player/ProgressBar2";
import {AyahText} from "@/components/Player/AyahText";
import {surahData} from "@/constants/surahData";

// TODO: could be a hook
async function getSurahAudioData (reciterId: number, surahNumber: number) {
  // TODO: move url
  const url = `https://api.qurancdn.com/api/qdc/audio/reciters/${reciterId}/audio_files?chapter=${surahNumber}&segments=true`
  const response = await fetch(url) // TODO: add return type
  const data = await response.json() // TODO: handle errors
  const audioUrl = data.audio_files[0].audio_url
  const ayahTimings = data.audio_files[0].verse_timings
  console.log(JSON.stringify(ayahTimings, null, 2))
  return { audioUrl, ayahTimings }
}

export const PlayerScreen = () => {
    const audio = useAudioPlayerContext()
    const [audioUrl, setAudioUrl] = React.useState<string>()
    const [ayahTimings, setAyahTimings] = React.useState<any[]>() // TODO: type for ayah times
    const [currentAyah, setCurrentAyah] = React.useState<number>()

    const currentReciter = Jotai.useAtomValue(currentReciterAtom)
    const ayahRangeStart = Jotai.useAtomValue(currentAyahRangeStartAtom)
    const ayahRangeEnd = Jotai.useAtomValue(currentAyahRangeEndAtom)

    const notchColor = useThemeColor({ dark: '#444', light: 'lightgrey' }, 'secondaryText')
    // TODO: setting to select Quran font
    const ayahText = uthmaniText[`${ayahRangeStart?.split(":")[0]}:${currentAyah}`]
    const ayahNumber = currentAyah ? getArabicNumber(currentAyah) : null
    // TODO: use localisation lib
    const translationText = TranlsationText.find(ayah => ayah.verseKey === `${ayahRangeStart?.split(":")[0]}:${currentAyah}`)?.text || ''

    React.useEffect(() => {
      async function getAudioUrl() {
        if (!currentReciter || !ayahRangeStart) {
          console.error(`Could not load audio. reciter: ${currentReciter}, ayah range start: ${ayahRangeStart}`) // TODO: proper log capture
          return;
        }
        const startSurah = ayahRangeStart?.split(":")[0] // TODO: extract
        const surahData = await getSurahAudioData(parseInt(currentReciter), parseInt(startSurah))
        setAudioUrl(surahData.audioUrl)
        setAyahTimings(surahData.ayahTimings)
      }
      getAudioUrl() // doesn't need to be awaited
    }, [currentReciter, ayahRangeStart])

    React.useEffect(() => {
      if (!audioUrl) return;
      audio.player.replace(audioUrl)
    }, [audioUrl, audio.player])

    React.useEffect(() => {
      const ayahIndex = ayahTimings?.findIndex((ayah) => {
        return ayah.timestamp_from < (audio.status.currentTime * 1000) * 1.01 && (audio.status.currentTime * 1000) * 1.01 <= ayah.timestamp_to
      })

      console.log(audio.status.currentTime, ayahIndex)

      setCurrentAyah((ayahIndex || 0) + 1)
    }, [audio.status.currentTime, ayahTimings])

    return (
      <ThemedView style={styles.playerContainer}>
        <ThemedView style={[styles.notch, { backgroundColor: notchColor }]} />

        <AyahText text={`${ayahText} ${ayahNumber}`} translationText={translationText} />

        <ThemedView style={styles.progressBarContainer}>
          <ProgressBar2 audioDuration={audio.player.duration} audioPosition={audio.status.currentTime} handleProgressBarPress={() => {}} />
        </ThemedView>

        <RecitationInfo surahName={ayahRangeStart ? surahData[parseInt(ayahRangeStart.split(":")[0])].name : undefined} reciterName={'Fix reciter name'} />

        <AudioControls2
          isPlaying={audio.player.playing}
          handlePressPlay={() => audio.player.play()}
          handlePressPause={() => audio.player.pause()}
          handlePressBack={() => { }}
          handlePressNext={() => { }}/>
      </ThemedView>
    )
  }

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  notch: {
    width: 40,
    height: 4,
    position: 'absolute',
    top: 20,
    borderRadius: 10
  },
  progressBarContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
