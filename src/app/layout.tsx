import type { Metadata } from 'next'
import { Radio_Canada } from 'next/font/google'

import '~/globals.css'

import { site, verify } from '~/siteConfig'
import { Header, Footer } from '~/Layouts'

const font = Radio_Canada({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(`${site.baseUrl}`),
  alternates: {
    canonical: site.baseUrl,
  },
  title: {
    default: site.title,
    template: `%s \u2014 ${site.title}`,
  },
  description: site.description,
  keywords: site.keywords,
  verification: {
    google: verify.google,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={site.locale}>
      <body className={`${font.className} animate-fade`}>
        <div className="min-h-screen p-6 flex flex-col antialiased animate-in">
          <div className="w-full max-w-2xl mx-auto flex-grow flex flex-col">
            <Header />
            <main className="my-16 grid place-items-center flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
