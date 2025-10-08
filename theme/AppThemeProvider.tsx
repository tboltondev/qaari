import React from 'react'
import { AppThemeContext, Theme, ThemeMode, ThemeOptions } from './AppThemeContext'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

export function AppThemeProvider ({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>({ mode: ThemeOptions.Light, isSystem: false })
  const systemTheme = useColorScheme()

  const fromThemeOption = (themeOption: ThemeOptions): Theme => {
    if (themeOption === ThemeOptions.System) {
      return { mode: systemTheme === 'dark' ? ThemeOptions.Dark : ThemeOptions.Light, isSystem: true }
    }
    return { mode: themeOption, isSystem: false }
  }

  React.useEffect(() => {
    const fromStorage = (storedTheme: string | null): Theme => {
      if (storedTheme === 'system' || !storedTheme) {
        return { mode: systemTheme === 'dark' ? ThemeOptions.Dark : ThemeOptions.Light, isSystem: true }
      }
      return { mode: storedTheme as ThemeMode, isSystem: false }
    }

    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme')
        setTheme(fromStorage(savedTheme))
      } catch (error) {
        console.error(error)
      }
    }
    getTheme()
  }, [theme.mode, systemTheme])

  const setAppTheme = (newTheme: ThemeOptions) => {
    try {
      setTheme(fromThemeOption(newTheme))
      AsyncStorage.setItem('theme', newTheme)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AppThemeContext.Provider value={{ theme, setAppTheme }}>
      <ThemeProvider value={theme.mode === ThemeOptions.Dark ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>

  )
}
