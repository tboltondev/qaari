/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import React from 'react'
import { Colors } from '@/constants/Colors'
import { AppThemeContext } from '@/theme/AppThemeContext'

export function useThemeColor (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = React.useContext(AppThemeContext)
  const colorFromProps = props[theme.mode]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme.mode][colorName]
  }
}
