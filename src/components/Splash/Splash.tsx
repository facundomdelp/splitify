'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const ISOLOGO_SIZE = 180
const DURATION = 400

const Splash = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, DURATION)

    return () => clearTimeout(timer)
  }, [])

  return (
    isVisible && (
      <div className='absolute inset-0 flex items-center justify-center bg-green-950 text-white z-50'>
        <div className='text-center animate-slide-up'>
          <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />
        </div>
      </div>
    )
  )
}

export default Splash
