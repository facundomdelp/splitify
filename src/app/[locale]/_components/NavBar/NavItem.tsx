import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { Link } from '@/i18n/routing'

import { cn } from '@/lib/utils'

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
  handleNavigation?: React.MouseEventHandler<HTMLAnchorElement>
}

type NavChildrenProps = Pick<Props, 'children' | 'icon' | 'emoji' | 'strong' | 'loading' | 'disabled'>

const NavChildren = ({ children, icon: Icon, emoji, strong, loading, disabled }: NavChildrenProps) => (
  <>
    {Icon ? (
      <Icon
        className={cn(
          'text-brand-muted size-[20px] shrink-0',
          disabled ? 'text-muted-foreground cursor-not-allowed' : '',
        )}
      />
    ) : (
      emoji
    )}
    <div className='flex min-w-0 gap-2'>
      <span className={cn('min-w-0 overflow-hidden text-nowrap text-ellipsis', strong ? 'font-bold' : '')}>
        {children}
      </span>
    </div>
    {!loading ? (
      <ChevronRight className='ml-auto size-[20px] shrink-0' />
    ) : (
      <Spinner className='text-brand ml-auto size-[20px] shrink-0' />
    )}
  </>
)

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
  const navChildren = (
    <NavChildren icon={Icon} emoji={emoji} strong={strong} loading={loading} disabled={disabled}>
      {children}
    </NavChildren>
  )

  return (
    <li className={cn('text-foreground border-b py-3 text-sm', disabled ? 'cursor-not-allowed' : '')}>
      {href && !disabled ? (
        <Link href={href} className='flex flex-nowrap items-center gap-4' onClick={handleNavigation}>
          {navChildren}
        </Link>
      ) : (
        <Button
          variant='ghost'
          className='flex h-fit w-full flex-nowrap items-center gap-4 p-0 font-normal hover:bg-inherit hover:text-inherit [&_svg]:size-[20px]'
          onClick={onClick}
          disabled={disabled}
        >
          {navChildren}
        </Button>
      )}
    </li>
  )
}

export default NavItem
