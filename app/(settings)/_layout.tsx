import { Stack, useRouter } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SettingsLayout () {
  const tintColor = useThemeColor({}, 'tint')
  const textColor = useThemeColor({}, 'text')
  const backgroundColor = useThemeColor({}, 'background')
  const router = useRouter()

  return (
    <Stack screenOptions={{
      headerTintColor: textColor,
      headerShadowVisible: false,
      headerStyle: { backgroundColor }
    }}
    >
      <Stack.Screen
        // TODO: back button to this screen is called 'index'
        name='index' options={{
          title: 'Settings',
          headerShown: true,
          headerLeft: () => <Ionicons name='close' size={22} color={tintColor} onPress={() => { router.back() }} />
        }}
      />
      <Stack.Screen name='theme' options={{ title: 'Theme', headerShown: true, headerBackVisible: true }} />
    </Stack>
  )
}
