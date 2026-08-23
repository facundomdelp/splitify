'use client'

import { useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import Callout from '@/components/Callout'

import { CalendarDays, Link2, UsersRound } from 'lucide-react'

const HIGHLIGHT_DURATION = 6000

const FEATURES = [
  { key: 'Share a link', icon: Link2 },
  { key: 'Split with only some', icon: UsersRound },
  { key: 'Dates and titles', icon: CalendarDays },
] as const

interface Props {
  visible: boolean
  onClick: () => void
  disabled?: boolean
}

const TurnIntoGroupCta = ({ visible, onClick, disabled }: Props) => {
  const [highlighted, setHighlighted] = useState(false)
  const standOutPlayed = useRef(false)

  const t = useTranslations('TurnIntoGroupCta')
  const tGroup = useTranslations('HomeContextMenu')

  useEffect(() => {
    if (!visible || standOutPlayed.current) return

    standOutPlayed.current = true

    const start = requestAnimationFrame(() => setHighlighted(true))
    const end = setTimeout(() => setHighlighted(false), HIGHLIGHT_DURATION)

    return () => {
      cancelAnimationFrame(start)
      clearTimeout(end)
    }
  }, [visible])

  if (!visible) return null

  return (
    <Callout
      title={tGroup('Turn into a Group ✈️')}
      description={
        <span className='flex flex-wrap items-center gap-x-2 gap-y-1'>
          {FEATURES.map(({ key, icon: Icon }) => (
            <span
              key={key}
              className='bg-brand-surface-strong flex items-center gap-1 rounded-full px-2 py-[3px] text-[11px]'
            >
              <Icon className='size-3 shrink-0' />
              {t(key)}
            </span>
          ))}
          <span className='text-brand-muted'>{t('and more')}</span>
        </span>
      }
      onClick={onClick}
      disabled={disabled}
      highlighted={highlighted}
    />
  )
}

export default TurnIntoGroupCta
