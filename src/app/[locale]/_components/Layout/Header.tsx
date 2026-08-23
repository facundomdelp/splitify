'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'

import NavBar from '../NavBar/NavBar'

const LOGO_WIDTH = 120
const GLASS_RANGE = 140

const Header = () => {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0

    const paint = () => {
      frame = 0
      headerRef.current?.style.setProperty('--glass', String(Math.min(window.scrollY / GLASS_RANGE, 1)))
    }

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className='fixed top-0 z-10 flex h-20 w-full shrink-0 items-center justify-center border-b shadow-lg'
      style={{
        backgroundColor: 'hsl(var(--header) / calc(1 - 0.4 * var(--glass, 0)))',
        backdropFilter: 'blur(calc(20px * var(--glass, 0))) saturate(calc(100% + 90% * var(--glass, 0)))',
        WebkitBackdropFilter: 'blur(calc(20px * var(--glass, 0))) saturate(calc(100% + 90% * var(--glass, 0)))',
        borderBottomColor: 'hsl(var(--header-foreground) / calc(0.22 * var(--glass, 0)))',
      }}
      id='header'
    >
      <div className='relative mt-2 flex max-w-[600px] items-center justify-center'>
        <Image
          className='drop-shadow-lg'
          src='/Splitify.png'
          alt='Splitify'
          width={LOGO_WIDTH}
          height={LOGO_WIDTH / (10 / 3)}
          priority
        />
      </div>

      <NavBar className='absolute top-1/2 right-4 -translate-y-1/2' />
    </header>
  )
}

export default Header
