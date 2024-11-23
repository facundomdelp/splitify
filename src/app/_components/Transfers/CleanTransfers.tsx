'use client'

import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { Transfer } from '@/types'
import { Eraser } from 'lucide-react'

interface Props {
  setTransfers: React.Dispatch<React.SetStateAction<Transfer[]>>
  className?: string
}

export const CleanTransfers = ({ setTransfers, className }: Props) => {
  return (
    <ConfirmationModal
      title='¿Estas seguro que quieres limpiar el listado de transferencias?'
      onConfirm={() => setTransfers([])}
      className={className}
    >
      <Button className='w-full' variant='outline'>
        <Eraser className='size-[18px]' />
        <p>Limpiar</p>
      </Button>
    </ConfirmationModal>
  )
}
