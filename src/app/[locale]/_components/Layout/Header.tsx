'use client'

// import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import NavBar from '../NavBar/NavBar'
// import { usePathname } from '@/i18n/routing'
// import { useTranslations } from 'next-intl'
// import { useMemo } from 'react'
// import { cn } from '@/lib/utils'

const LOGO_WIDTH = 120

const Header = () => {
  // const pathname = usePathname()
  // const t = useTranslations('Header')

  // const badgeContent = useMemo(() => {
  //   if (pathname === '/') {
  //     return t('Quick')
  //   }

  //   if (pathname.startsWith('/groups')) {
  //     return t('Groups')
  //   }

  //   return null
  // }, [pathname, t])

  // // const badgeBackgroundColor = useMemo(() => {
  // //   if (pathname === '/') {
  // //     return 'bg-orange-500'
  // //   }

  // //   if (pathname.includes('groups')) {
  // //     return 'bg-blue-600'
  // //   }

  // //   return null
  // // }, [pathname])

  return (
    <header
      className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md flex-shrink-0 fixed top-0 z-10'
      id='header'
    >
      <div className='max-w-[600px] flex justify-center items-center mt-2 relative'>
        <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
        {/*  {badgeContent && (
          <Badge
            className={cn(
              'absolute right-[50%] bottom-[-2px] translate-x-[50%] translate-y-[50%] scale-[0.55] origin-center uppercase text-nowrap italic bg-opacity-75',
              // badgeBackgroundColor,
            )}
          >
            {badgeContent}
          </Badge>
        )} */}
      </div>

      <NavBar className='absolute right-4 top-1/2 -translate-y-1/2' />
    </header>
  )
}

export default Header
