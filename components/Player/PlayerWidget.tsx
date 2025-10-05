import React from 'react'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedView } from '@/components/theme/ThemedView'
import { AudioControls, ProgressBar, RecitationInfo, useAudioPlayerContext } from '.'

export const PlayerWidget = () => {
  const audio = useAudioPlayerContext()
  const widgetBackground = useThemeColor({ light: '#fff' }, 'secondaryBackground')

  return audio.player.isLoaded && (
    <ThemedView style={[styles.container, { backgroundColor: widgetBackground }]}>
      <Link href='/player?fromWidget=true'>
        <ProgressBar audioDuration={audio.player.duration} audioPosition={audio.status.currentTime} handleProgressBarPress={() => {}} isWidget />
        <ThemedView style={styles.widgetInfoAndControls}>
          <RecitationInfo surahName='-' reciterName='-' isWidget />
          <AudioControls
            isWidget
            isPlaying={audio.player.playing}
            handlePressPlay={() => audio.player.play()}
            handlePressPause={() => audio.player.pause()}
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
    marginTop: 10,
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 10
  }
})
