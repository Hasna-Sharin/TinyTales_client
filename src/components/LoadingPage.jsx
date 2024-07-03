import { Loader } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center '>
        <Loader className='w-16 h-16 animate-spin text-gray-400 '/>
      
    </div>
  )
}

export default LoadingPage
