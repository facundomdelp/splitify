import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { Link } from '@/i18n/routing'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'

import { ChevronRight, LucideProps } from 'lucide-react'

interface Props {
  children: string
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  emoji?: string
  href?: string
  onClick?: () => void
  strong?: boolean
  loading?: boolean
  disabled?: boolean
  beta?: boolean
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
  beta,
  handleNavigation,
}: Props) => {
  const NavChildren = () => (
    <>
      {Icon ? (
        <Icon
          className={cn('size-[20px] flex-shrink-0 text-green-700', disabled ? 'cursor-not-allowed text-gray-400' : '')}
        />
      ) : (
        emoji
      )}
      <div className='flex min-w-0 gap-2'>
        <span className={cn('min-w-0 overflow-hidden text-ellipsis text-nowrap', strong ? 'font-bold' : '')}>
          {children}
        </span>
        {beta && (
          <Badge className='pointer-events-none my-auto flex text-nowrap rounded-lg px-2 text-[8px] uppercase leading-[0.6rem] opacity-70'>
            Beta
          </Badge>
        )}
      </div>
      {!loading ? (
        <ChevronRight className='ml-auto size-[20px] flex-shrink-0' />
      ) : (
        <Spinner className='ml-auto size-[20px] flex-shrink-0 text-green-600' />
      )}
    </>
  )

  return (
    <li className={cn('border-b py-3 text-sm text-gray-600', disabled ? 'cursor-not-allowed' : '')}>
      {href && !disabled ? (
        <Link href={href} className='flex flex-nowrap items-center gap-4' onClick={handleNavigation}>
          <NavChildren />
        </Link>
      ) : (
        <Button
          variant='ghost'
          className='flex h-fit w-full flex-nowrap items-center gap-4 p-0 font-normal hover:bg-inherit hover:text-inherit [&_svg]:size-[20px]'
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
