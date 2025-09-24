import { Pressable, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Ionicons } from '@expo/vector-icons'
import { ThemedView } from '@/components/theme/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'

interface AudioControlsProps {
  isWidget?: boolean
  nowPlaying: NowPlayingStore
}

export const AudioControls = observer((props: AudioControlsProps) => {
  const iconColor = useThemeColor({}, 'text')

  function pause () {
    props.nowPlaying.pause()
  }

  function play () {
    props.nowPlaying.play()
  }

  function handleBack () {
    props.nowPlaying.prev()
  }

  function handleForward () {
    props.nowPlaying.next()
  }

  return (
    <ThemedView style={props.isWidget ? styles.playerWidgetControls : styles.playerViewControls}>
      <Pressable onPress={handleBack}>
        <Ionicons name='play-back' size={props.isWidget ? 30 : 36} color={iconColor} />
      </Pressable>
      <Pressable
        onPress={props.nowPlaying.isPlaying ? pause : play}
        style={props.isWidget && styles.widgetPlayButton}
      >
        <Ionicons
          name={props.nowPlaying.isPlaying ? 'pause' : 'play'}
          size={props.isWidget ? 32 : 48} color={iconColor}
        />
      </Pressable>
      <Pressable onPress={handleForward}>
        <Ionicons name='play-forward' size={props.isWidget ? 30 : 36} color={iconColor} />
      </Pressable>
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  playerViewControls: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  playerWidgetControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  widgetPlayButton: {
    marginHorizontal: 20
  }
})
