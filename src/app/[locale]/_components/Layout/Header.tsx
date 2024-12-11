'use client'

import XLogo from '@/components/icons/XLogo'
import NavBar from '@/components/NavBar'
import { Badge } from '@/components/ui/badge'
import { Locale } from '@/types/Common'
import { MailIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const LOGO_WIDTH = 120

const Header = () => {
  const locale = useLocale() as Locale
  const router = useRouter()

  const setLocale = (newLocale: Locale) => {
    router.push(`/${newLocale}`)
  }

  return (
    <header className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md rounded-b-sm flex-shrink-0 relative'>
      <div className='max-w-[600px] flex justify-center items-center mt-2 relative'>
        <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
        <Badge className='absolute right-[50%] bottom-[-2px] translate-x-[50%] translate-y-[50%] scale-[0.55] opacity-80 origin-center'>
          BETA
        </Badge>
      </div>

      <NavBar
        logo={<Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />}
        className='absolute right-4 top-1/2 -translate-y-1/2'
        locales={{
          locale,
          availableLocales: [
            { locale: 'en', description: 'English', src: '/en.jpg' },
            { locale: 'es', description: 'Español', src: '/es.jpg' },
            { locale: 'pt', description: 'Português', src: '/pt.jpg' },
          ],
          setLocale,
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
