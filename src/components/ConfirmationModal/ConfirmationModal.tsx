'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Close, Trigger } from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'

interface Props {
  children: React.ReactNode
  className?: string
  title: React.ReactNode
  onConfirm: () => void
}

const ConfirmationModal = ({ children, className, title, onConfirm }: Props) => {
  const t = useTranslations(ConfirmationModal.name)

  return (
    <Dialog>
      <Trigger asChild className={className}>
        {children}
      </Trigger>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className='min-w-0 w-[80vw] max-w-[400px] flex flex-col justify-center rounded-xl text-gray-700 px-5'
      >
        <DialogTitle className='text-center font-normal text-balance leading-7 mt-5 min-w-0 gap-1 flex flex-wrap justify-center'>
          {title}
        </DialogTitle>
        <DialogFooter className='pt-4 px-6 flex-row gap-3'>
          <Close asChild>
            <Button variant='outline' onClick={onConfirm} className='flex-1'>
              {t('Yes')}
            </Button>
          </Close>
          <Close asChild>
            <Button className='flex-1'>{t('No')}</Button>
          </Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
