import { Stack } from 'expo-router'
import { inject, observer } from 'mobx-react'
import { NowPlayingStore } from '@/globalState/store'
import { ThemedSafeAreaView } from '@/components/theme/ThemedSafeAreaView'
import { useThemeColor } from '@/hooks/useThemeColor'

interface HomeScreenProps {
  nowPlaying?: NowPlayingStore // this is nullable so it won't be expected to be passed from parent TODO: create store prop type
}

export const RootStack = inject('nowPlaying')(observer((props: HomeScreenProps) => {
  const tintColor = useThemeColor({}, 'tint')
  const backgroundColor = useThemeColor({}, 'background')

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
          options={{ title: props.nowPlaying?.reciterPage?.name, headerBackTitleVisible: false }}
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
}))
