'use client'

import Image from 'next/image'
import NavBar from '../NavBar/NavBar'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Locale } from '@/types/common.types'
import { useMemo } from 'react'

const LOGO_WIDTH = 120

const locationEmoji = {
  '': (
    <p className='absolute right-0 bottom-0 translate-x-[50%] translate-y-[50%] text-xl rotate-[15deg] origin-center'>
      ⚡
    </p>
  ),
  '/groups': (
    <p className='absolute -right-1 bottom-0 translate-x-[50%] translate-y-[50%] text-lg rotate-[1deg] origin-center'>
      ✈️
    </p>
  ),
}

const Header = () => {
  const { locale } = useParams<{ locale: Locale }>()
  const pathname = usePathname()

  const location = useMemo(() => pathname.split(`/${locale}`)[1], [locale, pathname])

  return (
    <header
      className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md flex-shrink-0 fixed top-0 z-10'
      id='header'
    >
      <Link href='/' className='max-w-[600px] flex justify-center items-center mt-2 relative'>
        <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
        {locationEmoji[location as keyof typeof locationEmoji]}
      </Link>

      <NavBar className='absolute right-4 top-1/2 -translate-y-1/2' />
    </header>
  )
}

export default Header
