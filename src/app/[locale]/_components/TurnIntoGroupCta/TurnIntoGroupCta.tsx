'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { CalendarDays, ChevronRight, Link2, UsersRound } from 'lucide-react'

const HIGHLIGHT_DURATION = 6000

const FEATURES = [
  { key: 'Share a link', icon: Link2 },
  { key: 'Split with only some', icon: UsersRound },
  { key: 'Dates and titles', icon: CalendarDays },
] as const

interface Props {
  standOut: boolean
  onClick: () => void
  disabled?: boolean
}

const TurnIntoGroupCta = ({ standOut, onClick, disabled }: Props) => {
  const [highlighted, setHighlighted] = useState(standOut)

  const t = useTranslations('TurnIntoGroupCta')
  const tGroup = useTranslations('HomeContextMenu')

  useEffect(() => {
    if (!highlighted) return

    const timeout = setTimeout(() => setHighlighted(false), HIGHLIGHT_DURATION)

    return () => clearTimeout(timeout)
  }, [highlighted])

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group relative flex w-full flex-col gap-2 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors disabled:pointer-events-none disabled:opacity-50',
        highlighted
          ? 'animate-slide-up border-green-500 bg-green-50 shadow-md hover:bg-green-100'
          : 'border-green-200 bg-white hover:border-green-500 hover:bg-green-50',
      )}
    >
      {highlighted && (
        <span
          aria-hidden
          className='pointer-events-none absolute inset-y-0 w-1/2 animate-shine bg-gradient-to-r from-transparent via-green-200/60 to-transparent'
        />
      )}

      <span className='relative flex items-center gap-2'>
        <span className={cn('text-xl leading-none', highlighted ? 'animate-beat' : '')}>✈️</span>
        <strong className='text-sm font-semibold text-green-800'>{tGroup('Turn into a Group ✈️')}</strong>
        <ChevronRight className='ml-auto size-5 shrink-0 text-green-600 transition-transform group-hover:translate-x-1' />
      </span>

      <span className='relative flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-green-700/90'>
        {FEATURES.map(({ key, icon: Icon }) => (
          <span key={key} className='flex items-center gap-1 rounded-full bg-green-100 px-2 py-[3px]'>
            <Icon className='size-3 shrink-0' />
            {t(key)}
          </span>
        ))}
        <span className='text-green-700/70'>{t('and more')}</span>
      </span>
    </button>
  )
}

export default TurnIntoGroupCta
