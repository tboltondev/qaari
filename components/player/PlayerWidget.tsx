import React from 'react'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import Jotai from 'jotai'
import { ThemedView, useThemeColor } from '@/theme'
import { surahData } from '@/constants/surahData'
import { selectedAyahRangeStartAtom } from '@/state/selectedAyahRange'
import { currentlyPlayingAtom } from '@/state/currentlyPlaying'
import { useAudioPlayerContext } from './AudioPlayerContext'
import { ProgressBar } from './ProgressBar'
import { RecitationInfo } from './RecitationInfo'
import { AudioControls } from './AudioControls'

export const PlayerWidget = () => {
  const audio = useAudioPlayerContext()
  const widgetBackground = useThemeColor({ light: '#fff' }, 'secondaryBackground')

  const selectedAyahRangeStart = Jotai.useAtomValue(selectedAyahRangeStartAtom)
  const currentlyPlaying = Jotai.useAtomValue(currentlyPlayingAtom)

  return audio.isLoaded && (
    <ThemedView style={[styles.container, { backgroundColor: widgetBackground }]}>
      <Link href='/player?fromWidget=true'>
        <ProgressBar
          audioDuration={audio.totalDuration}
          audioPosition={audio.currentTime}
          handleProgressBarPress={() => {}}
          isWidget
        />
        <ThemedView style={styles.widgetInfoAndControls}>
          <RecitationInfo
            surahName={selectedAyahRangeStart ? surahData[parseInt(selectedAyahRangeStart.split(':')[0])].name : undefined}
            reciterName={currentlyPlaying?.reciter?.name}
            isWidget
          />
          <AudioControls
            isWidget
            isPlaying={audio.isPlaying}
            handlePressPlay={audio.play}
            handlePressPause={audio.pause}
            handlePressBack={() => { }}
            handlePressNext={() => { }}
          />
        </ThemedView>
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '96%',
    left: '2%',
    bottom: 40,
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    paddingVertical: 16,
    borderRadius: 15
  },
  widgetInfoAndControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 10
  }
})
