import Image from 'next/image'

const LOGO_WIDTH = 120

const Header = () => {
  return (
    <header className='w-full bg-green-500 flex justify-center items-center h-20 shadow-md rounded-b-sm flex-shrink-0'>
      <div className='max-w-[600px] flex justify-center items-center mt-2'>
        <Image src='/Splitify.png' alt='Splitify' width={LOGO_WIDTH} height={LOGO_WIDTH / (10 / 3)} />
      </div>
    </header>
  )
}

export default Header
