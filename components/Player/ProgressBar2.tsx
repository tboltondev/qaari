import React from 'react'
import { GestureResponderEvent, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { observer } from 'mobx-react'
import { ThemedView } from '@/components/theme/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from '@/components/theme/ThemedText'
import { AudioControls2 } from '@/components/Player/AudioControls2'

interface ProgressBarProps {
  isWidget?: boolean
  // Audio duration in seconds
  audioDuration: number
  // Current audio position in seconds
  audioPosition: number
  handleProgressBarPress: (event: GestureResponderEvent) => void
}

type CommonProgressBarProps = ProgressBarProps & {
  onLayout: (event: LayoutChangeEvent) => void
  activeColor: string
  progressBarColor: string
}

const CommonProgressBar = observer((props: CommonProgressBarProps) => {
  return (
    <ThemedView
      style={[
        props.isWidget ? styles.widgetProgressBar : styles.playerViewProgressBar,
        { backgroundColor: props.progressBarColor }
      ]}
      onLayout={!props.isWidget ? props.onLayout : undefined}
    >
      <ThemedView
        style={[
          styles.progressBarActive,
          {
            width: `${props.audioPosition / props.audioDuration * 100}%`,
            backgroundColor: props.activeColor
          }
        ]}
      />
    </ThemedView>
  )
})

// TODO: could have a better name
export const ProgressBar2 = (props: ProgressBarProps) => {
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

  return props.isWidget
    ? (
      <Link href='/player' asChild>
        <Pressable style={styles.widgetPressable}>
          <CommonProgressBar
            isWidget
            audioDuration={props.audioDuration}
            audioPosition={props.audioPosition}
            onLayout={handleProgressBarLayoutChange}
            activeColor={activeColor}
            progressBarColor={progressBarColor}
          />
          <ThemedView style={styles.widgetInfoAndControls}>
            {/* <RecitationInfo nowPlaying={props.nowPlaying} isWidget /> */}
            <AudioControls2
              isWidget
              isPlaying={false}
              handlePressPlay={() => {}}
              handlePressPause={() => {}}
              handlePressBack={() => { }}
              handlePressNext={() => { }}
            />
          </ThemedView>
        </Pressable>
      </Link>
      )
    : (
      <Pressable style={styles.playerViewPressable} onPress={props.handleProgressBarPress}>
        <CommonProgressBar
          audioDuration={props.audioDuration}
          audioPosition={props.audioPosition}
          onLayout={handleProgressBarLayoutChange}
          activeColor={activeColor}
          progressBarColor={progressBarColor}
        />
        <ThemedView style={styles.progressBarTimes}>
          <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
            {displayTime(props.audioPosition)}
          </ThemedText>
          <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
            {displayTime(props.audioDuration)}
          </ThemedText>
        </ThemedView>
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
