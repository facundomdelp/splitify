'use client'

import ConfirmationModal from '@/components/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { LanguageContext } from '@/context/LanguageContext'
import { Transfer } from '@/types'
import { Eraser } from 'lucide-react'
import { useContext } from 'react'

interface Props {
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
  onClean?: () => void
  className?: string
}

export const CleanTransfers = ({ setTransfers, onClean, className }: Props) => {
  const { t } = useContext(LanguageContext)

  const handleOnConfirm = () => {
    onClean?.()
    setTransfers([])
  }

  return (
    <ConfirmationModal
      title='¿Estas seguro que quieres limpiar el listado de transferencias?'
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
