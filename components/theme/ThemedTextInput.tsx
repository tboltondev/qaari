import React from 'react'
import { TextInput, type TextInputProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedTextInput = React.forwardRef(
  ({ style, lightColor, darkColor, ...otherProps }: ThemedTextInputProps, ref: React.ForwardedRef<TextInput>) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return <TextInput style={[{ color }, style]} ref={ref} {...otherProps} />
  }
)
