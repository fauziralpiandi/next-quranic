'use client'

import { useEffect, useState } from 'react'

import { fetchAllAyahs, fetchTafsir } from '~/endpoint'
import { Tafsir, AllAyahs } from '~/types.d'

export default function NextQuranic() {
  const [ayahIndex, setAyahIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [allAyahs, setAllAyahs] = useState<AllAyahs | null>(null)
  const [tafsir, setTafsir] = useState<Tafsir | null>(null)
  const [language, setLanguage] = useState<'id' | 'en'>('id')
  const [fadeIn, setFadeIn] = useState<boolean>(false)

  useEffect(() => {
    fetchAllAyahs()
      .then((ayahs) => {
        setAllAyahs(ayahs)
        setAyahIndex(Math.floor(Math.random() * ayahs.id.length))
      })
      .catch(() => setError('Failed to fetch ayahs'))
  }, [])

  useEffect(() => {
    if (ayahIndex !== null && allAyahs) {
      const ayahNumber = allAyahs.id[ayahIndex].numberInSurah
      fetchTafsir(ayahNumber, language)
        .then((tafsir) => setTafsir(tafsir))
        .catch(() => setError('Failed to fetch tafsir'))
    }
  }, [ayahIndex, language, allAyahs])

  useEffect(() => {
    if (allAyahs) {
      const interval = setInterval(() => {
        setAyahIndex(Math.floor(Math.random() * allAyahs.id.length))
      }, 17_280 * 1000) // 4,8 hours
      return () => clearInterval(interval)
    }
  }, [allAyahs])

  const toggleLanguage = () => {
    setFadeIn(true)
    setTimeout(() => {
      setLanguage((prev) => (prev === 'id' ? 'en' : 'id'))
      setFadeIn(false)
    }, 300)
  }

  const currentAyah =
    ayahIndex !== null && allAyahs ? allAyahs[language][ayahIndex] : null

  return (
    <div className={`ease ${fadeIn ? 'opacity-0' : 'opacity-100'}`}>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : currentAyah ? (
        <>
          <h1 className="text-2xl font-bold">
            {currentAyah.surah.name} &nbsp;
            <span
              className="px-1 py-0.5 items-center align-middle font-medium text-xs text-mono-200 bg-mono-800 rounded-sm"
              onClick={toggleLanguage}
            >
              {language === 'id' ? 'English' : 'Indonesia'}
            </span>
          </h1>
          <p className="text-sm">&mdash;{currentAyah.text}</p>
          {tafsir && <blockquote className="my-3">{tafsir.text}</blockquote>}
          <p className="mt-6 italic text-center text-sm ease">
            {currentAyah.surah.number} &mdash; {currentAyah.numberInSurah}
          </p>
        </>
      ) : (
        <p>...</p>
      )}
    </div>
  )
}
