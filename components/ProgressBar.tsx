import React from 'react'
import { GestureResponderEvent, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { observer } from 'mobx-react'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'

type ProgressBarProps = {
  isWidget?: boolean
  nowPlaying: NowPlayingStore
  children?: React.ReactNode
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
            backgroundColor: props.activeColor,
          }
        ]}
      ></ThemedView>
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

  const activeColor = useThemeColor({}, 'text')
  const progressBarColor = useThemeColor({ dark: 'grey', light: 'lightgrey' }, 'secondaryText')

  return props.isWidget ? (
    <Link href="/player" asChild>
      <Pressable style={styles.widgetPressable}>
        <CommonProgressBar
          isWidget
          nowPlaying={props.nowPlaying}
          onLayout={handleProgressBarLayoutChange}
          activeColor={activeColor}
          progressBarColor={progressBarColor}
        />
        {props.children}
      </Pressable>
    </Link>
  ) : (
    <Pressable style={styles.playerViewPressable} onPress={handleProgressBarPress}>
      <CommonProgressBar
        nowPlaying={props.nowPlaying}
        onLayout={handleProgressBarLayoutChange}
        activeColor={activeColor}
        progressBarColor={progressBarColor}
      />
      {props.children}
    </Pressable>
  )
})

const styles = StyleSheet.create({
  playerViewProgressBar: {
    width: '100%',
    height: 4,
    borderRadius: 20,
  },
  widgetProgressBar: {
    width: '94%',
    height: 4,
    borderRadius: 20,
  },
  progressBarActive: {
    position: 'absolute',
    height: 4,
    width: 0,
    borderRadius: 20,
  },
  widgetPressable: {
    width: '100%',
    alignItems: 'center',
  },
  playerViewPressable: {
    position: 'absolute',
    width: 300,
    paddingTop: 20,
    top: -20,
    marginHorizontal: 6,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
})
