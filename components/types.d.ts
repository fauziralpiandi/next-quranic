export type Ayah = {
  text: string
  surah: {
    name: string
    nameArabic: string
    number: number
  }
  numberInSurah: number
  textArabic: string
}

export type Tafsir = {
  text: string
}

export type AllAyahs = {
  id: Ayah[]
  en: Ayah[]
}
