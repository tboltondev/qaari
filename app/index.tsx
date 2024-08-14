import { StyleSheet, FlatList } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Href, Link } from 'expo-router'

type MenuItemProps = {
  text: string
  link: string
}

function MenuItem (props: MenuItemProps) {
  return (
    <ThemedView style={styles.menuItem}>
      <Link href={props.link as Href<string>}>
        <ThemedText style={styles.menuItemText}>
          {props.text}
        </ThemedText>
      </Link>
    </ThemedView>
  )
}

const MENU_ITEMS = [
  { text: 'Reciters', link: '/reciters' },
  { text: 'Playlists', link: '/playlists' },
  { text: 'Qira\'at', link: '/qiraat' },
  { text: 'Selections', link: '/selections' },
]

export default function HomeScreen () {
  return (
    <ThemedView
      style={styles.container}>
      <FlatList
        data={MENU_ITEMS}
        renderItem={({ item }) => <MenuItem text={item.text} link={item.link}/>}
        keyExtractor={(item) => item.text}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  menuItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  menuItemText: {
    fontSize: 26,
  },
})
