import XLogo from '@/components/icons/XLogo'
import { MailIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ISOLOGO_SIZE = 65

const Footer = () => {
  return (
    <footer className='w-full bg-green-950 flex justify-center items-center flex-shrink-0 py-2 px-3'>
      <div className='max-w-[600px] flex justify-center items-center mt-1 relative flex-1'>
        <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />
        <div className='flex gap-1 absolute right-2 bottom-2'>
          <Link
            href='https://x.com/splitify_me'
            target='_blank'
            className='rounded-full p-1 size-5 flex items-center justify-center text-white'
          >
            <XLogo />
          </Link>
          <Link
            href='mailto:splitify.me@gmail.com'
            className='rounded-full p-1 size-5 flex items-center justify-center text-white'
          >
            <MailIcon />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
