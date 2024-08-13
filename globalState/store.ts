import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx'
import { Audio, AVPlaybackStatus } from 'expo-av'

type Reciter = {
  name: string
  id: number
}

/**
 * MobX store for currently playing recitation audio, it's metadata and actions to interact with it
 */
export class NowPlayingStore {
  @observable reciterId: number
  @observable surahNumber: number
  @observable audio: Audio.Sound
  @observable audioPositionMs: number
  @observable audioDurationMs: number
  @observable shouldPlay: boolean
  @observable isLoading: boolean
  @observable isPlaying: boolean
  @observable isBuffering: boolean
  // @observable volume: number

  /**
   * stores data of reciters whose page has been visited
   * for easier access to current reciter name based on id
   */
  @observable reciters: Reciter[] = []
  /**
   * stores reciter data for displaying name on reciter page
   */
  @observable reciterPage?: Reciter

  constructor (
    reciterId: number,
    surahNumber: number,
    audio: Audio.Sound,
    audioPositionMs: number,
    audioDurationMs: number,
    shouldPlay: boolean,
    isLoading: boolean,
    isPlaying: boolean,
    isBuffering: boolean,
  ) {
    makeAutoObservable(this)
    this.reciterId = reciterId
    this.surahNumber = surahNumber
    this.audio = audio
    this.audioPositionMs = audioPositionMs
    this.audioDurationMs = audioDurationMs
    this.shouldPlay = shouldPlay
    this.isLoading = isLoading
    this.isPlaying = isPlaying
    this.isBuffering = isBuffering
  }

  @computed
  get percentageElapsed () {
    return this.audioPositionMs / this.audioDurationMs * 100
  }

  @computed
  get currentReciter (): Reciter | undefined {
    return this.reciters.find(reciter => reciter.id === this.reciterId)
  }

  /**
   * @description
   * loads audio based on reciter and surah
   */
  @action
  async load (reciterId: number, surahNumber: number) {
    const status = await this.audio.getStatusAsync()
    if (status.isLoaded) {
      await this.audio.unloadAsync()
    }

    const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahNumber}`) // TODO: move url
    const data = await response.json() // TODO: handle errors
    const uri = data.audio_file.audio_url

    const source = { uri }
    const initialStatus = {
      shouldPlay: true,
      // volume: '',
      isLooping: false,
    }

    const onPlayBackStatusUpdate = (status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        runInAction(() => {
          this.audioPositionMs = status.positionMillis
          this.audioDurationMs = status.durationMillis || 0
          this.shouldPlay = status.shouldPlay
          this.isPlaying = status.isPlaying
          this.isBuffering = status.isBuffering
        })
      } else if (status.error) {
        console.log(`Error with audio: ${status.error}`)
      }
    }

    const audio = await Audio.Sound.createAsync(
      source,
      initialStatus,
      onPlayBackStatusUpdate,
    )

    runInAction(() => {
      this.reciterId = reciterId
      this.surahNumber = surahNumber
      this.audio = audio.sound
      this.isLoading = false
      this.isPlaying = true
    })
    console.log('LOADED\n')
  }

  @action
  async play () {
    await this.audio.playAsync()
    this.setIsPlaying(true)
  }

  @action
  async pause () {
    await this.audio.pauseAsync()
    this.setIsPlaying(false)
  }

  @action
  next() {
    if (this.surahNumber === 114) { // TODO: handle more dynamically to allow for playlists
      this.surahNumber = 1
    } else {
      this.surahNumber += 1
    }
    this.load(this.reciterId, this.surahNumber)
  }

  @action
  prev() {
    if (this.surahNumber === 1) { // TODO: handle more dynamically to allow for playlists
      this.surahNumber = 114
    } else {
      this.surahNumber -= 1
    }
    this.load(this.reciterId, this.surahNumber)
  }

  @action
  setIsLoading (isLoading: boolean) {
    this.isLoading = isLoading
  }

  @action
  setIsPlaying (isPlaying: boolean) {
    this.isPlaying = isPlaying
  }

  @action
  setReciterPage (reciter: Reciter) {
    this.reciterPage = reciter
  }

  @action
  addReciter (reciter: Reciter) {
    this.reciters.push(reciter)
  }
}

export const nowPlayingStore = new NowPlayingStore(
  0,
  0,
  new Audio.Sound,
  0,
  0,
  false,
  true,
  false,
  false,
)
