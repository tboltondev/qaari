import React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'
import { inject, observer } from 'mobx-react'
import { AudioControls } from '@/components/AudioControls'
import { RecitationInfo } from '@/components/RecitationInfo'
import { ProgressBar } from '@/components/ProgressBar'
import { ThemedText } from '@/components/ThemedText'

type PlayerProps = {
  nowPlaying: NowPlayingStore
}

function Player (props: PlayerProps) {
  console.log('RENDER')

  function displayTime (ms: number) {
    const seconds = ms / 1000
    const hours = Math.floor(seconds / 3600)
    const remainingSecsAfterHrs = seconds % 3600
    const minutes = Math.floor(remainingSecsAfterHrs / 60)
    const remainingSecsAfterMins = Math.round(remainingSecsAfterHrs % 60)

    const displayMins = minutes < 10 ? `0${minutes}` : `${minutes}`
    const displaySecs = remainingSecsAfterMins < 10 ? `0${remainingSecsAfterMins}` : `${remainingSecsAfterMins}`

    if (hours > 0) {
      return `${hours}:${displayMins}:${displaySecs}`
    }
    return `${displayMins}:${displaySecs}`
  }

  const notchColor = useThemeColor({ dark: '#444', light: 'lightgrey' }, 'secondaryText')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <ThemedView style={styles.playerContainer}>

      <ThemedView style={[styles.notch, { backgroundColor: notchColor }]}></ThemedView>

      <ThemedView style={styles.image}></ThemedView>

      <ThemedView style={styles.progressBarContainer}>
        <ProgressBar nowPlaying={props.nowPlaying}>
          <ThemedView style={styles.progressBarTimes}>
            <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
              {displayTime(props.nowPlaying.audioPositionMs)}
            </ThemedText>
            <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
              {displayTime(props.nowPlaying.audioDurationMs)}
            </ThemedText>
          </ThemedView>
        </ProgressBar>
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
  progressBarTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
  },
})

export default inject('nowPlaying')(observer(Player))