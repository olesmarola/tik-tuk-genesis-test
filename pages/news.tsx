import { FC, useEffect, useState } from 'react'
import 'twin.macro'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { POST_LIMIT } from '../constants/news'
import { useRouter } from 'next/router'
import { Post } from '../types/post'
import PostLayout from '../components/postLayout'
import useSWR from 'swr'
import axiosFetcher from '../lib/axiosFetcher'
import Loader from '../components/loader'

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  let posts

  try {
    const response = await axios.get('/trending/feed', {
      params: { limit: POST_LIMIT, page: params?.page || 1 },
    })

    if (response.status === 200) {
      posts = await response.data
    } else {
      posts = []
    }
  } catch (e) {
    posts = []
  }

  return {
    props: {
      posts,
      defaultPage: query?.page || 1,
    },
  }
}

interface NewsProps {
  posts: Post[]
  defaultPage: string
}

const News: FC<NewsProps> = ({ posts, defaultPage }) => {
  const [page, setPage] = useState<string>(defaultPage)
  const { data } = useSWR<Post[]>(
    `/trending/feed?page=${page}&limit=${POST_LIMIT}`,
    axiosFetcher,
    { fallback: posts },
  )
  const router = useRouter()

  useEffect(() => {
    void router.push(
      { pathname: router.pathname, query: { page } },
      undefined,
      { shallow: true },
    )
  }, [page])

  if (!data) {
    return <Loader width={64} height={64} />
  }

  return (
    <>
      <Head>
        <title>Feeds</title>
      </Head>
      <div tw="p-4 grid max-w-max gap-4 mx-auto">
        {data.map(p => (
          <PostLayout post={p} key={p.id} />
        ))}
      </div>
    </>
  )
}

export default News
