import { atom } from 'jotai'

interface CurrentlyPlaying {
  reciter: string
  surah: number
  ayah: number
}

export const currentlyPlayingAtom = atom<CurrentlyPlaying>()
