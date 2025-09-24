import React from 'react'
import { StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { ThemedView } from '@/components/theme/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'
import { AudioControls } from '@/components/Player/AudioControls'
import { RecitationInfo } from '@/components/Player/RecitationInfo'
import { ProgressBar } from '@/components/Player/ProgressBar'
import { ThemedText } from '@/components/theme/ThemedText'
import UthmaniText from '@/constants/UthmaniHafsText.json'
import TranlsationText from '@/constants/en-sahih.json'
import { getArabicNumber } from '@/utils/getArabicNumber'

interface PlayerProps {
  nowPlaying?: NowPlayingStore
}

export const PlayerScreen = inject('nowPlaying')(observer(
  (props: PlayerProps) => {
    const notchColor = useThemeColor({ dark: '#444', light: 'lightgrey' }, 'secondaryText')
    // TODO: setting to select Quran font
    const text = UthmaniText.find(ayah => ayah.verseKey === `${props.nowPlaying?.surahNumber}:${props.nowPlaying?.currentAyah}`)?.text || ''
    const ayahNumber = props.nowPlaying?.currentAyah ? getArabicNumber(props.nowPlaying.currentAyah) : null
    // TODO: use localisation lib
    const tranlsationText = TranlsationText.find(ayah => ayah.verseKey === `${props.nowPlaying?.surahNumber}:${props.nowPlaying?.currentAyah}`)?.text || ''

    return (
      <ThemedView style={styles.playerContainer}>
        <ThemedView style={[styles.notch, { backgroundColor: notchColor }]} />
        <ThemedView style={styles.textContainer}>
          <ThemedText style={styles.text}>
            {text} {ayahNumber}
          </ThemedText>
          <ThemedText style={styles.translationText}>
            {tranlsationText}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.progressBarContainer}>
          <ProgressBar nowPlaying={props.nowPlaying!} />
        </ThemedView>
        <RecitationInfo nowPlaying={props.nowPlaying!} />
        <AudioControls nowPlaying={props.nowPlaying!} />
      </ThemedView>
    )
  }
))

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
  textContainer: {
    width: '90%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    fontFamily: 'Uthmani',
    fontSize: 26,
    lineHeight: 44,
    textAlign: 'center'
  },
  translationText: {
    fontSize: 16,
    textAlign: 'center'
  },
  progressBarContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
