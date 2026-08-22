import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { useGetEmojiFromString } from '@/utils/hooks/useGetEmojiFromString'

import { X } from 'lucide-react'

interface Props {
  name: string
  onRemove?: () => void
  disabled?: boolean
  className?: string
}

const ParticipantPill = ({ name, onRemove, disabled, className }: Props) => {
  const getEmojiFromString = useGetEmojiFromString()
  const t = useTranslations('ParticipantPill')

  return (
    <li
      className={cn(
        'flex min-w-0 items-center gap-1 rounded-full border border-green-600 bg-green-50 py-1 pl-2 text-xs text-green-800',
        !onRemove ? 'pr-2' : '',
        className,
      )}
    >
      <span>{getEmojiFromString(name)}</span>
      <span className='max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</span>

      {onRemove && (
        <button
          type='button'
          className='pr-2 text-gray-400 transition-colors hover:text-destructive disabled:pointer-events-none disabled:opacity-40'
          onClick={onRemove}
          disabled={disabled}
          aria-label={t('Remove {name}', { name })}
        >
          <X className='size-3' />
        </button>
      )}
    </li>
  )
}

export default ParticipantPill
