'use client'

import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { Transfer } from '@/types'

interface Props {
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
}

export const CleanTransfers = ({ setTransfers }: Props) => {
  return (
    <ConfirmationModal
      title='¿Estas seguro que quieres limpiar el listado de transferencias?'
      onConfirm={() => setTransfers([])}
      className='flex-1'
    >
      <Button className='w-full' variant='outline'>
        Limpiar
      </Button>
    </ConfirmationModal>
  )
}
