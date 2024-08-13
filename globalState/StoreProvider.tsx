import React from 'react'
import { Provider } from 'mobx-react'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { nowPlayingStore } from '@/globalState/store'
import { PlayerWidget } from '@/globalState/PlayerWidget'

export function StoreProvider (props: { children: React.ReactNode }) {
  React.useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    })
  })

  return (
    <Provider nowPlaying={nowPlayingStore}>
      {props.children}
      <PlayerWidget nowPlaying={nowPlayingStore}/>
    </Provider>
  )
}