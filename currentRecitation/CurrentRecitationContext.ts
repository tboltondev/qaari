import React from "react"
import {Audio} from "expo-av";

export type Reciter = {
    name: string
    id: number
}

export type CurrentRecitationContext = {
    reciters: Reciter[], // TODO: maybe can remove this and next line
    setReciters: React.Dispatch<React.SetStateAction<Reciter[]>>
    surahNumber: number
    setSurahNumber: React.Dispatch<React.SetStateAction<number>>
    selectedSurahNumber: number
    setSelectedSurahNumber: React.Dispatch<React.SetStateAction<number>>
    selectedReciter: Reciter
    setSelectedReciter: React.Dispatch<React.SetStateAction<Reciter>>
    reciter: Reciter
    setReciter: React.Dispatch<React.SetStateAction<Reciter>>
    recitation: Audio.Sound
    isPlaying: Boolean
    isLoaded: Boolean
    durationInMs: number
    playedDurationInMs: number
    load: (reciterId: number, surahNumber: number) => Promise<void>
    play: () => void
    pause: () => void
}

const noOp = () => {}

export const CurrentRecitationContext = React.createContext<CurrentRecitationContext>({
    reciters: [],
    setReciters: noOp,
    surahNumber: 0,
    setSurahNumber: noOp,
    selectedSurahNumber: 0,
    setSelectedSurahNumber: noOp,
    selectedReciter: { name: '', id: 0 },
    setSelectedReciter: noOp,
    reciter: { name: '', id: 0 },
    setReciter: noOp,
    recitation: new Audio.Sound(),
    isPlaying: false,
    isLoaded: false,
    durationInMs: 0,
    playedDurationInMs: 0,
    load: async () => {},
    play: noOp,
    pause: noOp,
})