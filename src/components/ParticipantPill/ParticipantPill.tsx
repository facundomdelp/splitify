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
        'border-brand-border bg-brand-surface text-brand-text flex min-w-0 items-center gap-1 rounded-full border py-1 ps-2 text-xs',
        !onRemove ? 'pe-2' : '',
        className,
      )}
    >
      <span>{getEmojiFromString(name)}</span>
      <span className='max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</span>

      {onRemove && (
        <button
          type='button'
          className='hover:text-destructive text-muted-foreground pe-2 transition-colors disabled:pointer-events-none disabled:opacity-40'
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
