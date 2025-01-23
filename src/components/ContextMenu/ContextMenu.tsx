import { ReactNode } from 'react'

import { EllipsisVertical } from 'lucide-react'

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

interface ContextMenuItemProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const ContextMenuItem = ({ children, onClick, disabled }: ContextMenuItemProps) => {
  return (
    <DropdownMenuItem className='text-xs text-gray-600' onClick={onClick} disabled={disabled}>
      {children}
    </DropdownMenuItem>
  )
}

interface Props {
  children: ReactNode
}

const ContextMenu = ({ children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='p-1'>
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
