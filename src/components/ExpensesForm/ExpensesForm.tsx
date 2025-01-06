'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Expense } from '@/types/expense.types'
import { MinusIcon, Plus, PlusIcon, UserRound } from 'lucide-react'
import { useExpensesForm } from './hooks'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  onFocus?: () => void
  details?: boolean
  bigAddButton?: boolean
}

const ExpensesForm = ({ expenses, setExpenses, onFocus, details = false, bigAddButton = false }: Props) => {
  const [showDetails, setShowDetails] = useState(false)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const { name, handleName, amount, handleAmount, handleSubmit } = useExpensesForm({
    expenses,
    setExpenses,
    nameInputRef,
  })

  const t = useTranslations('ExpensesForm')

  return (
    <section className='mx-4 flex flex-col gap-2'>
      <p className='text-sm flex items-center gap-1 flex-nowrap'>
        <UserRound className='size-[14px] text-green-700' />
        {t('Add expense')}
      </p>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='flex gap-3 flex-wrap'>
          <Input
            className='min-w-36 flex-[2] placeholder:text-gray-300'
            name='name'
            ref={nameInputRef}
            maxLength={50}
            onChange={handleName}
            value={name}
            placeholder={t('John Spliti')}
            onFocus={onFocus}
          />

          <div className='flex gap-4 ml-auto flex-1 flex-grow-1'>
            <div className={cn('relative min-w-[5.5rem] flex-1 ml-auto', !bigAddButton ? 'max-w-24' : '')}>
              <span className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm leading-4'>$</span>
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
              />
            </div>

            {!bigAddButton && (
              <Button size='icon' className='w-10' type='submit' disabled={name === ''}>
                <Plus />
              </Button>
            )}
          </div>
        </div>

        {details && (
          <div className='flex flex-col'>
            <div
              className={cn(
                'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out',
                !showDetails ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
              )}
            >
              <div className='flex flex-wrap gap-2 px-1 max-w-full min-h-0'>
                <div className='space-y-1 flex-1 min-w-44'>
                  <Label htmlFor='title' className='font-semibold text-xs'>
                    Title
                  </Label>
                  <Input
                    id='Title'
                    name='title'
                    className='placeholder:text-gray-300'
                    maxLength={50}
                    // onChange={handleName}
                    // value={name}
                    placeholder='For example: Taxi'
                  />
                </div>

                <div className='space-y-1 flex-1 min-w-40'>
                  <Label htmlFor='date' className='font-semibold text-xs'>
                    Date
                  </Label>
                  <Input
                    id='date'
                    type='date'
                    name='date'
                    className={cn(/* !date ? 'text-gray-300' : 'text-black' */)}
                    maxLength={50}
                    // onChange={handleName}
                    // value={name}
                  />
                </div>
              </div>
            </div>

            <Button
              className={cn('text-gray-600', !showDetails ? '' : 'mt-3')}
              variant='outline'
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {!showDetails ? <PlusIcon /> : <MinusIcon />}
              Details
            </Button>
          </div>
        )}

        {bigAddButton && (
          <Button className='flex' type='submit' disabled={name === ''}>
            ADD EXPENSE
          </Button>
        )}
      </form>
    </section>
  )
}

export default ExpensesForm
