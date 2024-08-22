import { Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SimpleLineIcons } from '@expo/vector-icons'
import { ThemedView } from '@/components/ThemedView'
import { MenuItem } from '@/components/MenuItem'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Menu } from '@/components/Menu'
import { LinearGradient } from 'expo-linear-gradient'

export default function HomeScreen () {
  const textColor = useThemeColor({}, 'text')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  const gradientColors = ['#4464ad', '#05b2dc']

  const menuItems: MenuItem[] = [
    {
      title: 'Reciters',
      href: '/reciters',
      icon: (
        <LinearGradient colors={gradientColors} style={styles.mainMenuItemIcon}>
          <Ionicons name="mic-outline" size={20} color={'white'} />
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons name="arrow-right" size={10} color={secondaryTextColor}
                                style={styles.mainMenuItemEndIcon}/>,
    },
    {
      title: 'Playlists',
      href: '/playlists',
      icon: (
        <LinearGradient colors={gradientColors} style={styles.mainMenuItemIcon}>
          <Ionicons name="list-outline" size={20} color={'white'} />
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons name="arrow-right" size={10} color={secondaryTextColor}
                                style={styles.mainMenuItemEndIcon}/>,
    },
    {
      title: 'Qira\'at',
      href: '/qiraat',
      icon: (
        <LinearGradient colors={gradientColors} style={styles.mainMenuItemIcon}>
          <Ionicons name="library-outline" size={20} color={'white'} />
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons name="arrow-right" size={10} color={secondaryTextColor}
                                style={styles.mainMenuItemEndIcon}/>,
    },
    {
      title: 'Selections',
      href: '/selections',
      icon: (
        <LinearGradient colors={gradientColors} style={styles.mainMenuItemIcon}>
          <Ionicons name="bookmark-outline" size={20} color={'white'} />
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons name="arrow-right" size={10} color={secondaryTextColor}
                                style={styles.mainMenuItemEndIcon}/>,
    },
  ]

  return (
    <ThemedView style={styles.container}>
      <Link href='/(settings)' asChild>
        <Pressable>
          <Ionicons name="settings-outline" size={25} color={textColor} style={styles.settingsIcon}/>
        </Pressable>
      </Link>
      <Menu
        data={menuItems}
        renderItem={({ item }) => <MenuItem {...item} fontSize={26} fontWeight='500' style={styles.mainMenuItem}/>}
        keyExtractor={(item) => item.title}
        style={styles.mainMenu}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  mainMenu: {
    paddingTop: 50
  },
  mainMenuItem: {
    padding: 20,
    marginHorizontal: 0,
  },
  mainMenuItemIcon: {
    marginEnd: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  mainMenuItemEndIcon: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  settingsIcon: {
    alignSelf: 'flex-end',
    paddingEnd: 30,
    paddingTop: 20,
  },
})
