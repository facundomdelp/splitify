import Image from 'next/image'

import NavBar from '../NavBar/NavBar'

const LOGO_WIDTH = 120

const Header = () => {
  return (
    <header
      className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md flex-shrink-0 fixed top-0 z-10'
      id='header'
    >
      <div className='max-w-[600px] flex justify-center items-center mt-2 relative'>
        <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
      </div>

      <NavBar className='absolute right-4 top-1/2 -translate-y-1/2' />
    </header>
  )
}

export default Header
