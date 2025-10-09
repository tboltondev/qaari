import React from 'react'
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'

const AudioPlayerContext = React.createContext<{
  load: (source: string) => void
  isLoaded: boolean
  play: () => void
  pause: () => void
  isPlaying: boolean
  // Total audio duration in seconds
  totalDuration: number
  // Current position in seconds
  currentTime: number
} | undefined>(undefined)

export const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const player = useAudioPlayer()
  const status = useAudioPlayerStatus(player)

  function load (source: string) { player.replace(source) }

  function play () { player.play() }

  function pause () { player.pause() }

  const [isLoaded, setIsLoaded] = React.useState(player.isLoaded)
  React.useEffect(() => { setIsLoaded(player.isLoaded) }, [player.isLoaded])

  const [isPlaying, setIsPlaying] = React.useState(player.playing)
  React.useEffect(() => { setIsPlaying(player.playing) }, [player.playing])

  const [totalDuration, setTotalDuration] = React.useState(player.duration)
  React.useEffect(() => { setTotalDuration(player.duration) }, [player.duration])

  const [currentTime, setCurrentTime] = React.useState(status.currentTime)
  React.useEffect(() => { setCurrentTime(status.currentTime) }, [status.currentTime])

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
    <AudioPlayerContext.Provider value={{ load, isLoaded, play, pause, isPlaying, totalDuration, currentTime }}>
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
