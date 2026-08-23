'use client'

import { useEffect } from 'react'

import Image from 'next/image'

import { useSetMetadata } from '@/store/metadata-store'

const LOGO_WIDTH = 220

const Splash = () => {
  const [metadata, setMetadata] = useSetMetadata()

  useEffect(() => {
    setMetadata((prev) => ({ ...prev, isLoaded: true }))
  }, [setMetadata])

  return (
    !metadata.isLoaded && (
      <div className='bg-chrome text-chrome-foreground absolute inset-0 z-50 flex items-center justify-center'>
        <div className='animate-slide-up text-center opacity-0'>
          <Image
            className='drop-shadow-lg'
            src='/Splitify.png'
            alt='Splitify'
            width={LOGO_WIDTH}
            height={LOGO_WIDTH / (10 / 3)}
          />
        </div>
      </div>
    )
  )
}

export default Splash
