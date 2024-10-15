import type { Metadata } from 'next'
import { Radio_Canada } from 'next/font/google'

import '~/globals.css'

const font = Radio_Canada({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NextQuranic \u2014 Fauzira Alpiandi',
  alternates: {
    canonical: 'https://nextquranic.zira.my.id',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased animate-in`}>
        <div className="min-h-screen p-8 flex flex-col">
          <div className="flex-grow flex flex-col max-w-xl mx-auto w-full">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer
      className="flex-shrink-0 flex justify-center items-center mt-16"
      aria-label="Footer"
    >
      <div className="text-xs text-mono-200">
        {new Date().getFullYear()} NextQuranic &mdash; Fauzira Alpiandi
      </div>
    </footer>
  )
}
