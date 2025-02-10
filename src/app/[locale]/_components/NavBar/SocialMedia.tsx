import Link from 'next/link'

import TiktokLogo from '@/components/icons/TiktokLogo'
import XLogo from '@/components/icons/XLogo'

import { COUNTRIES } from '@/utils/constants/countries'
import { useGetGeoLocation } from '@/utils/hooks/useGetGeoLocation'

import { MailIcon } from 'lucide-react'

const SocialMedia = () => {
  const userGeoLocation = useGetGeoLocation()

  return (
    <>
      {userGeoLocation?.country === COUNTRIES.argentina && (
        <a
          href='https://appgentina.com.ar/producto/splitify?ref=badge'
          title='Splitify | Appgentina'
          className='mr-auto max-w-[200px] pr-2'
          target='_blank'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='https://appgentina.com.ar/embed-svg/splitify'
            alt='Splitify | Appgentina'
            style={{ width: '229px', height: '54px' }}
            width='229'
            height='54'
          />
        </a>
      )}

      {[
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
      ].map(({ slug, href, icon: Icon }) => (
        <Link
          key={`social-media-${slug}`}
          href={href}
          target='_blank'
          className='hover:text-bordeaux flex items-center gap-1 transition-all hover:underline'
        >
          <Icon className='size-5' />
        </Link>
      ))}
    </>
  )
}

export default SocialMedia
