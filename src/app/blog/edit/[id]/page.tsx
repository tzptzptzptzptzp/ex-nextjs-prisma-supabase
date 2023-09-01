'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const getBlogById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`)
  const data = await res.json()
  return data.post
}

const EditBlog = ({ params }: { params: { id: number } }) => {
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title
          descriptionRef.current.value = data.description
        }
      })
      .catch((err) => {
        toast.error('An error has occurred.', { id: '1' })
      })
  }, [])

  return (
    <main className='flex flex-col items-center justify-center gap-4 w-screen h-screen'>
      <Toaster />
      <div>
        <h1 className="text-xl">Edit Post</h1>
      </div>
      <div className="w-1/3 p-8 shadow-md">
        <form className="flex flex-col gap-4">
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

export default EditBlog