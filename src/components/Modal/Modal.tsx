import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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
          'flex max-h-[50dvh] min-h-[200px] w-[80vw] max-w-[400px] min-w-0 flex-col justify-center rounded-xl px-5 text-gray-700',
          className,
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className='mx-4'>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className='min-h-0 overflow-auto' asChild>
          {children}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
