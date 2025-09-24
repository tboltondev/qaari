import React from 'react'
import { GestureResponderEvent, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { observer } from 'mobx-react'
import { ThemedView } from '@/components/theme/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'
import { ThemedText } from '@/components/theme/ThemedText'
import { RecitationInfo } from '@/components/Player/RecitationInfo'
import { AudioControls } from '@/components/Player/AudioControls'

interface ProgressBarProps {
  isWidget?: boolean
  nowPlaying: NowPlayingStore
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
            width: `${props.nowPlaying.percentageElapsed}%`,
            backgroundColor: props.activeColor
          }
        ]}
      />
    </ThemedView>
  )
})

export const ProgressBar = observer((props: ProgressBarProps) => {
  const [progressBarWidth, setProgressBarWidth] = React.useState(0)

  function handleProgressBarLayoutChange (event: LayoutChangeEvent) {
    setProgressBarWidth(event.nativeEvent.layout.width)
  }

  async function handleProgressBarPress (event: GestureResponderEvent) { // TODO: add seeking by touch drag
    const percentage = event.nativeEvent.locationX / progressBarWidth
    const newPositionInMs = percentage * props.nowPlaying.audioDurationMs
    await props.nowPlaying.audio.setPositionAsync(newPositionInMs)
  }

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

  const activeColor = useThemeColor({}, 'text')
  const progressBarColor = useThemeColor({ dark: 'grey', light: 'lightgrey' }, 'secondaryText')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return props.isWidget
    ? (
      <Link href='/player' asChild>
        <Pressable style={styles.widgetPressable}>
          <CommonProgressBar
            isWidget
            nowPlaying={props.nowPlaying}
            onLayout={handleProgressBarLayoutChange}
            activeColor={activeColor}
            progressBarColor={progressBarColor}
          />
          <ThemedView style={styles.widgetInfoAndControls}>
            <RecitationInfo nowPlaying={props.nowPlaying} isWidget />
            <AudioControls nowPlaying={props.nowPlaying} isWidget />
          </ThemedView>
        </Pressable>
      </Link>
      )
    : (
      <Pressable style={styles.playerViewPressable} onPress={handleProgressBarPress}>
        <CommonProgressBar
          nowPlaying={props.nowPlaying}
          onLayout={handleProgressBarLayoutChange}
          activeColor={activeColor}
          progressBarColor={progressBarColor}
        />
        <ThemedView style={styles.progressBarTimes}>
          <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
            {displayTime(props.nowPlaying.audioPositionMs)}
          </ThemedText>
          <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
            {displayTime(props.nowPlaying.audioDurationMs)}
          </ThemedText>
        </ThemedView>
      </Pressable>
      )
})

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
