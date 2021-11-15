import { FC } from 'react'
import 'twin.macro'
import Image from 'next/image'

interface AvatarProps {
  nickname: string
  avatarThumb: string
  size?: number
}

const Avatar: FC<AvatarProps> = ({ nickname, avatarThumb, size = 64 }) => (
  <div tw="rounded-full w-max sm:mr-2 flex items-center overflow-hidden">
    <Image width={size} height={size} alt={nickname} src={avatarThumb} />
  </div>
)

export default Avatar
