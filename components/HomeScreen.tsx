import {ColorValue, Pressable, StyleSheet} from 'react-native'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, Entypo, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { MenuItem } from '@/components/Menu/MenuItem'
import { ThemedView } from '@/components/theme/ThemedView'
import { ThemedText } from '@/components/theme/ThemedText'
import { Menu } from '@/components/Menu/Menu'

const GRADIENT_COLORS: readonly [ColorValue, ColorValue, ...ColorValue[]] = ['#4464ad', '#05b2dc']
const MENU_MAIN_ICON_SIZE = 20
const MENU_ARROW_ICON_SIZE = 10

export const HomeScreen = () => {
  const backgroundColor = useThemeColor({}, 'background')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')
  const tintColor = useThemeColor({}, 'tint')

  // TODO: fix type
  const menuItems = [
    {
      title: 'Reciters',
      href: '/reciters',
      icon: (
        <LinearGradient colors={GRADIENT_COLORS} style={styles.mainMenuItemIcon}>
          <Ionicons name='mic-sharp' size={MENU_MAIN_ICON_SIZE} color={backgroundColor} />
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons
        name='arrow-right' size={MENU_ARROW_ICON_SIZE} color={secondaryTextColor}
        style={styles.mainMenuItemEndIcon}
               />
    },
    {
      title: 'Playlists',
      // href: '/playlists',
      disabled: true,
      icon: (
        <LinearGradient colors={GRADIENT_COLORS} style={styles.mainMenuItemIcon}>
          <Entypo name='list' size={MENU_MAIN_ICON_SIZE} color={backgroundColor} />
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons
        name='arrow-right' size={MENU_ARROW_ICON_SIZE} color={secondaryTextColor}
        style={styles.mainMenuItemEndIcon}
               />
    },
    // {
    //   title: 'Qira\'at',
    //   href: '/qiraat',
    //   icon: (
    //     <LinearGradient colors={GRADIENT_COLORS} style={styles.mainMenuItemIcon}>
    //       <Ionicons name="library-sharp" size={MENU_MAIN_ICON_SIZE} color='white/>
    //     </LinearGradient>
    //   ),
    //   endIcon: <SimpleLineIcons name="arrow-right" size={MENU_ARROW_ICON_SIZE} color={secondaryTextColor}
    //                             style={styles.mainMenuItemEndIcon}/>,
    // },
    {
      title: 'Selections',
      // href: '/selections',
      disabled: true,
      icon: (
        <LinearGradient colors={GRADIENT_COLORS} style={styles.mainMenuItemIcon}>
          <MaterialCommunityIcons name='selection-ellipse' size={MENU_MAIN_ICON_SIZE} color={backgroundColor} />
        </LinearGradient>
      ),
      endIcon: <SimpleLineIcons
        name='arrow-right' size={MENU_ARROW_ICON_SIZE} color={secondaryTextColor}
        style={styles.mainMenuItemEndIcon}
               />
    }
  ]

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={[styles.title, { color: tintColor }]}>قارئ</ThemedText>
        <Link href='/(settings)' asChild>
          <Pressable>
            <Ionicons name='settings-outline' size={25} color={secondaryTextColor} style={styles.settingsIcon} />
          </Pressable>
        </Link>
      </ThemedView>
      <Menu
        data={menuItems}
        renderItem={({ item }) => <MenuItem {...item} fontSize={26} style={styles.mainMenuItem} />}
        keyExtractor={(item) => item.title}
        style={styles.mainMenu}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  mainMenu: {
    paddingTop: 50
  },
  mainMenuItem: {
    padding: 20,
    marginHorizontal: 0,
    alignItems: 'center'
  },
  mainMenuItemIcon: {
    marginEnd: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  mainMenuItemEndIcon: {
    marginLeft: 'auto',
    marginRight: 20
  },
  header: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    paddingStart: 30,
    fontFamily: 'Almarai',
    fontSize: 30,
    lineHeight: 34
  },
  settingsIcon: {
    paddingEnd: 30
  }
})
