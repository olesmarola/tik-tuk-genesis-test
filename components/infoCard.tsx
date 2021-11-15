import { FC } from 'react'
import 'twin.macro'
import useFormatter from '../lib/hooks/useFormatter'

interface InfoCardProps {
  label: string
  value: number
}

const InfoCard: FC<InfoCardProps> = ({ label, value }) => {
  const formatter = useFormatter()

  return (
    <div tw="px-4 py-2 bg-gray-200 rounded-xl text-center">
      <h3 tw="mb-0.5 truncate">{label}</h3>
      <p tw="font-bold truncate">{formatter.format(value)}</p>
    </div>
  )
}

export default InfoCard
