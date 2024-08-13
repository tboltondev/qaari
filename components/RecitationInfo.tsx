import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { NowPlayingStore } from '@/globalState/store'
import { Suwar } from '@/constants/Suwar'
import { observer } from 'mobx-react'

type RecitationInfoProps = {
  isWidget?: boolean
  nowPlaying: NowPlayingStore
}

export const RecitationInfo = observer((props: RecitationInfoProps) => {
  return (
    <ThemedView style={props.isWidget ? styles.widgetContainer : styles.playerViewContainer}>
      <ThemedText>
        {!props.nowPlaying.isLoading
          ? Suwar[props.nowPlaying.surahNumber - 1].name
          : '-' // TODO: loading component
        }
      </ThemedText>
      <ThemedText>
        {!props.nowPlaying.isLoading
          ? props.nowPlaying.currentReciter?.name
          : '-' // TODO: loading component
        }
      </ThemedText>
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  playerViewContainer: {
    alignItems: 'center',
  },
  widgetContainer: {
    backgroundColor: 'transparent',
  },
})
