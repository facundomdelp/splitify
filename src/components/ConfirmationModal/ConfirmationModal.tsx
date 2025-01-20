'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { useTranslations } from 'next-intl'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
  title: React.ReactNode
  description?: string
  onConfirm: () => void
  destructive?: boolean
}

const ConfirmationModal = ({ open, onOpenChange, title, description, onConfirm, destructive }: Props) => {
  const t = useTranslations('ConfirmationModal')

  const handleOnClick = () => {
    onOpenChange(false)
    onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className='min-w-0 w-[80vw] max-w-[400px] flex flex-col justify-center rounded-xl text-gray-700 px-5'
      >
        <DialogTitle className='text-center font-normal text-balance leading-7 mt-5 min-w-0 gap-1 flex flex-wrap justify-center'>
          {title}
        </DialogTitle>
        {description && <DialogDescription className='text-center text-sm'>{description}</DialogDescription>}
        <DialogFooter className='pt-4 px-6 flex-row gap-3'>
          <Button
            variant={!destructive ? 'outline' : 'destructive'}
            onClick={destructive ? handleOnClick : undefined}
            className='flex-1'
          >
            {!destructive ? t('No') : t('Yes')}
          </Button>
          <Button variant='default' onClick={!destructive ? handleOnClick : undefined} className='flex-1'>
            {!destructive ? t('Yes') : t('No')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
