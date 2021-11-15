import { UniqueId } from './post'

export interface UserStats {
  followerCount: number
  followingCount: number
  heartCount: number
  videoCount: number
}

export interface VideoStats {
  diggCount: number
  shareCount: number
  commentCount: number
  playCount: number
}

export interface VideoInfo {
  id: UniqueId
  height: number
  width: number
  duration: number
  cover: string
  format: string
  playAddr: string
  downloadAddr: string
}

export interface UserInfo {
  id: UniqueId
  nickname: string
  avatarLarger: string
  avatarMedium: string
  avatarThumb: string
  signature: string
}

export interface UserFeed {
  id: UniqueId
  desc: string
  stats: VideoStats
  video: VideoInfo
}

export interface User {
  user: UserInfo
  stats: UserStats
}
