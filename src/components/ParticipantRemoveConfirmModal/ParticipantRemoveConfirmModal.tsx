import { useTranslations } from 'next-intl'

import ConfirmationModal from '@/components/ConfirmationModal'

import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  hasExpenses: boolean
  onConfirm: () => void
}

const ParticipantRemoveConfirmModal = ({ open, onOpenChange, name, hasExpenses, onConfirm }: Props) => {
  const getEmojiFromString = useGetEmojiFromString()
  const t = useTranslations('ParticipantRemoveConfirmModal')

  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <>
          {t('Are you sure you want to remove')}
          <div className='flex min-w-0 flex-nowrap space-x-1'>
            <p>{getEmojiFromString(name)}</p>
            <strong className='block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold'>
              {name}
            </strong>
          </div>
          {t('from the group?')}
        </>
      }
      description={hasExpenses ? t('All their expenses will be removed as well') : undefined}
      onConfirm={onConfirm}
      destructive
    />
  )
}

export default ParticipantRemoveConfirmModal
