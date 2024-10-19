import Link from 'next/link'

export default function Home() {
  return (
    <section>
      <Link
        href="/shuffle"
        aria-label="NextQuranicShuffle"
        className="text-6xl animate-fade"
      >
        <span className="animate-pulse">&#65021;</span>
      </Link>
    </section>
  )
}
