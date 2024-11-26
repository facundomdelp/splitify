'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Expense } from '@/types'
import { Plus, Undo } from 'lucide-react'
import { useExpensesForm } from './hooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  disabled: boolean
  onReturn?: () => void
}

const ExpensesForm = ({ expenses, setExpenses, disabled, onReturn }: Props) => {
  const nameInputRef = useRef<HTMLInputElement>(null)

  const [popoverWidth, setPopoverWidth] = useState<number | undefined>()

  const { name, handleName, handleSelectName, amount, handleAmount, handleSubmit, showPopover, setShowPopover } =
    useExpensesForm({
      expenses,
      setExpenses,
      nameInputRef,
    })

  const names = useMemo(
    () =>
      Array.from(new Set(expenses.map(({ name: expenseName }) => expenseName))).filter((expenseName) =>
        expenseName.includes(name),
      ),
    [expenses, name],
  )

  useEffect(() => {
    if (nameInputRef.current) {
      setPopoverWidth(nameInputRef.current.offsetWidth)
    }
  }, [nameInputRef.current?.offsetWidth])

  return (
    <section className='flex flex-col gap-2'>
      <p className='text-sm'>Añadir participante</p>
      <form className='flex gap-4 flex-wrap' onSubmit={handleSubmit}>
        <Popover open={names.length > 0 && showPopover}>
          <PopoverTrigger className='flex-1'>
            <Input
              className='min-w-40 flex-1'
              name='name'
              ref={nameInputRef}
              maxLength={50}
              onChange={handleName}
              value={disabled ? '-' : name}
              disabled={disabled}
            />
          </PopoverTrigger>
          <PopoverContent
            className='bg-white shadow-md flex flex-col rounded mt-2 py-1'
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            style={{ width: popoverWidth }}
          >
            {names.map((expenseName) => (
              <button
                key={expenseName}
                className='text-xs text-left px-3 py-1 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
                name={expenseName}
                onClick={(e) => handleSelectName(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSelectName(e)
                  }
                  if (e.key === 'Escape') {
                    setShowPopover(false)
                    nameInputRef.current?.focus()
                  }
                }}
              >
                {expenseName}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        <div className='flex gap-4 ml-auto'>
          <div className='relative min-w-20 max-w-24 flex-1'>
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
              disabled={disabled}
            />
          </div>
          {!onReturn ? (
            <Button size='icon' className='min-w-10 ml-auto' type='submit' disabled={name === '' || disabled}>
              <Plus />
            </Button>
          ) : (
            <Button size='icon' className='min-w-10 ml-auto' type='submit' variant='outline' onClick={onReturn}>
              <Undo />
            </Button>
          )}
        </div>
      </form>
    </section>
  )
}

export default ExpensesForm
