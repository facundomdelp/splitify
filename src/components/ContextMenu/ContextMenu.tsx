import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { EllipsisVertical } from 'lucide-react'

interface ContextMenuItemProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const ContextMenuItem = ({ children, onClick, disabled }: ContextMenuItemProps) => {
  return (
    <DropdownMenuItem
      className='cursor-pointer text-xs text-gray-600 [&>svg]:hover:text-green-600'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </DropdownMenuItem>
  )
}

interface Props {
  children: ReactNode
  ariaLabel?: string
}

const ContextMenu = ({ children, ariaLabel = 'Open menu' }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='p-1' aria-label={ariaLabel}>
          <EllipsisVertical className='text-gray-600' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' alignOffset={16} sideOffset={-8}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ContextMenu
