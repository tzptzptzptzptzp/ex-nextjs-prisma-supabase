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

  return (
    <main className='flex flex-col items-center justify-center gap-4 w-screen h-screen'>
      <div>
        <h1 className="text-xl">Next.js Prisma Supabase Blog</h1>
      </div>
      <div className="flex flex-col gap-4 w-1/3">
        {posts.map((post: PostType) => (
          <div className="p-8 shadow-md">
            <div>
              {post.title}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
