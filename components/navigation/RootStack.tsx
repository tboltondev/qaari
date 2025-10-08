import { Stack } from 'expo-router'
import Jotai from 'jotai'
import { ThemedSafeAreaView, useThemeColor } from '@/theme'
import { selectedReciterAtom } from '@/globalState/selectedReciter'

export const RootStack = () => {
  const tintColor = useThemeColor({}, 'tint')
  const backgroundColor = useThemeColor({}, 'background')

  const selectedReciter = Jotai.useAtomValue(selectedReciterAtom)

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{
        headerTintColor: tintColor,
        headerShadowVisible: false,
        headerStyle: { backgroundColor }
      }}
      >
        <Stack.Screen
          name='index'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='reciters'
          options={{ title: 'Reciters', headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name='reciter/[id]'
          options={{ title: selectedReciter?.name, headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name='player'
          options={{ presentation: 'modal', headerShown: false }}
        />
        <Stack.Screen
          name='(settings)'
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack>
    </ThemedSafeAreaView>
  )
}
