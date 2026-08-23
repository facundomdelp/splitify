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
        {/* Dismiss on the left, the action being confirmed on the right and filled */}
        <DialogFooter className='flex-row gap-3 px-6 pt-4'>
          <Button variant='outline' onClick={() => onOpenChange(false)} className='flex-1'>
            {t('No')}
          </Button>
          <Button variant={destructive ? 'destructive-solid' : 'default'} onClick={handleOnClick} className='flex-1'>
            {t('Yes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
