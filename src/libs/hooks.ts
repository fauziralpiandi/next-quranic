'use client'

import { useEffect, useState } from 'react'

import { Quran, Tafsir } from '~/types.d'
import { fetchAllAyahs, fetchTafsir } from '~/api'

export const useNextQuranic = (language: 'id.indonesian' | 'en.sahih') => {
  const [ayahIndex, setAyahIndex] = useState<number | null>(null)
  const [allAyahs, setAllAyahs] = useState<Quran[] | null>(null)
  const [tafsir, setTafsir] = useState<Tafsir | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedIndex = localStorage.getItem('ayahIndex')

        const ayahs = await fetchAllAyahs(language)
        setAllAyahs(ayahs)

        if (!storedIndex) {
          const randomIndex = Math.floor(Math.random() * ayahs.length)
          setAyahIndex(randomIndex)
          localStorage.setItem('ayahIndex', randomIndex.toString())
        } else {
          setAyahIndex(Number(storedIndex))
        }
      } catch (error) {
        setError(`Error fetching ayahs: ${(error as Error).message}`)
      }
    }

    fetchData()
  }, [language])

  useEffect(() => {
    if (ayahIndex !== null && allAyahs) {
      const ayahNumber = allAyahs[ayahIndex].numberInSurah

      fetchTafsir(ayahNumber, language)
        .then((tafsir) => setTafsir(tafsir))
        .catch((error) =>
          setError(`Error fetching tafsir: ${(error as Error).message}`),
        )
    }
  }, [ayahIndex, allAyahs, language])

  return { ayahIndex, setAyahIndex, allAyahs, tafsir, error }
}
