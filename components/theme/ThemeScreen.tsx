import React from 'react'
import { ListRenderItemInfo, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ThemedView } from '@/components/theme/ThemedView'
import { AppThemeContext, ThemeOptions } from '@/components/theme/AppThemeContext'
import { MenuItem } from '@/components/Menu/MenuItem'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from '@/components/theme/ThemedText'
import { Menu } from '@/components/Menu/Menu'

export function ThemeScreen () {
  const { theme, setAppTheme } = React.useContext(AppThemeContext)
  const [activeTheme, setActiveTheme] = React.useState<ThemeOptions>(theme.mode)
  const secondaryTextColor = useThemeColor({}, 'secondaryText')
  const secondaryBackgroundColor = useThemeColor({}, 'secondaryBackground')
  const textColor = useThemeColor({}, 'text')

  const options = [
    {
      theme: ThemeOptions.Light,
      description: 'Always use light theme',
      title: 'Light',
      icon: <Ionicons name='sunny' color={textColor} size={28} style={styles.themeItemIcon} />
    },
    {
      theme: ThemeOptions.Dark,
      description: 'Always use dark theme',
      title: 'Dark',
      icon: <Ionicons name='moon' color={textColor} size={28} style={styles.themeItemIcon} />
    },
    {
      theme: ThemeOptions.System,
      description: 'Use device settings',
      title: 'System',
      icon: <Ionicons name='phone-portrait-outline' color={textColor} size={28} style={styles.themeItemIcon} />
    }
  ]

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

  const handleRenderItem = ({ item }: ListRenderItemInfo<any>) => ( // TODO: don't use any
    <MenuItem
      title={item.title}
      href='/theme'
      onPress={selectTheme(item.theme as ThemeOptions)}
      style={[styles.themeItem, activeTheme === item.theme && { backgroundColor: secondaryBackgroundColor }]}
      icon={item.icon}
    >
      <ThemedText style={{ fontSize: 14, paddingTop: 4, color: secondaryTextColor }}>{item.description}</ThemedText>
    </MenuItem>
  )

  return (
    <ThemedView style={styles.container}>
      <Menu
        data={options}
        renderItem={handleRenderItem}
        keyExtractor={(item) => item.theme}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  themeItem: {
    borderRadius: 15
  },
  themeItemIcon: {
    marginEnd: 20,
    alignSelf: 'center'
  },
  themeItemCheckmark: {
    marginLeft: 'auto',
    alignSelf: 'center',
    marginRight: 10
  }
})
