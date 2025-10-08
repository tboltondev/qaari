import { StyleSheet } from 'react-native'
import Jotai from 'jotai'
import { ThemedView, ThemedText, useThemeColor } from '@/theme'
import { MenuItem } from '@/components/menu/MenuItem'
import { selectedAyahRangeEndAtom, selectedAyahRangeStartAtom } from '@/state/selectedAyahRange'
import { surahData } from '@/constants/surahData'

interface SurahItemProps {
  surahNumber: number
  reciterId: number
  name: string
}

export const SurahMenuItem = (props: SurahItemProps) => {
  const setAyahRangeStart = Jotai.useSetAtom(selectedAyahRangeStartAtom)
  const setAyahRangeEnd = Jotai.useSetAtom(selectedAyahRangeEndAtom)

  function handlePress () {
    setAyahRangeStart(`${props.surahNumber}:1}`)
    setAyahRangeEnd(`${props.surahNumber}:${surahData[props.surahNumber].length}`)
    // could load audio here
  }

  return (
    <MenuItem
      title={<Title surahNumber={props.surahNumber} name={props.name} />}
      href='/player'
      onPress={handlePress}
      // endIcon={isCurrentReciter && isCurrentSurah && (
      //   <MaterialIcons name='multitrack-audio' size={20} color={tintColor} style={{ marginLeft: 'auto' }} /> // TODO: animate this
      // )}
    />
  )
}

const Title = (props: { surahNumber: number, name: string }) => {
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText style={{ color: secondaryTextColor }}>{props.surahNumber}  </ThemedText>
      <ThemedText>{props.name}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row'
  }
})
