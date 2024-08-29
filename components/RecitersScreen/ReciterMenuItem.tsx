import { Keyboard, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { MaterialIcons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { MenuItem } from '@/components/Menu/MenuItem'
import { NowPlayingStore } from '@/globalState/store'
import { Reciter } from '@/domain/Reciter'

type ReciterMenuItemProps = {
  nowPlaying?: NowPlayingStore
  reciter: Reciter
}

export const ReciterMenuItem = inject('nowPlaying')(observer(
  (props: ReciterMenuItemProps) => {
    const tintColor = useThemeColor({}, 'tint')
    const isCurrentReciter = props.nowPlaying!.reciterId === props.reciter.id

    function handlePress () {
      Keyboard.dismiss()
      props.nowPlaying!.setReciterPage({ ...props.reciter })
    }

    return (
      <MenuItem
        title={props.reciter.name}
        href={{ pathname: '/reciter/[id]', params: { id: props.reciter.id } }}
        onPress={handlePress}
        endIcon={isCurrentReciter && (
          <MaterialIcons name="multitrack-audio" size={20} color={tintColor} style={styles.currentlyPlayingIcon}/> // TODO: create animated component
        )}
      >
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
