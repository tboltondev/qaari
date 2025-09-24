import { QuranDotComReciter } from '@/services/quranDotCom/entities'
import { Reciter } from '@/domain/Reciter'

const BASE_URL = 'https://api.quran.com/api/v4'

const QuranDotCom = {
  getReciters: async (): Promise<Reciter[]> => {
    const response = await fetch(`${BASE_URL}/resources/recitations`)
    const json = await response.json()
    return json.recitations.map((reciter: QuranDotComReciter) => ({
      id: reciter.id,
      name: reciter.reciter_name,
      style: reciter.style,
      translatedName: {
        name: reciter.translated_name.name,
        languageName: reciter.translated_name.language_name
      }
    }))
  }
}

export default QuranDotCom
