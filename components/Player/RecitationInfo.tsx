import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/theme/ThemedView'
import { ThemedText } from '@/components/theme/ThemedText'
import { NowPlayingStore } from '@/globalState/store'
import SurahNames from '@/content/quran/surahNames.en.json'
import { observer } from 'mobx-react'
import { useThemeColor } from '@/hooks/useThemeColor'

interface RecitationInfoProps {
  isWidget?: boolean
  nowPlaying: NowPlayingStore
}

export const RecitationInfo = observer((props: RecitationInfoProps) => {
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <ThemedView style={props.isWidget ? styles.widgetContainer : styles.playerViewContainer}>
      <ThemedText style={[styles.surahName, !props.isWidget && styles.playerViewSurahName]}>
        {/* TODO: show surah name in arabic as well as well as selected lang */}
        {!props.nowPlaying.isLoading
          ? SurahNames[props.nowPlaying.surahNumber - 1].name
          : '-' // TODO: loading component
        }
      </ThemedText>
      <ThemedText style={[{ color: secondaryTextColor }, !props.isWidget && styles.playerViewReciterName]}>
        {/* TODO: show reciter name in arabic as well as well as selected lang */}
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
    alignItems: 'center'
  },
  surahName: {
    fontWeight: 'bold'
  },
  playerViewSurahName: {
    fontSize: 20
  },
  playerViewReciterName: {
    fontSize: 18
  },
  widgetContainer: {
    backgroundColor: 'transparent'
  }
})
