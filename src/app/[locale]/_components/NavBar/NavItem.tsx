import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { ChevronRight, LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

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
          className={cn('text-green-700 size-[20px] flex-shrink-0', disabled ? 'text-gray-400 cursor-not-allowed' : '')}
        />
      ) : (
        emoji
      )}
      <div className='flex min-w-0 gap-2'>
        <span className={cn('text-ellipsis text-nowrap min-w-0 overflow-hidden', strong ? 'font-bold' : '')}>
          {children}
        </span>
        {beta && (
          <Badge className='my-auto px-2 uppercase text-nowrap opacity-70 rounded-lg text-[8px] flex leading-[0.6rem] pointer-events-none'>
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
