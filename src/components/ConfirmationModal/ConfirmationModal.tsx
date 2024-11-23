'use client'

import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog'

interface Props {
  children: React.ReactNode
  className?: string
  title: React.ReactNode
  onConfirm: () => void
}

export const ConfirmationModal = ({ children, className, title, onConfirm }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className='min-w-0 w-[80vw] max-w-[400px] flex justify-center rounded-xl text-gray-700 px-5'
      >
        <DialogHeader className='min-w-0'>
          <DialogTitle className='text-center font-normal text-balance leading-7 mt-5 max-w-full gap-1 flex flex-wrap justify-center'>
            {title}
          </DialogTitle>
          <DialogFooter className='pt-4 px-6'>
            <DialogClose asChild>
              <Button variant='outline' onClick={onConfirm} className='flex-1'>
                Si
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className='flex-1'>No</Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
