import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ThemedView } from '@/components/theme/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'

interface AudioControlsProps {
  isWidget?: boolean
  isPlaying: boolean
  handlePressPlay: () => void
  handlePressPause: () => void
  handlePressNext: () => void
  handlePressBack: () => void
}

export const AudioControls2 = (props: AudioControlsProps) => {
  const iconColor = useThemeColor({}, 'text')

  function pause () {
      props.handlePressPause()
  }

  function play () {
      props.handlePressPlay()
  }

  function handleBack () {
    props.handlePressBack()
  }

  function handleForward () {
      props.handlePressNext()
  }

  return (
    <ThemedView style={props.isWidget ? styles.playerWidgetControls : styles.playerViewControls}>
      <Pressable onPress={handleBack}>
        <Ionicons name='play-back' size={props.isWidget ? 30 : 36} color={iconColor} />
      </Pressable>
      <Pressable
        onPress={props.isPlaying ? pause : play}
        style={props.isWidget && styles.widgetPlayButton}
      >
        <Ionicons
          name={props.isPlaying ? 'pause' : 'play'}
          size={props.isWidget ? 32 : 48} color={iconColor}
        />
      </Pressable>
      <Pressable onPress={handleForward}>
        <Ionicons name='play-forward' size={props.isWidget ? 30 : 36} color={iconColor} />
      </Pressable>
    </ThemedView>
  )
}

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
