import Jotai from 'jotai'
import { StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { MenuItem } from '@/components/Menu/MenuItem'
import { ThemedText } from '@/components/theme/ThemedText'
import { Reciter } from '@/domain/Reciter'
import { selectedReciterAtom } from '@/globalState/selectedReciter'

type ReciterMenuItemProps = Reciter

export const ReciterMenuItem = (props: ReciterMenuItemProps) => {
  const setCurrentReciter = Jotai.useSetAtom(selectedReciterAtom)

  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  function handlePress () {
    setCurrentReciter({ id: props.id.toString(), name: props.translatedName.name })
  }

  return (
    <MenuItem
      title={props.translatedName.name}
      href={{ pathname: '/reciter/[id]', params: { id: props.id } }}
      onPress={handlePress}
      // endIcon={isCurrentReciter && (
      //   <MaterialIcons name='multitrack-audio' size={20} color={tintColor} style={styles.currentlyPlayingIcon} /> // TODO: create animated component
      // )}
    >
      {props.style && (
        <ThemedText style={[styles.recitationStyleText, { color: secondaryTextColor }]}>
          {props.style}
        </ThemedText>
      )}
    </MenuItem>
  )
}

const styles = StyleSheet.create({
  currentlyPlayingIcon: {
    marginStart: 'auto'
  },
  recitationStyleText: {
    fontSize: 12,
    margin: 0
  }
})
