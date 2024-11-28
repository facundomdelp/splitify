'use client'

import ConfirmationModal from '@/components/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { useTranslate } from '@/lib/hooks/useTranslate'
import { Translations } from '@/types/Common'
import { Transfer } from '@/types/Transfer'
import { Eraser } from 'lucide-react'

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

  const t = useTranslate(translations)

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

const translations = {
  'Are you sure you want to clear the transfer list?': {
    es: '¿Estas seguro que quieres limpiar el listado de transferencias?',
  },
  Clear: {
    es: 'Limpiar',
  },
} satisfies Translations
