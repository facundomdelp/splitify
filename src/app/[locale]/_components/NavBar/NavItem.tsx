import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { ChevronRight, LucideProps } from 'lucide-react'
import Link from 'next/link'
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

interface Props {
  children: ReactNode
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  emoji?: string
  href?: string
  onClick?: () => void
  strong?: boolean
  loading?: boolean
  disabled?: boolean
  handleNavigation?: React.MouseEventHandler<HTMLAnchorElement>
}

const NavItem = ({
  children,
  icon: Icon,
  emoji,
  href,
  onClick,
  strong,
  loading,
  disabled,
  handleNavigation,
}: Props) => {
  const NavChildren = () => (
    <>
      {Icon ? (
        <Icon
          className={cn('text-green-700 size-[20px] flex-shrink-0', disabled ? 'text-gray-400 cursor-not-allowed' : '')}
        />
      ) : (
        emoji
      )}
      <span className={cn('text-nowrap flex gap-3', strong ? 'font-bold' : '')}>{children}</span>
      {!loading ? (
        <ChevronRight className='ml-auto size-[20px] flex-shrink-0' />
      ) : (
        <Spinner className='ml-auto size-[20px] flex-shrink-0 text-green-600' />
      )}
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
