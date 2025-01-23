import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { cn } from '@/lib/utils'
import { DialogDescription } from '@radix-ui/react-dialog'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  children: ReactNode
  closeOnBackdropClick?: boolean
  className?: string
}

const Modal = ({ open, setOpen, title, children, closeOnBackdropClick = false, className }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onPointerDownOutside={!closeOnBackdropClick ? (e) => e.preventDefault() : undefined}
        className={cn(
          'min-w-0 w-[80vw] max-w-[400px] max-h-[80vh] min-h-[200px] flex flex-col justify-center rounded-xl text-gray-700 px-5',
          className,
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className='mx-4'>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className='overflow-auto min-h-0'>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
