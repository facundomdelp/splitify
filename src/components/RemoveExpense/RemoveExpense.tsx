'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import ConfirmationModal from '@/components/ConfirmationModal'

import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import { X } from 'lucide-react'

interface Props {
  id: string
  name: string
  onRemoveExpense: (id: string) => void
}

const RemoveExpense = ({ id, name, onRemoveExpense }: Props) => {
  const [open, setOpen] = useState(false)

  const getEmojiFromString = useGetEmojiFromString()

  const t = useTranslations('RemoveExpense')

  return (
    <>
      <X
        className='mx-1 size-[18px] h-[20px] shrink-0 cursor-pointer items-center text-gray-500 hover:text-red-800'
        onClick={() => setOpen(true)}
      />

      <ConfirmationModal
        open={open}
        onOpenChange={setOpen}
        title={
          <>
            {t('Are you sure you want to remove')}
            <div className='flex min-w-0 flex-nowrap space-x-1'>
              <p>{getEmojiFromString(name)}</p>
              <strong className='block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold'>
                {name}
              </strong>
            </div>
            {t('from the list?')}
          </>
        }
        onConfirm={() => onRemoveExpense(id)}
        destructive
      />
    </>
  )
}

export default RemoveExpense
