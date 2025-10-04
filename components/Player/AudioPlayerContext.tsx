import React, { ReactNode, useContext } from 'react'
import { AudioPlayer, AudioStatus, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'

const AudioPlayerContext = React.createContext<{
  player: AudioPlayer
  status: AudioStatus
} | undefined>(undefined)

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const player = useAudioPlayer()
  const status = useAudioPlayerStatus(player)

  return (
    <AudioPlayerContext.Provider value={{ player, status }}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext)
  if (context == null) {
    throw new Error('useAudioPlayerContext must be used within AudioPlayerProvider')
  }
  return context
}
