import { atom } from 'jotai'

export const selectedReciterAtom = atom<{ id: string, name: string }>()
