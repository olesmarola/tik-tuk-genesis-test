import { FC, useEffect, useRef, useState } from 'react'
import 'twin.macro'
import Loader from './loader'
import { useInView } from 'react-intersection-observer'
import PlayButton from './playButton'
import { VideoMeta } from '../types/post'
import Social from './social'
import useFormatter from '../lib/hooks/useFormatter'

interface VideoPlayerProps {
  poster?: string
  src: string
  videoMeta?: VideoMeta
  likes?: number
  comments?: number
  views?: number
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  src,
  poster,
  videoMeta,
  likes,
  comments,
  views,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null!)
  const formatter = useFormatter()
  const { inView, ref } = useInView({
    threshold: 0.25,
  })

  useEffect(() => {
    if (!isLoading) {
      setIsPaused(!inView)
    }

    if (!inView) {
      videoRef.current.currentTime = 0
    }
  }, [inView, isLoading])

  useEffect(() => {
    if (isPaused) {
      void videoRef.current.pause()
    } else {
      void videoRef.current.play()
    }
  }, [isPaused])

  return (
    <div tw="relative w-full h-full" ref={ref}>
      {views && (
        <div tw="absolute left-2 top-1 rounded-lg bg-gray-200 px-[.25rem] py-[.125rem]">
          Views: {formatter.format(views)}
        </div>
      )}
      <video
        ref={videoRef}
        loop
        onLoadStart={setIsLoading.bind(null, true)}
        onLoadedData={setIsLoading.bind(null, false)}
        tw="block w-full h-full object-contain absolute inset-0"
        poster={poster}
        width={videoMeta?.width}
      >
        <source src={src} type={'video/mp4'} />
      </video>
      {isLoading && (
        <div tw="absolute inset-0 flex items-center justify-center">
          <Loader width={64} height={64} />
        </div>
      )}
      <PlayButton
        onClick={setIsPaused.bind(null, !isPaused)}
        isPaused={isPaused}
      />
      <Social likes={likes} comments={comments} />
    </div>
  )
}

export default VideoPlayer
