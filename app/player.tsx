import React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'
import { inject, observer } from 'mobx-react'
import { AudioControls } from '@/components/AudioControls'
import { RecitationInfo } from '@/components/RecitationInfo'
import { ProgressBar } from '@/components/ProgressBar'

type PlayerProps = {
  nowPlaying: NowPlayingStore
}

function Player (props: PlayerProps) {
  console.log('RENDER')

  const notchColor = useThemeColor({ dark: '#444', light: 'lightgrey' }, 'secondaryText')

  return (
    <ThemedView style={styles.playerContainer}>
      <ThemedView style={[styles.notch, { backgroundColor: notchColor }]}></ThemedView>
      <ThemedView style={styles.image}></ThemedView>
      <ThemedView style={styles.progressBarContainer}>
        <ProgressBar nowPlaying={props.nowPlaying} />
      </ThemedView>
      <RecitationInfo nowPlaying={props.nowPlaying} />
      <AudioControls nowPlaying={props.nowPlaying} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  notch: {
    width: 40,
    height: 4,
    position: 'absolute',
    top: 20,
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 300,
    backgroundColor: '#222',
    borderRadius: 5,
  },
  progressBarContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default inject('nowPlaying')(observer(Player))