import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { AppThemeContext, ThemeOptions } from '@/theme/AppThemeContext'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { MenuItem } from '@/components/MenuItem'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from '@/components/ThemedText'

const options = [
  { theme: ThemeOptions.Light, description: 'Always use light theme', title: 'Light' },
  { theme: ThemeOptions.Dark, description: 'Always use dark theme', title: 'Dark' },
  { theme: ThemeOptions.System, description: 'Use device settings', title: 'System' },
]

export function ThemeScreen () {
  const { theme, setAppTheme } = React.useContext(AppThemeContext)
  const [activeTheme, setActiveTheme] = React.useState<ThemeOptions>(theme.mode)
  const tintColor = useThemeColor({}, 'activeListItem')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')


  React.useEffect(() => {
    if (theme.isSystem) {
      setActiveTheme(ThemeOptions.System)
    } else {
      setActiveTheme(theme.mode)
    }
  }, [theme])

  const selectTheme = (newTheme: ThemeOptions) => () => {
    setAppTheme(newTheme)
  }

  const handleRenderItem = ({ item }: ListRenderItemInfo<any>) => (
    <MenuItem
      title={item.title}
      href='/theme'
      onPress={selectTheme(item.theme as ThemeOptions)}
      style={[styles.themeItem, activeTheme === item.theme && { backgroundColor: tintColor }]}
    >
      <ThemedText style={{ fontSize: 14, paddingTop: 4, color: secondaryTextColor }}>{item.description}</ThemedText>
    </MenuItem>
  )

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={options}
        renderItem={handleRenderItem}
        keyExtractor={(item) => item.theme}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  themeItem: {
    borderRadius: 8,
  },
})
