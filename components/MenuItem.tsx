import React from 'react'
import { GestureResponderEvent, Pressable, StyleSheet, ViewProps } from 'react-native'
import { Href, Link } from 'expo-router'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

type CommonItemProps = ViewProps & {
  icon?: React.ReactNode
  endIcon?: React.ReactNode
  disabled?: boolean
  title: string
  fontSize?: number
}

const CommonItem = ({ style, icon, endIcon, disabled, title, fontSize, ...otherProps }: CommonItemProps) => {
  const disabledColor = useThemeColor({}, 'disabled')

  return (
    <ThemedView style={[styles.menuItem, style]} {...otherProps}>
      {icon}
      <ThemedView style={styles.menuItemText}>
        <ThemedText style={[{ fontSize: fontSize || 18 }, disabled && { color: disabledColor }]}>
          {title}
        </ThemedText>
        {otherProps.children}
      </ThemedView>
      {endIcon}
    </ThemedView>
  )
}

export type MenuItem = CommonItemProps & {
  href?: Href<string>
  onPress?: (e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export function MenuItem ({ href, onPress, ...commonProps }: MenuItem) {
  if (href) {
    return (
      <Link href={href} disabled={commonProps.disabled} onPress={onPress} asChild>
        <Pressable>
          <CommonItem {...commonProps} />
        </Pressable>
      </Link>
    )
  }

  if (onPress) {
    return (
      <Pressable disabled={commonProps.disabled} onPress={onPress}>
        <CommonItem {...commonProps} />
      </Pressable>
    )
  }

  return <CommonItem {...commonProps} />
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  menuItemText: {
    backgroundColor: 'transparent',
  },
})
