'use client'

import ConfirmationModal from '@/components/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { Transfer } from '@/types/Transfer'
import { Eraser } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Props {
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
  onClean?: () => void
  className?: string
}

export const CleanTransfers = ({ setTransfers, onClean, className }: Props) => {
  const handleOnConfirm = () => {
    onClean?.()
    setTransfers([])
  }

  const t = useTranslations('CleanTransfers')

  return (
    <ConfirmationModal
      title={t('Are you sure you want to clear the transfer list?')}
      onConfirm={handleOnConfirm}
      className={className}
    >
      <Button className='w-full' variant='outline'>
        <Eraser className='size-[18px]' />
        <p>{t('Clear')}</p>
      </Button>
    </ConfirmationModal>
  )
}
