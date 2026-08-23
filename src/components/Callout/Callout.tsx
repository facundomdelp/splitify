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
          ? 'animate-slide-up border-green-500 bg-green-50 shadow-md hover:bg-green-100'
          : 'border-green-500 bg-green-50 hover:bg-green-100',
      )}
    >
      {highlighted && (
        <span
          aria-hidden
          className='animate-shine pointer-events-none absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-green-200/60 to-transparent'
        />
      )}

      <span className='relative flex items-center gap-3'>
        {Icon && <Icon className={cn('size-5 shrink-0 text-green-600', highlighted ? 'animate-beat' : '')} />}

        <span className='flex min-w-0 flex-col gap-1'>
          <strong className='text-sm leading-4 font-semibold text-green-800'>{title}</strong>
          {description && <span className='text-xs leading-4 text-green-700/80'>{description}</span>}
        </span>

        <ChevronRight className='ml-auto size-5 shrink-0 text-green-600 transition-transform group-hover:translate-x-1' />
      </span>
    </button>
  )
}

export default Callout
