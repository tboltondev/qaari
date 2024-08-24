import { Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, Entypo, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { MenuItem } from '@/components/Menu/MenuItem'
import { ThemedView } from '@/components/theme/ThemedView'
import { ThemedText } from '@/components/theme/ThemedText'
import { Menu } from '@/components/Menu/Menu'

export const HomeScreen = () => {
  const secondaryTextColor = useThemeColor({}, 'secondaryText')
  const tintColor = useThemeColor({}, 'tint')

  const gradientColors = ['#4464ad', '#05b2dc']

  const menuItems: MenuItem[] = [
    {
      title: 'Reciters',
      href: '/reciters',
      icon: (
        <LinearGradient colors={gradientColors} style={styles.mainMenuItemIcon}>
          <Ionicons name="mic-sharp" size={20} color='white'/>
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons name="arrow-right" size={10} color={secondaryTextColor}
                                style={styles.mainMenuItemEndIcon}/>,
    },
    {
      title: 'Playlists',
      // href: '/playlists',
      disabled: true,
      icon: (
        <LinearGradient colors={gradientColors} style={styles.mainMenuItemIcon}>
          <Entypo name="list" size={20} color='white'/>
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons name="arrow-right" size={10} color={secondaryTextColor}
                                style={styles.mainMenuItemEndIcon}/>,
    },
    // {
    //   title: 'Qira\'at',
    //   href: '/qiraat',
    //   icon: (
    //     <LinearGradient colors={gradientColors} style={styles.mainMenuItemIcon}>
    //       <Ionicons name="library-sharp" size={20} color='white/>
    //     </LinearGradient>
    //   ),
    //   endIcon: <SimpleLineIcons name="arrow-right" size={10} color={secondaryTextColor}
    //                             style={styles.mainMenuItemEndIcon}/>,
    // },
    {
      title: 'Selections',
      // href: '/selections',
      disabled: true,
      icon: (
        <LinearGradient colors={gradientColors} style={styles.mainMenuItemIcon}>
          <MaterialCommunityIcons name="selection" size={20} color='white'/>
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons name="arrow-right" size={10} color={secondaryTextColor}
                                style={styles.mainMenuItemEndIcon}/>,
    },
  ]

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={[styles.title, { color: tintColor }]}>قارئ</ThemedText>
        <Link href="/(settings)" asChild>
          <Pressable>
            <Ionicons name="settings-outline" size={25} color={secondaryTextColor} style={styles.settingsIcon}/>
          </Pressable>
        </Link>
      </ThemedView>
      <Menu
        data={menuItems}
        renderItem={({ item }) => <MenuItem {...item} fontSize={26} style={styles.mainMenuItem}/>}
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
  header: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    paddingStart: 30,
    fontFamily: 'Almarai',
    fontSize: 22,
  },
  settingsIcon: {
    paddingEnd: 30,
  },
})
