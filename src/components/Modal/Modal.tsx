import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  children: ReactNode
  closeOnBackdropClick?: boolean
}

const Modal = ({ open, setOpen, title, children, closeOnBackdropClick = false }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onPointerDownOutside={!closeOnBackdropClick ? (e) => e.preventDefault() : undefined}
        className='min-w-0 w-[80vw] max-w-[400px] flex flex-col justify-center rounded-xl text-gray-700 px-5'
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
