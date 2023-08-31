import Link from 'next/link'

const AddBlog = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-4 w-screen h-screen'>
      <div>
        <h1 className="text-xl">New Post</h1>
      </div>
      <div className="w-1/3 p-8 shadow-md">
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Title" className="px-4 py-2 border rounded-md" />
          <textarea placeholder="Description" rows={3} className="px-4 py-2 border rounded-md"></textarea>
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