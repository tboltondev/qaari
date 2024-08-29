export type Reciter = {
  id: number
  name: string
  letter: string // first letter of name
  mushaf: {
    id: number
    name: string
    server: string
    surahTotal: number
    mushafType: number
    surahList: number[]
  }[]
}
