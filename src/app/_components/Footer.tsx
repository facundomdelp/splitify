import Image from 'next/image'

const ISOLOGO_SIZE = 40

const Footer = () => {
  return (
    <footer className='w-full bg-green-950 flex justify-center items-center h-16 flex-shrink-0'>
      <div className='max-w-[600px] flex justify-center items-center mt-1'>
        <Image src='/Isologo.png' alt='Splitify' width={ISOLOGO_SIZE} height={ISOLOGO_SIZE} />
      </div>
    </footer>
  )
}

export default Footer
