import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { NowPlayingStore } from '@/globalState/store'
import { Suwar } from '@/constants/Suwar'
import { observer } from 'mobx-react'
import { useThemeColor } from '@/hooks/useThemeColor'

type RecitationInfoProps = {
  isWidget?: boolean
  nowPlaying: NowPlayingStore
}

export const RecitationInfo = observer((props: RecitationInfoProps) => {
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <ThemedView style={props.isWidget ? styles.widgetContainer : styles.playerViewContainer}>
      <ThemedText style={[styles.surahName, !props.isWidget && styles.playerViewSurahName]}>
        {!props.nowPlaying.isLoading
          ? Suwar[props.nowPlaying.surahNumber - 1].name
          : '-' // TODO: loading component
        }
      </ThemedText>
      <ThemedText style={[{ color: secondaryTextColor }, !props.isWidget && styles.playerViewReciterName]}>
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
  surahName: {
    fontWeight: 'bold',
  },
  playerViewSurahName: {
    fontSize: 20,
  },
  playerViewReciterName: {
    fontSize: 18,
  },
  widgetContainer: {
    backgroundColor: 'transparent',
  },
})
