import {Button} from "react-native";
import {useAudioPlayer} from "expo-audio";
import React from "react";

async function loadAudio (reciterId: number, surahNumber: number) {
  // TODO: move url
  const url = `https://api.qurancdn.com/api/qdc/audio/reciters/${reciterId}/audio_files?chapter=${surahNumber}&segments=true`
  const response = await fetch(url) // TODO: add type
  const data = await response.json() // TODO: handle errors
  // runInAction(() => {
  //   this.ayahTimings = data.audio_files[0].verse_timings
  // })
  return data.audio_files[0].audio_url
}

export const NewPlayer = () => {
  const player = useAudioPlayer()
  const [audioUrl, setAudioUrl] = React.useState<string>();

  React.useEffect(() => {
    async function getAudioUrl() {
      const url = await loadAudio(7, 1)
      setAudioUrl(url)
    }
    getAudioUrl()
  }, [])

  React.useEffect(() => {
    if (!audioUrl) return;
    player.replace(audioUrl)
  }, [audioUrl, player])

  return (
    <Button title={'Play'} onPress={() => {player.play()}} />
  )
}