import Image from 'next/image'

const ISOLOGO_SIZE = 65

const Footer = () => {
  return (
    <footer className='w-full bg-green-950 flex justify-center items-center flex-shrink-0 py-2 px-3'>
      <div className='max-w-[600px] flex justify-center items-center mt-1 relative flex-1'>
        <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />
      </div>
    </footer>
  )
}

export default Footer
