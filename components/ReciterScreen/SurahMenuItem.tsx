import { inject, observer } from 'mobx-react'
import { MaterialIcons } from '@expo/vector-icons'
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
  nowPlaying?: NowPlayingStore // made nullable so component is not expecting prop, if injected it will not be null
}

export const SurahMenuItem = inject('nowPlaying')(observer(
  (props: SurahItemProps) => {
    const isCurrentReciter = props.nowPlaying?.reciterId === props.reciterId
    const isCurrentSurah = props.nowPlaying?.surahNumber === props.surahNumber
    const tintColor = useThemeColor({}, 'tint')

    function handlePress () {
      props.nowPlaying?.load(props.reciterId, props.surahNumber)
    }

    return (
      <MenuItem
        title={<Title surahNumber={props.surahNumber} name={props.name} />}
        href='/player'
        onPress={(!isCurrentReciter || !isCurrentSurah) ? handlePress : undefined}
        endIcon={isCurrentReciter && isCurrentSurah && (
          <MaterialIcons name='multitrack-audio' size={20} color={tintColor} style={{ marginLeft: 'auto' }} /> // TODO: animate this
        )}
      />
    )
  }
))

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
