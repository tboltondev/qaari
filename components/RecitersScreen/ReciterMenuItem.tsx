import { inject, observer } from 'mobx-react'
import { MaterialIcons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { MenuItem } from '@/components/Menu/MenuItem'
import { ThemedText } from '@/components/theme/ThemedText'
import { NowPlayingStore } from '@/globalState/store'
import { StyleSheet } from 'react-native'
import { Reciter } from '@/domain/Reciter'

type ReciterMenuItemProps = Reciter & {
  nowPlaying: NowPlayingStore
}

export const ReciterMenuItem = inject('nowPlaying')(observer(
  (props: ReciterMenuItemProps) => {
    const secondaryTextColor = useThemeColor({}, 'secondaryText')
    const tintColor = useThemeColor({}, 'tint')
    const isCurrentReciter = props.nowPlaying.reciterId === props.id

    function handlePress () {
      props.nowPlaying.setReciterPage({ name: props.translatedName.name, id: props.id })
      props.nowPlaying.addReciter({ name: props.translatedName.name, id: props.id })
    }

    return (
      <MenuItem
        title={props.translatedName.name}
        href={{ pathname: '/reciter/[id]', params: { id: props.id } }}
        onPress={handlePress}
        endIcon={isCurrentReciter && (
          <MaterialIcons name='multitrack-audio' size={20} color={tintColor} style={styles.currentlyPlayingIcon} /> // TODO: create animated component
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
    marginStart: 'auto'
  },
  recitationStyleText: {
    fontSize: 12,
    margin: 0
  }
})
