export interface Quranic {
  currentAyah: Quran | null
  tafsir: { text: string } | null
  isTransitioning: boolean
  error: string | null
  ayahIndex: number | null
  handleShuffleClick: () => void
}

export interface Quran {
  number: number
  numberInSurah: number
  text: string
  surah: {
    number: number
    name: string
    translation: string
  }
}

export interface Surah {
  number: number
  englishName: string
  englishNameTranslation: string
  ayahs: Ayah[]
}

export interface Ayah {
  numberInSurah: number
  text: string
}

export interface Tafsir {
  id: number
  text: string
}
