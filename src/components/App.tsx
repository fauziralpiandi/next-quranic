'use client'

import { useState, useEffect, useCallback } from 'react'

import { useNextQuranic } from '~/hooks'
import Wrapper from '~/Wrapper'
import {
  handleTouchEvents,
  handleLanguageChange,
  handleShuffle,
} from '~/handlers'

export default function NextQuranicShuffle() {
  const [language, setLanguage] = useState<'id.indonesian' | 'en.sahih'>(
    'id.indonesian',
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { setAyahIndex, ayahIndex, allAyahs, tafsir, error } =
    useNextQuranic(language)

  useEffect(() => {
    const touchStartHandler = handleTouchEvents((newLanguage) =>
      handleLanguageChange(newLanguage, setLanguage, setIsTransitioning),
    )

    window.addEventListener('touchstart', touchStartHandler)

    return () => {
      window.removeEventListener('touchstart', touchStartHandler)
    }
  }, [setLanguage, setIsTransitioning])

  const currentAyah =
    ayahIndex !== null && allAyahs ? allAyahs[ayahIndex] : null

  const handleShuffleClick = useCallback(() => {
    handleShuffle(allAyahs, setAyahIndex, setIsTransitioning)
  }, [allAyahs, setAyahIndex, setIsTransitioning])

  return (
    <Wrapper
      currentAyah={currentAyah}
      tafsir={tafsir}
      isTransitioning={isTransitioning}
      error={error}
      ayahIndex={ayahIndex}
      language={language}
      handleShuffleClick={handleShuffleClick}
    />
  )
}
