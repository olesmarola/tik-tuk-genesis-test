import { FC } from 'react'
import { UserFeed } from '../types/user'
import VideoPlayer from './videoPlayer'

interface UserPostProps {
  post: UserFeed
}

const UserPost: FC<UserPostProps> = ({ post }) => {
  return (
    <div tw="rounded-xl drop-shadow bg-gray-200 p-2 sm:mx-4 md:mx-0">
      <VideoPlayer
        views={post.stats.playCount}
        src={post.video.playAddr}
        poster={post.video.cover}
        videoMeta={{
          width: post.video.width,
          height: post.video.height,
          duration: post.video.duration,
        }}
        likes={post.stats.diggCount}
        comments={post.stats.commentCount}
      />
    </div>
  )
}

export default UserPost
