import Link from 'next/link'

import { site } from '~/siteConfig'

export function Header() {
  return (
    <header className="flex items-center justify-center" aria-label="Header">
      <div className="flex flex-col items-center gap-1.5">
        <span>&#1575;&#1604;&#1602;&#1585;&#1571;&#1606;</span>
        <Link
          href="/"
          className="font-medium text-mono-200"
          aria-label={site.title}
        >
          {site.title}
        </Link>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer
      className="flex-shrink-0 flex justify-center items-center"
      aria-label="Footer"
    >
      <div className="text-[0.8rem] text-mono-400">
        Copyright &copy; {new Date().getFullYear()} {site.author}
      </div>
    </footer>
  )
}
