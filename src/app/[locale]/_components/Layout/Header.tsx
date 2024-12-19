'use client'

import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import NavBar from '../NavBar/NavBar'
import Link from 'next/link'

const LOGO_WIDTH = 120

const Header = () => {
  return (
    <header
      className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md flex-shrink-0 fixed top-0'
      id='header'
    >
      <Link href='/' className='max-w-[600px] flex justify-center items-center mt-2 relative'>
        <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
        <Badge className='absolute right-[50%] bottom-[-2px] translate-x-[50%] translate-y-[50%] scale-[0.55] opacity-80 origin-center'>
          BETA
        </Badge>
      </Link>

      <NavBar className='absolute right-4 top-1/2 -translate-y-1/2' />
    </header>
  )
}

export default Header
