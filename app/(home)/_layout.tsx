import React from 'react'
import { Stack } from 'expo-router'
import { inject, observer } from 'mobx-react'
import { NowPlayingStore } from '@/globalState/store'

function HomeLayout (props: { nowPlaying: NowPlayingStore }) {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="reciters" options={{ title: 'Reciters' }}/>
      <Stack.Screen name="reciter/[id]" options={{ title: props.nowPlaying.reciterPage?.name }}/>
      <Stack.Screen name="player" options={{ presentation: 'modal', headerShown: false }}/>
    </Stack>
  )
}

export default inject('nowPlaying')(observer(HomeLayout))
