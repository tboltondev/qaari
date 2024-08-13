import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { NowPlayingStore } from '@/globalState/store'
import { Suwar } from '@/constants/Suwar'

type RecitationInfoProps = {
  isWidget?: boolean
  nowPlaying: NowPlayingStore
}

export const RecitationInfo = (props: RecitationInfoProps) => {
  return (
    <ThemedView style={props.isWidget ? styles.widgetContainer : styles.playerViewContainer}>
      <ThemedText>
        {!props.nowPlaying.isLoading
          ? Suwar[props.nowPlaying.surahNumber - 1].name
          : '-'
        }
      </ThemedText>
      <ThemedText>
        {!props.nowPlaying.isLoading
          ? props.nowPlaying.currentReciter?.name
          : '-'
        }
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  playerViewContainer: {
    alignItems: 'center',
  },
  widgetContainer: {
    backgroundColor: 'transparent',
  },
})
