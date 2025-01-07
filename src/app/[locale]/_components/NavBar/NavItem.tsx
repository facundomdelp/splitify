import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight, LucideProps } from 'lucide-react'
import Link from 'next/link'
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

interface Props {
  children: ReactNode
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  href?: string
  onClick?: () => void
  disabled?: boolean
  handleNavigation?: React.MouseEventHandler<HTMLAnchorElement>
}

const NavItem = ({ children, icon: Icon, href, onClick, disabled, handleNavigation }: Props) => {
  const NavChildren = () => (
    <>
      <Icon
        className={cn('text-green-700 size-[20px] flex-shrink-0', disabled ? 'text-gray-400 cursor-not-allowed' : '')}
      />
      <span className='text-nowrap flex gap-3'>{children}</span>
      <ChevronRight className='ml-auto size-[20px] flex-shrink-0' />
    </>
  )

  return (
    <li className={cn('text-gray-600 py-3 border-b text-sm', disabled ? 'cursor-not-allowed' : '')}>
      {href && !disabled ? (
        <Link href={href} className='flex flex-nowrap gap-4 items-center' onClick={handleNavigation}>
          <NavChildren />
        </Link>
      ) : (
        <Button
          variant='ghost'
          className='flex flex-nowrap gap-4 items-center p-0 w-full font-normal hover:bg-inherit hover:text-inherit h-fit [&_svg]:size-[20px]'
          onClick={onClick}
          disabled={disabled}
        >
          <NavChildren />
        </Button>
      )}
    </li>
  )
}

export default NavItem
