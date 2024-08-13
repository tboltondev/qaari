import React from 'react'
import { GestureResponderEvent, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import { Suwar } from '@/constants/Suwar'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'
import { inject, observer } from 'mobx-react'

type PlayerProps = {
  nowPlaying: NowPlayingStore
}

function Player (props: PlayerProps) {
  const [progressBarWidth, setProgressBarWidth] = React.useState<number>(0)

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

  function handleProgressBarLayoutChange (event: LayoutChangeEvent) {
    setProgressBarWidth(event.nativeEvent.layout.width)
  }

  async function handleProgressBarPress (event: GestureResponderEvent) { // TODO: add seeking by touch drag
    const percentage = event.nativeEvent.locationX / progressBarWidth
    const newPositionInMs = percentage * props.nowPlaying.audioDurationMs
    await props.nowPlaying.audio.setPositionAsync(newPositionInMs)
  }

  function pause () {
    props.nowPlaying.pause()
  }

  function play () {
    props.nowPlaying.play()
  }

  function getPosition () {
    return displayTime(props.nowPlaying.audioPositionMs)
  }

  function getDuration () {
    return props.nowPlaying.audioDurationMs === 0
      ? '--:--'
      : displayTime(props.nowPlaying.audioDurationMs)
  }

  function handleBack () {
    props.nowPlaying.prev()
  }

  function handleForward () {
    props.nowPlaying.next()
  }

  const textColor = useThemeColor({}, 'text')
  const progressBarColor = useThemeColor({ dark: 'grey', light: 'lightgrey' }, 'secondaryText')
  const notchColor = useThemeColor({ dark: '#444', light: 'lightgrey' }, 'secondaryText')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <ThemedView style={styles.playerContainer}>

      <ThemedView style={[styles.notch, { backgroundColor: notchColor }]}></ThemedView>

      <ThemedView style={styles.image}></ThemedView>

      <ThemedView style={styles.progressBarContainer}>
        <Pressable style={styles.progressBarPressable} onPress={handleProgressBarPress}>
          <ThemedView
            style={[
              styles.progressBar,
              { backgroundColor: progressBarColor }
            ]}
            onLayout={handleProgressBarLayoutChange}
          >
            <ThemedView style={[
              styles.progressBarActive,
              !props.nowPlaying.isLoading && {
                width: `${props.nowPlaying.percentageElapsed}%`,
                backgroundColor: textColor,
              }
            ]}></ThemedView>
          </ThemedView>
          <ThemedView style={styles.progressBarTimes}>
            <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
              {!props.nowPlaying.isLoading && getPosition()}
            </ThemedText>
            <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
              {!props.nowPlaying.isLoading && getDuration()}
            </ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.recitationInfo}>
        <ThemedText>{!props.nowPlaying.isLoading && Suwar[props.nowPlaying.surahNumber - 1].name}</ThemedText>
        <ThemedText>
          {!props.nowPlaying.isLoading && props.nowPlaying.currentReciter?.name}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.controls}>
        <Pressable onPress={handleBack}>
          <Ionicons name="play-back" size={36} color={textColor}/>
        </Pressable>
        <Pressable onPress={props.nowPlaying.isPlaying ? pause : play}>
          <Ionicons name={props.nowPlaying.isPlaying ? 'pause' : 'play'} size={48} color={textColor}/>
        </Pressable>
        <Pressable onPress={handleForward}>
          <Ionicons name="play-forward" size={36} color={textColor}/>
        </Pressable>
      </ThemedView>

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
  recitationInfo: {
    alignItems: 'center',
  },
  controls: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 20,
  },
  progressBarActive: {
    position: 'absolute',
    height: 4,
    width: 0,
    borderRadius: 20,
  },
  progressBarPressable: {
    position: 'absolute',
    width: 300,
    paddingTop: 20,
    top: -20,
    marginHorizontal: 6,
    backgroundColor: 'transparent',
    justifyContent: 'center',
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