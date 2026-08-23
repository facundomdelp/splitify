'use client'

import { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
  title: ReactNode
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
        className='text-foreground flex w-[80vw] max-w-[400px] min-w-0 flex-col justify-center rounded-xl px-5'
      >
        <DialogTitle className='mt-5 flex min-w-0 flex-wrap justify-center gap-1 text-center leading-7 font-normal text-balance'>
          {title}
        </DialogTitle>
        {description && <DialogDescription className='text-center text-sm'>{description}</DialogDescription>}
        <DialogFooter className='flex-row gap-3 px-6 pt-4'>
          <Button
            variant={!destructive ? 'outline' : 'destructive'}
            onClick={destructive ? handleOnClick : () => onOpenChange(false)}
            className='flex-1'
          >
            {!destructive ? t('No') : t('Yes')}
          </Button>
          <Button
            variant='default'
            onClick={!destructive ? handleOnClick : () => onOpenChange(false)}
            className='flex-1'
          >
            {!destructive ? t('Yes') : t('No')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
