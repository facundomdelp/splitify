'use client'

import { useEffect } from 'react'

import Image from 'next/image'

import { useSetMetadata } from '@/store/metadata-store'

const ISOLOGO_SIZE = 200

const Splash = () => {
  const [metadata, setMetadata] = useSetMetadata()

  useEffect(() => {
    setMetadata((prev) => ({ ...prev, isLoaded: true }))
  }, [setMetadata])

  return (
    !metadata.isLoaded && (
      <div className='absolute inset-0 z-50 flex items-center justify-center bg-green-950 text-white'>
        <div className='animate-slide-up text-center opacity-0'>
          <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />
        </div>
      </div>
    )
  )
}

export default Splash
