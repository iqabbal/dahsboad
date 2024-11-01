import React from 'react'

const NotFound = () => {
  return (
    <div className='h-full w-full flex justify-center items-center gap-4 bg-[#f3f4f7]'>
        <div className='text-6xl'>404</div>
        <div className='flex flex-col'>
            <span className='font-bold'>Oops! You're lost.</span>
            <span className='text-[#737a85]'>The page you are looking for was not found.</span>
        </div>
    </div>
  )
}

export default NotFound


