import NextQuranic from '~/App'

export const revalidate = 60
export const dynamicParams = true

export function generateStaticParams() {
  return []
}

export default function App() {
  return <NextQuranic />
}
