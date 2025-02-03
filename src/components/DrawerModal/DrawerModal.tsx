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
  snapPoints?: Array<string | number>
  activeSnapPoint?: string | number | null
  setActiveSnapPoint?: (activeSnapPoint: string | number | null) => void
}

const DrawerModal = ({
  open,
  setOpen,
  title,
  description,
  children,
  className,
  snapPoints,
  activeSnapPoint,
  setActiveSnapPoint,
}: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={cn('text-gray-700 sm:max-w-[425px]', className)}>
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
      snapPoints={snapPoints || []}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
      fadeFromIndex={0}
    >
      <DrawerContent className={cn('text-gray-700', className)}>
        <DrawerHeader className='px-0 text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
          <X className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </Close>

        {children}
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerModal
