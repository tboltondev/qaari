import React from 'react'
import { AudioPlayer, AudioStatus, setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'

const AudioPlayerContext = React.createContext<{
  player: AudioPlayer
  status: AudioStatus
} | undefined>(undefined)

export const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const player = useAudioPlayer()
  const status = useAudioPlayerStatus(player)

  React.useEffect(() => {
    (async () => {
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionModeAndroid: 'doNotMix',
        interruptionMode: 'doNotMix'
      })
    })()
  }, [])

  return (
    <AudioPlayerContext.Provider value={{ player, status }}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export const useAudioPlayerContext = () => {
  const context = React.useContext(AudioPlayerContext)
  if (context == null) {
    throw new Error('useAudioPlayerContext must be used within AudioPlayerProvider')
  }
  return context
}
