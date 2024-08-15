import { Stack } from 'expo-router'
import { inject, observer } from 'mobx-react'
import { NowPlayingStore } from '@/globalState/store'
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView'

type HomeScreenProps = {
  nowPlaying?: NowPlayingStore // this is nullable so it won't be expected to be passed from parent TODO: create store prop type
}

export const RootStack = inject('nowPlaying')(observer((props: HomeScreenProps) => {
  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="reciters" options={{ title: 'Reciters', headerBackTitleVisible: false }}/>
        <Stack.Screen name="reciter/[id]" options={{ title: props.nowPlaying?.reciterPage?.name, headerBackTitleVisible: false }}/>
        <Stack.Screen name="player" options={{ presentation: 'modal', headerShown: false }}/>
        <Stack.Screen name="settings" options={{ title: 'Settings', headerBackTitleVisible: false }}/>
        <Stack.Screen name="theme" options={{ title: 'Theme' }}/>
      </Stack>
    </ThemedSafeAreaView>
  )
}))
