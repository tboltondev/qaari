import React from 'react'
import { GestureResponderEvent, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native'
import { ThemedView, ThemedText, useThemeColor } from '@/theme'

interface ProgressBarProps {
  isWidget?: boolean
  // Audio duration in seconds
  audioDuration: number
  // Current audio position in seconds
  audioPosition: number
  handleProgressBarPress: (event: GestureResponderEvent) => void
}

export const ProgressBar = (props: ProgressBarProps) => {
  const [progressBarWidth, setProgressBarWidth] = React.useState(0)

  function handleProgressBarLayoutChange (event: LayoutChangeEvent) {
    setProgressBarWidth(event.nativeEvent.layout.width)
  }

  // async function handleProgressBarPress (event: GestureResponderEvent) { // TODO: add seeking by touch drag
  //   const percentage = event.nativeEvent.locationX / progressBarWidth
  //   const newPositionInMs = percentage * props.audioDuration
  //   await props.nowPlaying.audio.setPositionAsync(newPositionInMs)
  // }

  function displayTime (timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600)
    const remainingSecsAfterHrs = timeInSeconds % 3600
    const minutes = Math.floor(remainingSecsAfterHrs / 60)
    const remainingSecsAfterMins = Math.round(remainingSecsAfterHrs % 60)

    const displayMins = minutes < 10 ? `0${minutes}` : `${minutes}`
    const displaySecs = remainingSecsAfterMins < 10 ? `0${remainingSecsAfterMins}` : `${remainingSecsAfterMins}`

    if (hours > 0) {
      return `${hours}:${displayMins}:${displaySecs}`
    }
    return `${displayMins}:${displaySecs}`
  }

  const activeColor = useThemeColor({}, 'text')
  const progressBarColor = useThemeColor({ dark: 'grey', light: 'lightgrey' }, 'secondaryText')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <Pressable style={props.isWidget ? styles.widgetPressable : styles.playerViewPressable} onPress={props.handleProgressBarPress}>
      <ThemedView
        style={[
          props.isWidget ? styles.widgetProgressBar : styles.playerViewProgressBar,
          { backgroundColor: progressBarColor }
        ]}
        onLayout={!props.isWidget ? handleProgressBarLayoutChange : undefined}
      >
        <ThemedView
          style={[
            styles.progressBarActive,
            {
              width: `${props.audioPosition / props.audioDuration * 100}%`,
              backgroundColor: activeColor
            }
          ]}
        />
      </ThemedView>
      {!props.isWidget && (
        <ThemedView style={styles.progressBarTimes}>
          <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
            {displayTime(props.audioPosition)}
          </ThemedText>
          <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
            {displayTime(props.audioDuration)}
          </ThemedText>
        </ThemedView>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  playerViewProgressBar: {
    width: '100%',
    height: 4,
    borderRadius: 20
  },
  widgetProgressBar: {
    width: '94%',
    height: 4,
    borderRadius: 20
  },
  progressBarActive: {
    position: 'absolute',
    height: 4,
    width: 0,
    borderRadius: 20
  },
  widgetPressable: {
    width: '100%',
    alignItems: 'center'
  },
  playerViewPressable: {
    position: 'absolute',
    width: 300,
    paddingTop: 20,
    top: -20,
    marginHorizontal: 6,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  progressBarTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  timeText: {
    fontSize: 14
  }
})
