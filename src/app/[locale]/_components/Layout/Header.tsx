import Image from 'next/image'

import NavBar from '../NavBar/NavBar'

const LOGO_WIDTH = 120

const Header = () => {
  return (
    <header
      className='fixed top-0 z-10 flex h-20 w-full flex-shrink-0 items-center justify-center bg-green-500 shadow-md'
      id='header'
    >
      <div className='relative mt-2 flex max-w-[600px] items-center justify-center'>
        <Image
          className='drop-shadow-lg'
          src='/Splitify.png'
          alt='Splitify'
          width={LOGO_WIDTH}
          height={LOGO_WIDTH / (10 / 3)}
        />
      </div>

      <NavBar className='absolute right-4 top-1/2 -translate-y-1/2' />
    </header>
  )
}

export default Header
