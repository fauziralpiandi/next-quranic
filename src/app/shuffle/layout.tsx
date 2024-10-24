export const metadata = {
  title: 'Shuffle',
}

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <section className="animate-fade">{children}</section>
}
