export type UniqueId = string

export interface Hashtag {
  id: UniqueId
  cover: string
  name: string
  title: string
}

export interface VideoMeta {
  height: number
  width: number
  duration: number
}

export interface UserMeta {
  id: UniqueId
  name: string
  nickName: string
  signature: string
  avatar: string
}

export interface Post {
  id: UniqueId
  authorMeta: UserMeta
  hashtags: Hashtag[]
  commentCount: number
  diggCount: number
  playCount: number
  text: string
  videoMeta: VideoMeta
  videoUrl: string
}
