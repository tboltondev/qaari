import { inject, observer } from 'mobx-react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedView } from '@/components/theme/ThemedView'
import { ThemedText } from '@/components/theme/ThemedText'
import { MenuItem } from '@/components/Menu/MenuItem'
import { NowPlayingStore } from '@/globalState/store'
import { StyleSheet } from 'react-native'

interface SurahItemProps {
  surahNumber: number
  reciterId: number
  name: string
  arabicName?: string
  nowPlaying?: NowPlayingStore // made nullable so component is not expecting prop, if injected it will not be null
}

export const SurahMenuItem = inject('nowPlaying')(observer(
  (props: SurahItemProps) => {
    const isCurrentReciter = props.nowPlaying?.reciterId === props.reciterId
    const isCurrentSurah = props.nowPlaying?.surahNumber === props.surahNumber
    const secondaryBackgroundColor = useThemeColor({}, 'secondaryBackground')

    function handlePress () {
      props.nowPlaying?.load(props.reciterId, props.surahNumber)
    }

    return (
      <MenuItem
        style={isCurrentSurah && isCurrentReciter && { backgroundColor: secondaryBackgroundColor, borderRadius: 15 }}
        title={<MenuText surahNumber={props.surahNumber} name={props.name} arabicName={props.arabicName} />}
        href='/player'
        onPress={(!isCurrentReciter || !isCurrentSurah) ? handlePress : undefined}
      />
    )
  }
))

const MenuText = (props: { surahNumber: number, name: string, arabicName?: string }) => {
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
      <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.localisedSurahName}>
        <ThemedText style={{ color: secondaryTextColor }}>
          {props.surahNumber}{'  '}
        </ThemedText>
        <ThemedText>
          {props.name}
        </ThemedText>
      </ThemedView>
      {props.arabicName && <ThemedText style={styles.arabicSurahName}>{props.arabicName}</ThemedText>}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  currentlyPlaying: {
    color: 'blue'
  },
  localisedSurahName: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  arabicSurahName: {
    fontFamily: 'Uthmani', // TODO: user select this font
    fontSize: 22,
    lineHeight: 33, // TODO: might need to be dynamic depending on font
    paddingEnd: 12
  }
})
