import { inject, observer } from 'mobx-react'
import {Ionicons} from '@expo/vector-icons'
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
    // const tintColor = useThemeColor({}, 'tint')

    function handlePress () {
      props.nowPlaying?.load(props.reciterId, props.surahNumber)
    }

    return (
      <MenuItem
        title={<MenuText surahNumber={props.surahNumber} name={props.name} arabicName={props.arabicName} isPlaying={isCurrentReciter && isCurrentSurah} />}
        href='/player'
        onPress={(!isCurrentReciter || !isCurrentSurah) ? handlePress : undefined}
      />
    )
  }
))

const MenuText = (props: { surahNumber: number, name: string, isPlaying: boolean, arabicName?: string }) => {
  const secondaryTextColor = useThemeColor({}, 'secondaryText')
  const tintColor = useThemeColor({}, 'tint')

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.localisedSurahName}>
        {<ThemedText style={{ color: secondaryTextColor }}>
          {props.isPlaying ? <Ionicons name="volume-medium" size={20} color={tintColor} /> : props.surahNumber}{'  '}
        </ThemedText>}
        <ThemedText>{props.name}</ThemedText>
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
  },
  currentlyPlaying: {
    color: 'blue'
  },
  localisedSurahName: {
    flexDirection: 'row',
  },
  arabicSurahName: {
    fontFamily: 'Uthmani', // TODO: user select this font
    fontSize: 22,
    lineHeight: 33, // TODO: might need to be dynamic depending on font
    paddingEnd: 12
  }
})
