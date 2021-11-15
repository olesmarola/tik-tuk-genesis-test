import { FC } from 'react'
import 'twin.macro'
import { User } from '../types/user'
import InfoCard from './infoCard'
import Avatar from './avatar'

interface UserProfileProps {
  user: User
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <div tw="my-4 rounded-lg bg-gray-100 max-w-2xl mx-auto px-4 py-2">
      <div tw="flex items-center justify-between mb-2">
        <Avatar
          nickname={user.user.nickname}
          avatarThumb={user.user.avatarThumb}
        />
        <div tw="grid gap-2 grid-cols-3">
          <InfoCard label="Videos" value={user.stats.videoCount} />
          <InfoCard label="Followers" value={user.stats.followerCount} />
          <InfoCard label="Followings" value={user.stats.followingCount} />
        </div>
      </div>
      <div>
        <p tw="text-2xl mb-1">{user.user.nickname}</p>
        <p>{user.user.signature}</p>
      </div>
    </div>
  )
}

export default UserProfile
