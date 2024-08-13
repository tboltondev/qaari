import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import { DrawerNavigationProp, DrawerToggleButton } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'
import { useNavigation, usePathname } from 'expo-router'
import { Pressable, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

const HOME_ROUTES = ['/', '/region']

export function DrawerButton () {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
  const pathname = usePathname()
  const tint = useThemeColor({}, 'tint')

  return (
    <Pressable
      onPress={() => navigation.toggleDrawer()}
      style={styles.touchable}
    >
      {/*pathname === "/"
                ? <AntDesign name="setting" style={styles.icon} size={24} color='#fff' />
                : <AntDesign name="arrowleft" style={styles.icon} size={24} color='#fff' />
            */}
      {HOME_ROUTES.includes(pathname)
        ? <Ionicons name="cog" style={styles.icon} size={24} color={tint}/>
        : <Ionicons name="arrow-back" style={styles.icon} size={24} color={tint}/>
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: 'contain',
  },
  touchable: {
    marginHorizontal: 11,
  },
})
