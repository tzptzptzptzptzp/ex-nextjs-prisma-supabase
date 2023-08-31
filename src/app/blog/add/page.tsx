'use client'

import Link from 'next/link'
import { useRef } from 'react'

const postBlog = async (title: string | undefined, description: string | undefined) => {
  const res = await fetch('http://localhost:3000/api/blog', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description })
  })

}

const AddBlog = () => {
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await postBlog(titleRef.current?.value, descriptionRef.current?.value)
  }
  return (
    <main className='flex flex-col items-center justify-center gap-4 w-screen h-screen'>
      <div>
        <h1 className="text-xl">New Post</h1>
      </div>
      <div className="w-1/3 p-8 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            className="px-4 py-2 border rounded-md"
          />
          <textarea
            ref={descriptionRef}
            placeholder="Description"
            rows={3}
            className="px-4 py-2 border rounded-md"
          />
          <div className="flex justify-center">
            <button
              className='px-4 py-2 border rounded-md hover:shadow-md'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Link
        href={'/'}
        className='px-4 py-2 border rounded-md hover:shadow-md'
      >
        Return
      </Link>

    </main>
  )
}

export default AddBlog