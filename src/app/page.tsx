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
    <main className='flex items-center justify-center w-screen h-screen'>
      <h1>Next.js Prisma Supabase Blog</h1>
      {posts.map((post: any) => (
        <div>
          {post.title}
        </div>
      ))}
    </main>
  )
}
