import { Stack } from 'expo-router'
import { inject, observer } from 'mobx-react'
import { NowPlayingStore } from '@/globalState/store'
import { ThemedSafeAreaView } from '@/components/theme/ThemedSafeAreaView'
import { useThemeColor } from '@/hooks/useThemeColor'

interface HomeScreenProps {
  nowPlaying?: NowPlayingStore // this is nullable so it won't be expected to be passed from parent TODO: create store prop type
}

export const RootStack = inject('nowPlaying')(observer((props: HomeScreenProps) => {
  const textColor = useThemeColor({}, 'text')
  const backgroundColor = useThemeColor({}, 'background')

  return (
    <ThemedSafeAreaView edges={['top', 'right', 'left']} style={{ flex: 1, backgroundColor }}>
      <Stack screenOptions={{
        headerTintColor: textColor,
        headerShadowVisible: false,
        headerStyle: { backgroundColor },
        headerBackButtonDisplayMode: 'minimal'
      }}
      >
        <Stack.Screen
          name='index'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='reciters'
          options={{ title: 'Reciters' }}
        />
        <Stack.Screen
          name='reciter/[id]'
          options={{ title: props.nowPlaying?.reciterPage?.name }}
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
