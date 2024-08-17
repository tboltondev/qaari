import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { MenuItem } from '@/components/MenuItem'
import { Menu } from '@/components/Menu'

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
  return (
    <ThemedView style={{ flexGrow: 1, padding: 16 }}>
      {/*TODO: refactor container into Page component*/}
      <Menu
        data={settingsItems}
        renderItem={({ item }) => <MenuItem {...item} />}
      />
    </ThemedView>
  )
}
