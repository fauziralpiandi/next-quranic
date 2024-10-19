import { Quran } from '~/types.d'

export const handleTouchEvents = (
  handleLanguageChange: (lang: 'id.indonesian' | 'en.sahih') => void,
) => {
  let startX: number

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0]
    startX = touch.clientX
  }

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0]
    const diffX = touch.clientX - startX

    if (diffX > 50) {
      handleLanguageChange('id.indonesian')
      cleanUpTouchEvents()
    } else if (diffX < -50) {
      handleLanguageChange('en.sahih')
      cleanUpTouchEvents()
    }
  }

  const cleanUpTouchEvents = () => {
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
  }

  const handleTouchEnd = () => {
    cleanUpTouchEvents()
  }

  const touchStartHandler = (event: TouchEvent) => {
    handleTouchStart(event)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }

  return touchStartHandler
}

export const handleLanguageChange = (
  newLanguage: 'id.indonesian' | 'en.sahih',
  setLanguage: React.Dispatch<
    React.SetStateAction<'id.indonesian' | 'en.sahih'>
  >,
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsTransitioning(true)
  setLanguage(newLanguage)

  setTimeout(() => {
    setIsTransitioning(false)
  }, 300)
}

export const handleShuffle = (
  allAyahs: Quran[] | null,
  setAyahIndex: (index: number | null) => void,
  setIsTransitioning: (value: boolean) => void,
) => {
  if (allAyahs) {
    setIsTransitioning(true)
    setTimeout(() => {
      const newIndex = Math.floor(Math.random() * allAyahs.length)
      setAyahIndex(newIndex)
      localStorage.setItem('ayahIndex', newIndex.toString())
      setIsTransitioning(false)
    }, 300)
  }
}
