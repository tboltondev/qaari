import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/theme/ThemedView'
import { ThemedText } from '@/components/theme/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

interface RecitationInfoProps {
  isWidget?: boolean
  surahName?: string
  reciterName?: string
}

export const RecitationInfo = (props: RecitationInfoProps) => {
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <ThemedView style={props.isWidget ? styles.widgetContainer : styles.playerViewContainer}>
      <ThemedText style={[styles.surahName, !props.isWidget && styles.playerViewSurahName]}>
        {/* TODO: show surah name in arabic as well as well as selected lang */}
        {props.surahName ?? '-'}
      </ThemedText>
      <ThemedText style={[{ color: secondaryTextColor }, !props.isWidget && styles.playerViewReciterName]}>
        {/* TODO: show reciter name in arabic as well as well as selected lang */}
        {props.reciterName ?? '-'}
      </ThemedText>
    </ThemedView>
  )
}

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
