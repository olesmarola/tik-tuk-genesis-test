import { FC } from 'react'
import 'twin.macro'

interface LoaderProps {
  width?: number
  height?: number
}

const Loader: FC<LoaderProps> = ({ width = 24, height = 24 }) => {
  return (
    <div tw="flex items-center justify-center">
      <svg
        width={width}
        height={height}
        tw="animate-spin text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          tw="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          tw="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

export default Loader
