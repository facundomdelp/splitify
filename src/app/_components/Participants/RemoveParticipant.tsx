'use client'

import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { cn } from '@/lib/utils'
import { Expenses } from '@/types'
import { X } from 'lucide-react'

interface Props {
  name: string
  participants: Expenses
  setParticipants: React.Dispatch<React.SetStateAction<Expenses>>
  className?: string
}

export const RemoveParticipant = ({ name, participants, setParticipants, className }: Props) => {
  const handleRemoveParticipant = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [name]: _, ...remainingParticipants } = participants

    setParticipants(remainingParticipants)
  }

  return (
    <ConfirmationModal
      title={
        <>
          ¿Estas seguro que quieres eliminar a
          <div className='flex flex-nowrap space-x-1 min-w-0'>
            <p>{getEmojiFromString(name)}</p>
            <strong className='font-semibold max-w-full text-ellipsis whitespace-nowrap overflow-hidden block'>
              {name}
            </strong>
          </div>
          de la lista?
        </>
      }
      onConfirm={handleRemoveParticipant}
    >
      <X className={cn('size-[18px] text-gray-500 hover:text-red-800 h-[20px] items-center', className)} />
    </ConfirmationModal>
  )
}
