import { FC } from 'react'
import 'twin.macro'
import { Post } from '../types/post'
import Link from 'next/link'
import Avatar from './avatar'
import VideoPlayer from './videoPlayer'

interface PostProps {
  post: Post
}

const PostLayout: FC<PostProps> = ({ post }) => {
  return (
    <div tw="bg-gray-200 rounded-xl overflow-hidden h-[calc(100vh - 2rem)] flex flex-col">
      <Link passHref href={`/users/${post.authorMeta.name}`}>
        <a tw="flex items-center justify-between px-4 py-2 mb-2 hover:bg-gray-400 transition-colors duration-500">
          <Avatar
            size={48}
            nickname={post.authorMeta.nickName}
            avatarThumb={post.authorMeta.avatar}
          />
          <h2 tw="text-xl">{post.authorMeta.nickName}</h2>
        </a>
      </Link>
      <VideoPlayer
        src={post.videoUrl}
        videoMeta={post.videoMeta}
        likes={post.commentCount}
        comments={post.diggCount}
      />
      <div tw="mt-2 px-4" style={{ maxWidth: post.videoMeta.width }}>
        {post.text && <p tw="text-lg">{post.text}</p>}
        {post.hashtags.length && (
          <div tw="flex flex-wrap gap-2 py-2">
            {post.hashtags.map(ht => (
              <div
                tw="text-sm px-[.25rem] py-[.125rem] bg-gray-300 rounded-lg"
                key={ht.id}
              >
                {'#' + ht.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostLayout
