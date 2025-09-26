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
