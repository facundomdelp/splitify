'use client'

import { useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import { ExpenseDraft } from '@/types/expense-types'

import { cn } from '@/lib/utils'

import ExpenseRemoveConfirmModal from '@/components/ExpenseRemoveConfirmModal'
import ExpenseSharing from '@/components/ExpenseSharing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Plus, UserRound } from 'lucide-react'

import { useExpensesForm } from './hooks'

interface Props {
  initialValues?: ExpenseDraft
  participants?: string[]
  onSubmit?: (expense: ExpenseDraft) => void
  disabled?: boolean
  closeModal?: () => void
  autoFocus?: boolean
  fullForm?: boolean
  submitButtonCopy: string
  secondaryButton?: {
    copy: string
    variant: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
    onClick: () => void
  }
}

const ExpenseForm = ({
  initialValues,
  participants = [],
  onSubmit,
  disabled,
  closeModal,
  autoFocus,
  fullForm,
  submitButtonCopy,
  secondaryButton,
}: Props) => {
  const [openRemoveConfirmationModal, setOpenRemoveConfirmationModal] = useState(false)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const {
    name,
    handleName,
    amount,
    handleAmount,
    title,
    handleTitle,
    date,
    handleDate,
    sharedWith,
    sharingSuggestions,
    handleAddSharer,
    handleRemoveSharer,
    handleSubmit,
  } = useExpensesForm({
    initialValues: initialValues ?? { name: '', amount: 0, title: '', date: fullForm ? Date.now() : undefined },
    participants,
    nameInputRef,
    onSubmit,
    closeModal,
  })

  const t = useTranslations('ExpenseForm')

  return (
    <>
      <section className='flex flex-col gap-2'>
        <p className='flex flex-nowrap items-center gap-1 text-[12px] text-gray-600'>
          <UserRound className='size-[12px] text-green-700' />
          {t('Add Expense')}
        </p>

        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
          <div className='flex flex-wrap gap-3'>
            <Input
              className='min-w-36 flex-[2.5] placeholder:text-gray-300'
              name='name'
              aria-label={t('Who paid')}
              ref={nameInputRef}
              maxLength={50}
              onChange={handleName}
              value={name}
              placeholder={t('John Spliti')}
              disabled={disabled}
              autoFocus={autoFocus}
            />

            <div className='flex-grow-1 ml-auto flex flex-1 gap-4'>
              <div className={cn('relative ml-auto min-w-[5.5rem] flex-1', !fullForm ? 'max-w-24' : '')}>
                <span className='absolute left-2 top-1/2 -translate-y-1/2 text-sm leading-4 text-gray-500'>$</span>
                <Input
                  className='pl-6 text-sm'
                  type='number'
                  name='amount'
                  aria-label={t('Amount')}
                  max={1000000000}
                  min={0}
                  step={0.01}
                  onChange={handleAmount}
                  value={amount}
                  disabled={disabled}
                />
              </div>

              {!fullForm && (
                <Button
                  size='icon'
                  className='w-10'
                  type='submit'
                  aria-label={t('Add Expense')}
                  disabled={name.trim() === '' || disabled}
                >
                  <Plus />
                </Button>
              )}
            </div>
          </div>

          {fullForm && (
            <ExpenseSharing
              sharedWith={sharedWith}
              suggestions={sharingSuggestions}
              onAdd={handleAddSharer}
              onRemove={handleRemoveSharer}
              disabled={disabled}
            />
          )}

          {fullForm && (
            <div className='flex min-h-0 max-w-full flex-wrap gap-2 border-y border-transparent px-1'>
              <div className='min-h-0 min-w-40 flex-1 space-y-1'>
                <Label htmlFor='date' className='text-xs'>
                  <strong>{t('Date')}</strong>
                </Label>
                <Input
                  id='date'
                  type='date'
                  name='date'
                  className={cn(!date ? 'text-gray-300' : 'text-black')}
                  onChange={handleDate}
                  value={date}
                  disabled={disabled}
                />
              </div>

              <div className='min-h-0 min-w-40 flex-1 space-y-1'>
                <Label htmlFor='title' className='text-xs'>
                  <strong>{t('Title')}</strong> ({t('optional')})
                </Label>
                <Input
                  id='title'
                  name='title'
                  className='placeholder:text-gray-300'
                  maxLength={50}
                  onChange={handleTitle}
                  value={title}
                  placeholder={t('For example: Taxi')}
                  disabled={disabled}
                />
              </div>
            </div>
          )}

          {fullForm && (
            <div className='mt-1 flex gap-3'>
              {secondaryButton && (
                <Button
                  type='button'
                  className='flex-1'
                  onClick={() => setOpenRemoveConfirmationModal(true)}
                  variant={secondaryButton?.variant}
                >
                  {secondaryButton.copy}
                </Button>
              )}

              <Button className='flex-1' type='submit' disabled={name.trim() === ''}>
                {submitButtonCopy}
              </Button>
            </div>
          )}
        </form>

        {openRemoveConfirmationModal && secondaryButton?.onClick && (
          <ExpenseRemoveConfirmModal
            open={openRemoveConfirmationModal}
            setOpen={setOpenRemoveConfirmationModal}
            name={name}
            onConfirm={secondaryButton.onClick}
          />
        )}
      </section>
    </>
  )
}

export default ExpenseForm
