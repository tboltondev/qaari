import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { AppThemeContext, ThemeOptions } from '@/components/theme/AppThemeContext'

export function ThemeSelector () {
  const { theme, setAppTheme } = React.useContext(AppThemeContext)
  const [activeTheme, setActiveTheme] = React.useState<ThemeOptions>(ThemeOptions.System)

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

  return (
    <ThemedView>
      <ThemedText>Theme</ThemedText>
      <ThemedView style={styles.options}>

        <Pressable style={[styles.themeButton, activeTheme === 'light' && styles.themeButtonActive]}
                   onPress={selectTheme(ThemeOptions.Light)}>
          <ThemedText>Light</ThemedText>
        </Pressable>

        <Pressable style={[styles.themeButton, activeTheme === 'dark' && styles.themeButtonActive]}
                   onPress={selectTheme(ThemeOptions.Dark)}>
          <ThemedText>Dark</ThemedText>
        </Pressable>

        <Pressable style={[styles.themeButton, activeTheme === 'system' && styles.themeButtonActive]}
                   onPress={selectTheme(ThemeOptions.System)}>
          <ThemedText>System</ThemedText>
        </Pressable>


      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
  },
  themeButton: {
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 5,
  },
  themeButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: 'blue',
  },
})
