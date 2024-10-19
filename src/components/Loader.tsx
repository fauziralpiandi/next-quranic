import { FaSpinner } from 'react-icons/fa'

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 animate-pulse">
      <span className="flex items-center justify-center">
        <FaSpinner className="text-4xl text-mono-500 animate-spin" />
      </span>
      <p className="text-center text-mono-200">Getting data...</p>
    </div>
  )
}
