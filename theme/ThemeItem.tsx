import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Pressable, StyleSheet } from 'react-native'

type ThemeItemProps = {
  name: string,
  onPress: () => void,
  active: boolean,
  description?: string,
};

export function ThemeItem ({ name, onPress, active, description }: ThemeItemProps) {
  const tintColor = useThemeColor({}, 'activeListItem')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.themeItem, active && { ...styles.activeThemeItem, backgroundColor: tintColor }]}>
        <ThemedText>{name}</ThemedText>
        <ThemedText style={[styles.themeItemDescription, { color: secondaryTextColor }]}>{description}</ThemedText>
      </ThemedView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  themeItem: {
    padding: 16,
    marginBottom: 16,
  },
  themeItemDescription: {
    fontSize: 14,
  },
  activeThemeItem: {
    borderRadius: 8,
  },
})
