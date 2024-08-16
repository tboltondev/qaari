import { Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { ThemedView } from '@/components/ThemedView'
import { MenuItem } from '@/components/MenuItem'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Menu } from '@/components/Menu'

export default function HomeScreen () {
  const textColor = useThemeColor({}, 'text')
  const disabledTextColor = useThemeColor({}, 'disabled')

  const menuItems: MenuItem[] = [
    {
      title: 'Reciters',
      href: '/reciters',
      icon: <Ionicons name='mic' size={30} color={textColor} style={{ marginEnd: 20 }} />,
    },
    {
      title: 'Playlists',
      href: '/playlists',
      icon: <Ionicons name='list' size={30} color={textColor} style={{ marginEnd: 20 }} />,
    },
    {
      title: 'Qira\'at',
      href: '/qiraat',
      icon: <Ionicons name='library' size={30} color={disabledTextColor} style={{ marginEnd: 20 }} />,
      disabled: true
    },
    {
      title: 'Selections',
      href: '/selections',
      icon: <Ionicons name='bookmark' size={30} color={textColor} style={{ marginEnd: 20 }} />,
    },
  ]

  return (
    <ThemedView style={styles.container}>
      <Link href='/settings' asChild>
        <Pressable>
          <AntDesign name='setting' size={30} color={textColor} style={styles.settingsIcon} />
        </Pressable>
      </Link>
      <Menu
        data={menuItems}
        renderItem={({ item }) => <MenuItem {...item} fontSize={26} style={{ padding: 20 }} />}
        keyExtractor={(item) => item.title}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  settingsIcon: {
    alignSelf: 'flex-end',
    paddingEnd: 30,
    paddingTop: 20,
  },
})
