import { FlatList } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { MenuItem } from '@/components/MenuItem'

const settingsItems: MenuItem[] = [
  {
    title: 'Theme',
    href: '/theme',
  }
]

export default function Settings () {
  return (
    <ThemedView style={{ flexGrow: 1, padding: 16 }}>
      {/*TODO: refactor container into Page component*/}
      <FlatList
        data={settingsItems}
        renderItem={({ item }) => <MenuItem {...item} />}
      />
    </ThemedView>
  )
}
