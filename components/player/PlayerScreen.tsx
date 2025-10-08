import React from 'react'
import { StyleSheet } from 'react-native'
import Jotai from 'jotai'
import { useLocalSearchParams } from 'expo-router'
import uthmaniText from '@/constants/uthmani.hafs.json'
import TranlsationText from '@/constants/en-sahih.json'
import { getArabicNumber } from '@/utils/getArabicNumber'
import { selectedReciterAtom } from '@/globalState/selectedReciter'
import { selectedAyahRangeStartAtom } from '@/globalState/selectedAyahRange'
import { surahData } from '@/constants/surahData'
import { currentlyPlayingAtom } from '@/globalState/currentlyPlaying'
import { ayahTimingsAtom } from '@/globalState/ayahTimings'
import { ThemedView, useThemeColor } from '@/theme'
import { AudioControls, AyahText, ProgressBar, RecitationInfo, useAudioPlayerContext } from '.'

// TODO: could be a hook
async function getSurahAudioData (reciterId: number, surahNumber: number) {
  // TODO: move url
  const url = `https://api.qurancdn.com/api/qdc/audio/reciters/${reciterId}/audio_files?chapter=${surahNumber}&segments=true`
  const response = await fetch(url) // TODO: add return type
  const data = await response.json() // TODO: handle errors
  const audioUrl = data.audio_files[0].audio_url
  const ayahTimings = data.audio_files[0].verse_timings
  return { audioUrl, ayahTimings }
}

export const PlayerScreen = () => {
  const audio = useAudioPlayerContext()
  const notchColor = useThemeColor({ dark: '#444', light: 'lightgrey' }, 'secondaryText')

  const { fromWidget } = useLocalSearchParams()

  const selectedReciter = Jotai.useAtomValue(selectedReciterAtom)
  const selectedAyahRangeStart = Jotai.useAtomValue(selectedAyahRangeStartAtom)
  // const selectedAyahRangeEnd = Jotai.useAtomValue(selectedAyahRangeEndAtom)
  const [currentlyPlaying, setCurrentlyPlaying] = Jotai.useAtom(currentlyPlayingAtom)
  const [ayahTimings, setAyahTimings] = Jotai.useAtom(ayahTimingsAtom)

  // TODO: setting to select Quran font
  const ayahText = (uthmaniText as Record<string, string>)[`${currentlyPlaying?.surah}:${currentlyPlaying?.ayah}`]
  const ayahNumber = currentlyPlaying?.ayah ? getArabicNumber(currentlyPlaying.ayah) : null
  // TODO: use localisation lib
  const translationText = TranlsationText.find(ayah => ayah.verseKey === `${selectedAyahRangeStart?.split(':')[0]}:${currentlyPlaying?.ayah}`)?.text || ''

  React.useEffect(() => {
    if ((selectedReciter != null) && selectedAyahRangeStart && fromWidget !== 'true') {
      const selectedSurah = parseInt(selectedAyahRangeStart.split(':')[0])
      if (
        currentlyPlaying?.reciter.id === selectedReciter.id &&
        currentlyPlaying.surah === selectedSurah
      ) {
        // surah and reciter currently playing are the same as those selected when opening the player
        return
      }

      (async () => {
        const [startSurah, startAyah] = selectedAyahRangeStart?.split(':')
        // TODO: handle failure
        const surahData = await getSurahAudioData(parseInt(selectedReciter.id), parseInt(startSurah))

        setAyahTimings(surahData.ayahTimings)

        audio.player.replace(surahData.audioUrl)
        audio.player.play()

        setCurrentlyPlaying({ reciter: selectedReciter, surah: parseInt(startSurah), ayah: parseInt(startAyah) })
      })()
    }
  }, [audio.player,
    currentlyPlaying?.reciter,
    currentlyPlaying?.surah,
    selectedAyahRangeStart,
    selectedReciter,
    setAyahTimings,
    setCurrentlyPlaying,
    fromWidget]
  )

  React.useEffect(() => {
    const ayahIndex = ayahTimings?.findIndex((ayah) => {
      return ayah.timestamp_from < (audio.status.currentTime * 1000) * 1.01 && (audio.status.currentTime * 1000) * 1.01 <= ayah.timestamp_to
    })

    setCurrentlyPlaying(current => {
      if (current != null) {
        return { ...current, ayah: (ayahIndex || 0) + 1 }
      }
    })
  }, [audio.status.currentTime, ayahTimings, setCurrentlyPlaying])

  return (
    <ThemedView style={styles.playerContainer}>
      <ThemedView style={[styles.notch, { backgroundColor: notchColor }]} />

      <AyahText text={`${ayahText}${ayahNumber}`} translationText={translationText} />

      <ThemedView style={styles.progressBarContainer}>
        <ProgressBar audioDuration={audio.player.duration} audioPosition={audio.status.currentTime} handleProgressBarPress={() => {}} />
      </ThemedView>

      <RecitationInfo
        surahName={selectedAyahRangeStart ? surahData[parseInt(selectedAyahRangeStart.split(':')[0])].name : undefined}
        reciterName={currentlyPlaying?.reciter?.name}
      />

      <AudioControls
        isPlaying={audio.player.playing}
        handlePressPlay={() => audio.player.play()}
        handlePressPause={() => audio.player.pause()}
        handlePressBack={() => { }}
        handlePressNext={() => { }}
      />
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
