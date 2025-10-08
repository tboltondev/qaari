import React from 'react'

export enum ThemeOptions {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export type ThemeMode = Exclude<ThemeOptions, ThemeOptions.System>

export interface Theme { mode: ThemeMode, isSystem: boolean }

interface AppTheme { theme: Theme, setAppTheme: (newTheme: ThemeOptions) => void }

export const AppThemeContext = React.createContext<AppTheme>({
  theme: { mode: ThemeOptions.Light, isSystem: false },
  setAppTheme: () => {}
})
