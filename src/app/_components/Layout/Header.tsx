'use client'

import XLogo from '@/components/icons/XLogo'
import { NavBar } from '@/components/ui/navBar'
import { LanguageContext } from '@/context/LanguageContext'
import { MailIcon } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'

const LOGO_WIDTH = 120

const Header = () => {
  const { setLanguage, language } = useContext(LanguageContext)

  return (
    <header className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md rounded-b-sm flex-shrink-0 relative'>
      <div className='max-w-[600px] flex justify-center items-center mt-2'>
        <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
      </div>

      <NavBar
        logo={<Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />}
        className='absolute right-4 top-1/2 -translate-y-1/2'
        language={{
          language,
          languages: [
            { slug: 'es', language: 'Español', src: '/es.svg' },
            { slug: 'en', language: 'English', src: '/gb.svg' },
          ],
          setLanguage,
        }}
        socialMedia={[
          {
            slug: 'x',
            href: 'https://x.com/splitify_me',
            icon: XLogo,
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
