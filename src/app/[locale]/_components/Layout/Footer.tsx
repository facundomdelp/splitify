import Image from 'next/image'
import Link from 'next/link'

import { AVAILABLE_LOCALES } from '@/utils/constants/availableLocales'

const ISOLOGO_SIZE = 65

const baseUrl = 'https://splitify.me'

const Footer = () => {
  return (
    <footer className='flex w-full justify-center bg-green-950 py-2'>
      <div className='relative mt-1 flex max-w-[600px] flex-1 flex-col items-center justify-center gap-2 bg-green-950 px-3'>
        <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />

        <nav className='hidden w-full flex-col gap-2 bg-green-950 bg-opacity-90 px-3 py-3 text-xs md:flex'>
          <ul className='flex justify-center'>
            {AVAILABLE_LOCALES?.map(({ locale, description }, index) => (
              <li className='flex after:mx-8 after:content-["•"] last:after:hidden' key={`${index}-${locale}`}>
                <Link className='flex gap-2 hover:underline' href={`${baseUrl}/${locale === 'en' ? '' : locale}`}>
                  {/* <Image src={src} alt={`${locale} page`} width={16} height={16} className='rounded-full' /> */}
                  {description}
                </Link>
              </li>
            ))}
          </ul>

          {/* Agregar un Link que sea algo así cómo FAQ o links útiles */}
          {/* <ul className='flex gap-2'>
          {SEO_ROUTES[locale].map((route) => (
            <li key={route.slug}>
            <Link href={`${baseUrl}/${locale === 'en' ? '' : `${locale}/`}${route.slug}`}>{route.title}</Link>
            </li>
            ))}
            </ul> */}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
