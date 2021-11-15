import { FC, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { User, UserFeed } from '../../types/user'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import UserProfile from '../../components/userProfile'
import Loader from '../../components/loader'
import UserPost from '../../components/userPost'
import 'twin.macro'
import { POST_LIMIT } from '../../constants/news'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  if (!params?.userId) {
    return {
      notFound: true,
    }
  }

  const user = await axios.get(`/user/info/${params.userId}`)

  return {
    props: {
      defaultPage: query.page || '1',
      userId: params.userId,
      user: user.data,
    },
  }
}

interface UserPageProps {
  userId: string
  user: User
  defaultPage: string
}

const UserPage: FC<UserPageProps> = ({ user, userId, defaultPage }) => {
  const [page, setPage] = useState<string>(defaultPage)
  const router = useRouter()
  const { data: posts } = useSWR<UserFeed[]>(
    `/user/feed/${userId}?page=${page}&limit=${POST_LIMIT}`,
  )

  useEffect(() => {
    void router.push(
      { pathname: router.pathname, query: { page } },
      undefined,
      { shallow: true },
    )
  }, [page])

  return (
    <>
      <Head>
        <title>{user.user.nickname}</title>
      </Head>
      <UserProfile user={user} />
      <div tw="grid gap-4 max-w-2xl mx-auto">
        {posts ? (
          posts.length ? (
            posts.map(post => <UserPost key={post.id} post={post} />)
          ) : (
            <p tw="font-bold text-center py-4 text-2xl">
              This user haven&apos;t any post yet
            </p>
          )
        ) : (
          <Loader width={64} height={64} />
        )}
      </div>
    </>
  )
}

export default UserPage
