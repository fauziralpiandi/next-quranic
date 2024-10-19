import { PiShuffleDuotone } from 'react-icons/pi'

import { Quranic } from '~/types.d'
import { Loader } from '~/Loader'

export default function Wrapper({
  currentAyah,
  tafsir,
  isTransitioning,
  error,
  ayahIndex,
  handleShuffleClick,
}: Quranic & { language: 'id.indonesian' | 'en.sahih' }) {
  return (
    <div className="flex-grow flex flex-col items-start justify-center p-4">
      <>
        {error ? (
          <p className="font-semibold text-red-500">Error: {error}</p>
        ) : currentAyah ? (
          <>
            <h1
              key={`surah-${ayahIndex}`}
              className={`mb-4 text-2xl font-bold text-mono-50 tracking-tight leading-snug animate-fade ${
                isTransitioning ? 'animate-out' : 'animate-in'
              }`}
              style={{ '--index': 1 } as React.CSSProperties}
            >
              {currentAyah.surah.name} &nbsp;
              <span className="inline-block align-middle text-xs font-semibold text-mono-500">
                {currentAyah.surah.translation}
              </span>
            </h1>
            <p
              key={`ayah-${ayahIndex}`}
              className={`text-sm text-mono-200 leading-tight ${
                isTransitioning ? 'animate-out' : 'animate-in'
              }`}
              style={{ '--index': 2 } as React.CSSProperties}
            >
              &mdash; {currentAyah.text}
            </p>
            {tafsir && (
              <blockquote
                key={`tafsir-${ayahIndex}`}
                className={`my-4 px-4 pl-4 italic font-light text-mono-300 leading-relaxed border-l-2 border-dashed border-mono-800 ${
                  isTransitioning ? 'animate-out' : 'animate-in'
                }`}
                style={{ '--index': 3 } as React.CSSProperties}
              >
                {tafsir.text} &mdash; {currentAyah.surah.number}/
                {currentAyah.numberInSurah}
              </blockquote>
            )}
            <div className="flex items-center justify-center mt-12 animate-in">
              <button
                key={`shuffle-${ayahIndex}`}
                className={`flex items-center justify-center text-mono-300 ${
                  isTransitioning ? 'animate-out' : 'animate-in'
                }`}
                style={{ '--index': 5 } as React.CSSProperties}
                onClick={handleShuffleClick}
              >
                <div className="flex flex-row items-center gap-1.5 animate-pulse">
                  <span>Shuffle</span>
                  <PiShuffleDuotone
                    size={20}
                    className="inline-flex align-middle"
                  />
                  <span>Verse</span>
                </div>
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </>
    </div>
  )
}
