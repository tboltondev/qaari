import { atom } from 'jotai'

interface CurrentlyPlaying {
  reciter: { id: string; name: string }
  surah: number
  ayah: number
}

export const currentlyPlayingAtom = atom<CurrentlyPlaying>()
