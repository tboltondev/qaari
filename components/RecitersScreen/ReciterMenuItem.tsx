import { inject, observer } from 'mobx-react'
import { MaterialIcons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { MenuItem } from '@/components/MenuItem'
import { ThemedText } from '@/components/ThemedText'
import { NowPlayingStore } from '@/globalState/store'
import { StyleSheet } from 'react-native'

type ReciterMenuItemProps = {
  id: number
  reciter_name: string
  style: string
  translated_name: {
    name: string
    language_name: string
  }

  nowPlaying: NowPlayingStore
}

export const ReciterMenuItem = inject('nowPlaying')(observer(
  (props: ReciterMenuItemProps) => {
    const secondaryTextColor = useThemeColor({}, 'secondaryText')
    const tintColor = useThemeColor({}, 'tint')
    const isCurrentReciter = props.nowPlaying.reciterId === props.id

    function handlePress () {
      props.nowPlaying.setReciterPage({ name: props.translated_name.name, id: props.id })
      props.nowPlaying.addReciter({ name: props.translated_name.name, id: props.id })
    }

    return (
      <MenuItem
        title={props.translated_name.name}
        href={{ pathname: '/reciter/[id]', params: { id: props.id } }}
        onPress={handlePress}
        endIcon={isCurrentReciter && (
          <MaterialIcons name="multitrack-audio" size={20} color={tintColor} style={styles.currentlyPlayingIcon}/> // TODO: create animated component
        )}
      >
        {props.style && (
          <ThemedText style={[styles.recitationStyleText, { color: secondaryTextColor }]}>
            {props.style}
          </ThemedText>
        )}
      </MenuItem>
    )
  }
))

const styles = StyleSheet.create({
  currentlyPlayingIcon: {
    marginStart: 'auto',
  },
  recitationStyleText: {
    fontSize: 12,
    margin: 0,
  }
})