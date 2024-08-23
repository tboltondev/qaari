import { Stack } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'

export default function SettingsLayout () {
  const tintColor = useThemeColor({}, 'tint')

  return (
    <Stack screenOptions={{ headerTintColor: tintColor }}>
      <Stack.Screen name="index" options={{ title: 'Settings', headerShown: true }}/>
      <Stack.Screen name="theme" options={{ title: 'Theme', headerShown: true, headerBackVisible: true }}/>
    </Stack>
  )
}