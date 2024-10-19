import { Quran, Tafsir, Surah, Ayah } from '~/types.d'

const API_BASE_URL = 'https://api.alquran.cloud/v1'

export const fetchAllAyahs = async (language: string): Promise<Quran[]> => {
  const response = await fetch(`${API_BASE_URL}/quran/${language}`)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ayahs from ${API_BASE_URL}: ${response.statusText}`,
    )
  }
  const data = await response.json()

  return data.data.surahs.flatMap((surah: Surah) =>
    surah.ayahs.map((ayah: Ayah) => ({
      number: surah.number,
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      surah: {
        number: surah.number,
        name: surah.englishName,
        translation: surah.englishNameTranslation,
      },
    })),
  )
}

export const fetchTafsir = async (
  ayahNumber: number,
  language: string,
): Promise<Tafsir> => {
  const response = await fetch(`${API_BASE_URL}/ayah/${ayahNumber}/${language}`)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch tafsir for ayah ${ayahNumber} from ${API_BASE_URL}: ${response.statusText}`,
    )
  }
  const data = await response.json()
  return data.data
}
