'use client'

import Image from 'next/image'
import { useSetMetadata } from '../store/metadata'
import { useEffect } from 'react'

const ISOLOGO_SIZE = 200

const Splash = () => {
  const [metadata, setMetadata] = useSetMetadata()

  useEffect(() => {
    setMetadata((prev) => ({ ...prev, isLoaded: true }))
  }, [setMetadata])

  return (
    !metadata.isLoaded && (
      <div className='absolute inset-0 flex items-center justify-center bg-green-950 text-white z-50'>
        <div className='text-center opacity-0 animate-slide-up'>
          <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />
        </div>
      </div>
    )
  )
}

export default Splash
