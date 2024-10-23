import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx'
import { Audio, AVPlaybackStatus } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Reciter } from '@/domain/Reciter'
import Mp3Quran from '@/services/mp3quran'
import { Riwayah } from '@/domain/Riwayah'

function padSurahNoWithZeroes (n: number) {
  if (n < 10) {
    return `00${n}`
  } else if (n < 100) {
    return `0${n}`
  } else {
    return n.toString()
  }
}

type RiwayahSelection = {
  riwayah: Riwayah
  surahList: number[]
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
   * stores data of reciters fetched on app load
   */
  @observable reciters: { data: Set<Reciter>, error?: Error } = { data: new Set() }
  /**
   * stores reciter data for displaying name on reciter page
   */
  @observable reciterPage?: Reciter
  @observable riwayahId?: number
  @observable availableRiwayat?: RiwayahSelection[]
  @observable selectedRiwayah?: RiwayahSelection

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
    for (let reciter of this.reciters.data) {
      if (reciter.id === this.reciterId) {
        return reciter
      }
    }
  }

  /**
   * @description
   * loads audio based on reciter and surah
   */
  @action
  async load (reciterId: number, surahNumber: number, audioPosition?: number) {
    const status = await this.audio.getStatusAsync()
    if (status.isLoaded) {
      await this.audio.unloadAsync()
    }

    const riwayah = this.reciterPage?.mushaf.find(
      (mushaf) => mushaf.mushafType === this.selectedRiwayah?.riwayah.id // TODO: mushaf type should probably be passed in to the function
    )

    const serverUrl = riwayah?.server
    const uri = `${serverUrl}${padSurahNoWithZeroes(surahNumber)}.mp3`

    const source = { uri }
    const initialStatus = {
      shouldPlay: !audioPosition,
      // volume: '',
      isLooping: false,
      positionMillis: audioPosition
    }

    const onPlayBackStatusUpdate = (status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        if (status.didJustFinish) {
          return this.next()
        }
        runInAction(() => {
          this.audioPositionMs = status.positionMillis
          this.audioDurationMs = status.durationMillis || 0
          this.shouldPlay = status.shouldPlay
          this.isPlaying = status.isPlaying
          this.isBuffering = status.isBuffering
        })
        this.saveState()
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
      this.riwayahId = riwayah?.id
      this.audio = audio.sound
      this.isLoading = false
      this.isPlaying = !audioPosition
    })
  }

  saveState () {
    AsyncStorage.setItem('nowPlaying', JSON.stringify({
      reciterId: this.reciterId,
      currentReciter: this.currentReciter,
      surahNumber: this.surahNumber,
      riwayahId: this.riwayahId,
      position: this.audioPositionMs,
      reciterPage: this.reciterPage,
    }))
  }

  @action
  async restoreState () {
    const jsonState = await AsyncStorage.getItem('nowPlaying')

    if (jsonState) {
      const state = JSON.parse(jsonState)

      runInAction(() => {
        this.reciterId = state.reciterId
        this.surahNumber = state.surahNumber
        this.riwayahId = state.riwayahId
        this.audioPositionMs = state.position
        this.isLoading = false
        this.reciterPage = state.reciterPage
      })

      this.load(state.reciterId, state.surahNumber, state.position)
    }
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
  next () {
    const surahList = this.selectedRiwayah?.surahList
    if (!surahList) return

    const nextSurah = surahList.find((surahNumber) => {
      if ((this.surahNumber === surahList[surahList.length - 1]) && (surahNumber === surahList[0])) {
        return true
      }
      return surahNumber > this.surahNumber
    })

    if (!nextSurah) return

    this.surahNumber = nextSurah
    this.load(this.reciterId, this.surahNumber)
  }

  @action
  prev () {
    const surahList = this.selectedRiwayah?.surahList
    if (!surahList) return

    const prevSurah = surahList.reverse().find((surahNumber) => {
      if ((this.surahNumber === surahList[0]) && (surahNumber === surahList[surahList.length - 1])) {
        return true
      }
      return surahNumber < this.surahNumber
    })

    if (!prevSurah) return

    this.surahNumber = prevSurah
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

    const availableRiwayat = reciter.mushaf.map(m => ({
      riwayah: { id: m.mushafType, name: m.name },
      surahList: m.surahList,
    }))

    const biggestSurahList = availableRiwayat.reduce((prev, curr) => {
      if (curr.surahList.length > prev.surahList.length) {
        return curr
      }
      return prev
    }, availableRiwayat[0])

    this.setAvailableRiwayat(availableRiwayat)
    this.selectRiwayah(biggestSurahList)
  }

  @action
  setAvailableRiwayat (availableRiwayat: RiwayahSelection[]) {
    this.availableRiwayat = availableRiwayat
  }

  @action
  selectRiwayah (selectedRiwayah: RiwayahSelection) {
    this.selectedRiwayah = selectedRiwayah
  }

  @action
  addReciter (reciter: Reciter) {
    this.reciters.data.add(reciter)
  }

  @action
  setReciters (reciters: { data: Set<Reciter>, error?: Error }) {
    this.reciters = reciters
  }

  @action
  async getReciters () {
    try {
      const cachedReciters = await AsyncStorage.getItem("reciters")
      if (cachedReciters) {
        this.setReciters({ data: new Set(JSON.parse(cachedReciters)) })
        return
      }

      const reciters = await Mp3Quran.getReciters()
      await AsyncStorage.setItem("reciters", JSON.stringify(reciters))

      this.setReciters({ data: new Set(reciters) })
    } catch (err) {
      runInAction(() => {
        if (err instanceof Error) {
          this.setReciters({ data: new Set<Reciter>(), error: err })
        }
      })
    }
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
