import { t } from 'mobx-state-tree'

type CurrentlyPlaying = {
    surahNumber: number
    reciterId: string
}

const CurrentlyPlaying = t.model({
    surahNumber: t.optional(t.number, 0),
    reciterId: t.optional(t.string, ''),
})
.actions((self) => ({
    setCurrentlyPlaying({ surahNumber, reciterId }: CurrentlyPlaying) {
        self.surahNumber = surahNumber
        self.reciterId = reciterId
    },
}))

const Reciter = t.model({
    name: t.optional(t.string, '')
})
.actions((self) => ({
    setReciterName(name: string) {
        self.name = name
    }
}))

const RootStore = t.model({
    currentlyPlaying: t.optional(CurrentlyPlaying, {}),
    reciter: t.optional(Reciter, {})
})

export const store = RootStore.create({})