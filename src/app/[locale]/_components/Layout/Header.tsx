'use client'

import TiktokLogo from '@/components/icons/TiktokLogo'
import XLogo from '@/components/icons/XLogo'
import { Badge } from '@/components/ui/badge'
import { MailIcon } from 'lucide-react'
import Image from 'next/image'
import NavBar from './NavBar'

const LOGO_WIDTH = 120

const Header = () => {
  return (
    <header
      className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md flex-shrink-0 fixed top-0'
      id='header'
    >
      <div className='max-w-[600px] flex justify-center items-center mt-2 relative'>
        <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
        <Badge className='absolute right-[50%] bottom-[-2px] translate-x-[50%] translate-y-[50%] scale-[0.55] opacity-80 origin-center'>
          BETA
        </Badge>
      </div>

      <NavBar
        logo={<Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />}
        className='absolute right-4 top-1/2 -translate-y-1/2'
        socialMedia={[
          {
            slug: 'x',
            href: 'https://x.com/splitify_me',
            icon: XLogo,
          },
          {
            slug: 'tik-tok',
            href: 'https://www.tiktok.com/@.splitify',
            icon: TiktokLogo,
          },
          {
            slug: 'mail',
            href: 'mailto:splitify.me@gmail.com',
            icon: MailIcon,
          },
        ]}
      />
    </header>
  )
}

export default Header
