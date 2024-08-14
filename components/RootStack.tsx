import { Stack } from 'expo-router'
import { inject, observer } from 'mobx-react'
import { NowPlayingStore } from '@/globalState/store'
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView'

type HomeScreenProps = {
  nowPlaying?: NowPlayingStore
}

export const RootStack = inject('nowPlaying')(observer((props: HomeScreenProps) => {
  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="reciters" options={{ title: 'Reciters', headerBackTitleVisible: false }}/>
        <Stack.Screen name="reciter/[id]" options={{ title: props.nowPlaying?.reciterPage?.name, headerBackTitleVisible: false }}/>
        <Stack.Screen name="player" options={{ presentation: 'modal', headerShown: false }}/>
      </Stack>
    </ThemedSafeAreaView>
  )
}))
