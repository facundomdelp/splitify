'use client'

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { ChevronRight, LucideIcon } from 'lucide-react'

interface Props {
  icon?: LucideIcon
  title: string
  description?: ReactNode
  onClick: () => void
  disabled?: boolean
  highlighted?: boolean
}

const Callout = ({ icon: Icon, title, description, onClick, disabled, highlighted }: Props) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors disabled:pointer-events-none disabled:opacity-50',
        highlighted
          ? 'animate-slide-up border-brand-border bg-brand-surface hover:bg-brand-surface-strong shadow-md'
          : 'border-brand-border bg-brand-surface hover:bg-brand-surface-strong',
      )}
    >
      {highlighted && (
        <span
          aria-hidden
          className='animate-shine via-brand-border/25 pointer-events-none absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent to-transparent'
        />
      )}

      <span className='relative flex items-center gap-3'>
        {Icon && <Icon className={cn('text-brand size-5 shrink-0', highlighted ? 'animate-beat' : '')} />}

        <span className='flex min-w-0 flex-col gap-1'>
          <strong className='text-brand-text text-sm leading-4 font-semibold'>{title}</strong>
          {description && <span className='text-brand-muted text-xs leading-4'>{description}</span>}
        </span>

        <ChevronRight className='text-brand ml-auto size-5 shrink-0 transition-transform group-hover:translate-x-1' />
      </span>
    </button>
  )
}

export default Callout
