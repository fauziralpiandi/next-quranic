import { AllAyahs, Tafsir } from '~/types.d'

interface SurahAPIResponse {
  data: {
    surahs: Array<{
      ayahs: Array<{
        text: string
        numberInSurah: number
      }>
      englishName: string
      name: string
      number: number
    }>
  }
}

export const fetchAllAyahs = async (): Promise<AllAyahs> => {
  const [responseId, responseEn] = await Promise.all([
    fetch('https://api.alquran.cloud/v1/quran/id.indonesian'),
    fetch('https://api.alquran.cloud/v1/quran/en.asad'),
  ])

  if (!responseId.ok || !responseEn.ok) {
    throw new Error('Failed to fetch ayahs')
  }

  const [dataId, dataEn]: [SurahAPIResponse, SurahAPIResponse] =
    await Promise.all([responseId.json(), responseEn.json()])

  const ayahsId = dataId.data.surahs.flatMap((surah) =>
    surah.ayahs.map((ayah) => ({
      text: ayah.text,
      textArabic: ayah.text,
      surah: {
        name: surah.englishName,
        nameArabic: surah.name,
        number: surah.number,
      },
      numberInSurah: ayah.numberInSurah,
    })),
  )

  const ayahsEn = dataEn.data.surahs.flatMap((surah) =>
    surah.ayahs.map((ayah) => ({
      text: ayah.text,
      textArabic: ayah.text,
      surah: {
        name: surah.englishName,
        nameArabic: surah.name,
        number: surah.number,
      },
      numberInSurah: ayah.numberInSurah,
    })),
  )

  return { id: ayahsId, en: ayahsEn }
}

export const fetchTafsir = async (
  ayahNumber: number,
  language: 'id' | 'en',
): Promise<Tafsir> => {
  const tafsirUrl =
    language === 'id'
      ? `https://api.alquran.cloud/v1/ayah/${ayahNumber}/id.jalalayn`
      : `https://api.alquran.cloud/v1/ayah/${ayahNumber}/en.maududi`

  const response = await fetch(tafsirUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch tafsir')
  }

  const data: { data: Tafsir } = await response.json()
  return data.data
}
