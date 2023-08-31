import Link from 'next/link'
import { PostType } from "./types/posts"

async function fetchAllPosts() {
  const res = await fetch('http://localhost:3000/api/blog', {
    cache: 'no-store'
  })
  const data = await res.json()
  return data.posts
}

export default async function Home() {

  const posts = await fetchAllPosts()

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ja-JP', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  return (
    <main className='flex flex-col items-center justify-center gap-4 w-screen h-screen'>
      <div>
        <h1 className="text-xl">Next.js Prisma Supabase Blog</h1>
      </div>
      <div>
        <Link
          href={'/blog/add'}
          className='px-4 py-2 border rounded-md'
        >
          Add Post
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-1/3">
        {posts.map((post: PostType) => (
          <div className="p-8 shadow-md">
            <div className="flex justify-between w-full">
              <h2>
                {post.title}
              </h2>
              <small>
                {formatDate(post.date)}
              </small>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
