import { useTranslations } from 'next-intl'

import ConfirmationModal from '@/components/ConfirmationModal'

import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  name: string
  onConfirm: () => void
}

const ExpenseRemoveConfirmModal = ({ open, setOpen, name, onConfirm }: Props) => {
  const getEmojiFromString = useGetEmojiFromString()
  const t = useTranslations('ExpenseRemoveConfirmModal')

  return (
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
      onConfirm={onConfirm}
      destructive
    />
  )
}

export default ExpenseRemoveConfirmModal
