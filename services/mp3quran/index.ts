import { Reciter } from '@/domain/Reciter'
import { Mp3QuranMoshaf, Mp3QuranReciter } from '@/services/mp3quran/entities'

const BASE_URL = 'https://mp3quran.net/api/v3'

const lang = 'eng'

function mapApiReciterToDomain(reciter: Mp3QuranReciter) {
  return {
    id: reciter.id,
    name: reciter.name,
    letter: reciter.letter,
    mushaf: reciter.moshaf.map((m: Mp3QuranMoshaf) => ({
      id: m.id,
      name: m.name,
      server: m.server,
      surahTotal: m.surah_total,
      mushafType: m.moshaf_type,
      surahList: m.surah_list.split(",").map(n => parseInt(n)),
    })),
  }
}

const Mp3Quran = {
  getReciters: async () : Promise<Reciter[]> => { // TODO: unit test this
    const response = await fetch(`${BASE_URL}/reciters?language=${lang}`) // TODO: create global lang state
    const json = await response.json()
    const reciters = json.reciters.map(mapApiReciterToDomain)
    return reciters.sort((a: Reciter, b: Reciter) => a.name.localeCompare(b.name))
  },

  getReciter: async (id: number) : Promise<Reciter> => {
    const response = await fetch(`${BASE_URL}/reciters?language=${lang}&reciter=${id}`) // TODO: create global lang state
    const json = await response.json()
    return json.reciters.map(mapApiReciterToDomain)[0]
  },
}

export default Mp3Quran
