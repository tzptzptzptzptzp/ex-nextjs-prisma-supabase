'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const getBlogById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`)
  const data = await res.json()
  return data.post
}

const editBlog = async (title: string | undefined, description: string | undefined, id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, id })
  })
}

const deleteBlog = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const EditBlog = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.loading('Editing in progress')
    await editBlog(titleRef.current?.value, descriptionRef.current?.value, params.id)
    toast.success('Successful while posting')
    router.push('/')
    router.refresh()
  }

  const handleDelete = () => {
    toast.loading('Delete in progress')
    deleteBlog(params.id)
    toast.success('Deletion was successful.')
    router.push('/')
    router.refresh()
  };

  return (
    <main className='flex flex-col items-center justify-center gap-4 w-screen h-screen'>
      <Toaster />
      <div>
        <h1 className="text-xl">Edit Post</h1>
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
          <div className="flex justify-center gap-4">
            <button
              className='px-4 py-2 border rounded-md hover:shadow-md'
            >
              Submit
            </button>
            <button
              onClick={handleDelete}
              className='px-2 py-1 border rounded-md'
            >
              Delete Post
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