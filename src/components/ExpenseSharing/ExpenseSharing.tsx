import { useId } from 'react'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import ParticipantPill from '@/components/ParticipantPill'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { ChevronRight, Plus } from 'lucide-react'

import { useExpenseSharing } from './hooks'

interface Props {
  sharedWith: string[]
  suggestions: string[]
  onAdd: (name: string) => void
  onRemove: (name: string) => void
  disabled?: boolean
}

const ExpenseSharing = ({ sharedWith, suggestions, onAdd, onRemove, disabled }: Props) => {
  const { open, toggleOpen, newName, handleNewName, handleAdd, handleKeyDown, canAdd } = useExpenseSharing({
    sharedWith,
    onAdd,
  })

  const suggestionsId = useId()
  const t = useTranslations('ExpenseSharing')

  return (
    <section className='flex flex-col'>
      <button
        type='button'
        className='text-foreground flex w-fit items-center gap-1 text-[12px]'
        onClick={toggleOpen}
        aria-expanded={open}
      >
        <ChevronRight className={cn('text-brand-muted size-[12px] transition-transform', open ? 'rotate-90' : '')} />
        {t('Shared with')}
        <span className='text-muted-foreground'>
          {suggestions.length ? `${sharedWith.length}/${sharedWith.length + suggestions.length}` : t('Everyone')}
        </span>
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div
          className={cn(
            'overflow-hidden transition-[opacity,visibility] duration-300',
            open ? 'opacity-100' : 'invisible opacity-0',
          )}
        >
          <div className='border-border bg-muted mt-2 flex flex-col gap-3 rounded-md border p-2'>
            <div className='flex gap-2'>
              <Input
                className='placeholder:text-muted-foreground/60 h-8'
                name='participant'
                list={suggestionsId}
                maxLength={50}
                onChange={handleNewName}
                onKeyDown={handleKeyDown}
                value={newName}
                placeholder={t('Add someone else')}
                disabled={disabled}
              />

              <datalist id={suggestionsId}>
                {suggestions.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>

              <Button
                type='button'
                size='icon'
                variant='outline'
                className='size-8 shrink-0'
                onClick={handleAdd}
                disabled={!canAdd || disabled}
                aria-label={t('Add someone else')}
              >
                <Plus />
              </Button>
            </div>

            {sharedWith.length ? (
              <ul className='flex flex-wrap gap-2'>
                {sharedWith.map((name) => (
                  <ParticipantPill
                    key={name}
                    name={name}
                    onRemove={() => onRemove(name)}
                    disabled={disabled || sharedWith.length === 1}
                  />
                ))}
              </ul>
            ) : (
              <p className='text-muted-foreground px-1 pb-1 text-xs'>{t('Add the people sharing this expense')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpenseSharing
