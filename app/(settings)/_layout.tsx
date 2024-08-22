import { Stack } from 'expo-router'

export default function SettingsLayout () {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Settings', headerShown: true }}/>
      <Stack.Screen name="theme" options={{ title: 'Theme', headerShown: true, headerBackVisible: true }}/>
    </Stack>
  )
}