import Link from 'next/link'
import { PostType } from "./types/posts"
import { Toaster, toast } from 'react-hot-toast'

async function fetchAllPosts() {
  const res = await fetch('http://localhost:3000/api/blog', {
    cache: 'no-store'
  })
  const data = await res.json()
  return data.posts
}

const deleteBlog = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
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

  const handleDelete = async (id: number) => {
  };

  return (
    <main className='flex flex-col items-center justify-center gap-4 w-screen min-h-screen'>
      <Toaster />
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
            <div className="flex justify-between w-full mb-4">
              <h2>
                {post.title}
              </h2>
              <small>
                {formatDate(post.date)}
              </small>
            </div>
            <div className='flex justify-center'>
              <Link
                href={`/blog/edit/${post.id}`}
                className='px-2 py-1 border rounded-md'
              >
                Edit Post
              </Link>
              <button
                onClick={handleDelete(post.id)}
                className='px-2 py-1 border rounded-md'
              >
                Delete Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
