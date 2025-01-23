'use client'

import { FocusEventHandler, useRef } from 'react'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Plus, UserRound } from 'lucide-react'

import { useExpensesForm } from './hooks'

interface Props {
  onFocus?: FocusEventHandler<HTMLInputElement>
  includeDetails?: boolean
  bigAddButton?: boolean
  onSubmit?: ({ name, amount }: { name: string; amount: number }) => void
  disabled?: boolean
}

const ExpensesForm = ({ onFocus, includeDetails = false, bigAddButton = false, onSubmit, disabled }: Props) => {
  const nameInputRef = useRef<HTMLInputElement>(null)

  const {
    name,
    handleName,
    amount,
    handleAmount,
    // handleShowDetails,
    // showDetails,
    title,
    handleTitle,
    date,
    handleDate,
    handleSubmit,
  } = useExpensesForm({
    nameInputRef,
    onSubmit,
  })

  const t = useTranslations('ExpensesForm')

  return (
    <section className='flex flex-col gap-2'>
      <p className='flex flex-nowrap items-center gap-1 text-[12px] text-gray-600'>
        <UserRound className='size-[12px] text-green-700' />
        {t('Add expense')}
      </p>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='flex flex-wrap gap-3'>
          <Input
            className='min-w-36 flex-[2.5] placeholder:text-gray-300'
            name='name'
            ref={nameInputRef}
            maxLength={50}
            onChange={handleName}
            value={name}
            placeholder={t('John Spliti')}
            onFocus={onFocus}
            disabled={disabled}
            autoFocus={includeDetails} // This is for not auto-focussing when the form is open through a modal
            // I should have a modalForm prop in here, and render the modal from this component
          />

          <div className='flex-grow-1 ml-auto flex flex-1 gap-4'>
            <div className={cn('relative ml-auto min-w-[5.5rem] flex-1', !bigAddButton ? 'max-w-24' : '')}>
              <span className='absolute left-2 top-1/2 -translate-y-1/2 text-sm leading-4 text-gray-500'>$</span>
              <Input
                className='pl-6 text-sm'
                type='number'
                name='amount'
                max={1000000000}
                min={0}
                step={0.01}
                onChange={handleAmount}
                value={amount}
                onFocus={onFocus}
                disabled={disabled}
              />
            </div>

            {!bigAddButton && (
              <Button size='icon' className='w-10' type='submit' disabled={name.trim() === '' || disabled}>
                <Plus />
              </Button>
            )}
          </div>
        </div>

        {includeDetails && (
          <div className='min-h-auto flex flex-col'>
            <div
              className={cn(
                'grid min-h-0 overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out',
                // !showDetails ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
              )}
            >
              <div className='flex min-h-0 max-w-full flex-wrap gap-2 border-y border-transparent px-1'>
                <div className='min-h-0 min-w-40 flex-1 space-y-1'>
                  <Label htmlFor='title' className='text-xs'>
                    <strong>{t('Title')}</strong> ({t('optional')})
                  </Label>
                  <Input
                    id='Title'
                    name='title'
                    className='placeholder:text-gray-300'
                    maxLength={50}
                    onChange={handleTitle}
                    value={title}
                    placeholder={t('For example: Taxi')}
                    // tabIndex={!showDetails ? -1 : undefined}
                    disabled={disabled}
                  />
                </div>

                <div className='min-h-0 min-w-40 flex-1 space-y-1'>
                  <Label htmlFor='date' className='text-xs'>
                    <strong>{t('Date')}</strong> ({t('optional')})
                  </Label>
                  <Input
                    id='date'
                    type='date'
                    name='date'
                    className={cn(!date ? 'text-gray-300' : 'text-black')}
                    onChange={handleDate}
                    value={date}
                    // tabIndex={!showDetails ? -1 : undefined}
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>

            {/* <Button
              className={cn('text-gray-600', !showDetails ? '' : 'mt-3')}
              variant='outline'
              type='button'
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleShowDetails()}
              disabled={disabled}
            >
              {!showDetails ? <PlusIcon /> : <MinusIcon />}
              {t('Details')}
            </Button> */}
          </div>
        )}

        {bigAddButton && (
          <Button className='flex' type='submit' disabled={name.trim() === ''}>
            {t('ADD EXPENSE')}
          </Button>
        )}
      </form>
    </section>
  )
}

export default ExpensesForm
