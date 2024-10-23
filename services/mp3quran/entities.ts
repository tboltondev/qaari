export type Mp3QuranMoshaf = {
  id: number
  name: string
  server: string
  surah_total: number
  moshaf_type: number
  surah_list: string
}

export type Mp3QuranReciter = {
  id: number
  name: string
  letter: string // first letter of name
  moshaf: Mp3QuranMoshaf[]
}

export type Mp3QuranRiwayah = {
  id: number
  moshaf_type: number
  moshaf_id: number
  name: string
}
