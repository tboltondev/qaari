import React from 'react'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { ThemedView } from '@/components/ThemedView'
import { MenuItem } from '@/components/MenuItem'
import { Menu } from '@/components/Menu'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

const settingsItems: MenuItem[] = [
  {
    title: 'Account',
    // href: '/account'
    disabled: true,
  },
  {
    title: 'Text and translation',
    // href: '/text-settings'
    disabled: true,
  },
  {
    title: 'Theme',
    href: '/theme',
  }
]

export default function Settings () {
  const versionNumberColor = useThemeColor({}, 'versionNumber')

  return (
    <ThemedView style={styles.container}>
      {/*TODO: refactor container into Page component*/}
      <Menu
        data={settingsItems}
        renderItem={({ item }) => <MenuItem {...item} />}
      />
      <ThemedText style={[styles.versionNumber, { color: versionNumberColor }]}>
        v{Constants.expoConfig?.version}
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  versionNumber: {
    alignSelf: 'center',
    marginBottom: 40,
  },
})
