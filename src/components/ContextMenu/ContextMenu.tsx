import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { EllipsisVertical } from 'lucide-react'
import { ReactNode } from 'react'

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
        <Button variant='ghost' className='px-3'>
          <EllipsisVertical className='text-gray-600' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' alignOffset={24} sideOffset={-5}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ContextMenu
