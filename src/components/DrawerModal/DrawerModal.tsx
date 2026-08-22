import { useMediaQuery } from 'usehooks-ts'

import { cn } from '@/lib/utils'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'

import { X } from 'lucide-react'

import { Close } from '@radix-ui/react-dialog'

interface Props {
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

const DrawerModal = ({ open, setOpen, title, description, children, className }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={cn('max-h-[85dvh] overflow-y-auto text-gray-700 sm:max-w-[425px]', className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      // snapPoints={snapPoints || []}
      // activeSnapPoint={activeSnapPoint}
      // setActiveSnapPoint={setActiveSnapPoint}
      // fadeFromIndex={0}
    >
      <DrawerContent className={cn('max-h-[85dvh] pb-3 text-gray-700', className)}>
        <DrawerHeader className='px-0 text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none'>
          <X className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </Close>

        <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain'>{children}</div>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerModal
