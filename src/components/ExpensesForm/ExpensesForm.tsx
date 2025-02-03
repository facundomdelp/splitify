'use client'

import { useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Plus, UserRound } from 'lucide-react'

import DrawerModal from '../DrawerModal'
import { useExpensesForm } from './hooks'

interface Props {
  onSubmit?: ({ name, amount }: { name: string; amount: number }) => void
  disabled?: boolean
  modalForm?: boolean
}

const ExpensesForm = ({ onSubmit, disabled, modalForm }: Props) => {
  const [open, setOpen] = useState(false)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const t = useTranslations('ExpensesForm')

  return modalForm ? (
    <>
      <Button
        variant='outline'
        className='border border-green-500 text-green-500 hover:bg-inherit hover:text-green-500 hover:opacity-70'
        onClick={() => setOpen(true)}
      >
        {t('Add Expense')}
      </Button>

      <DrawerModal open={open} setOpen={setOpen} title={t('Add Expense')} className='px-4'>
        <Form onSubmit={onSubmit} setOpenModal={setOpen} nameInputRef={nameInputRef} disabled={disabled} modalForm />
      </DrawerModal>
    </>
  ) : (
    <Form onSubmit={onSubmit} setOpenModal={setOpen} nameInputRef={nameInputRef} disabled={disabled} />
  )
}

interface FormProps {
  formRef?: React.RefObject<HTMLFormElement>
  onSubmit?: ({ name, amount, title, date }: { name: string; amount: number; title?: string; date?: string }) => void
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
  nameInputRef: React.RefObject<HTMLInputElement>
  disabled?: boolean
  modalForm?: boolean
}

const Form = ({ formRef, onSubmit, setOpenModal, nameInputRef, disabled, modalForm }: FormProps) => {
  const { name, handleName, amount, handleAmount, title, handleTitle, date, handleDate, handleSubmit } =
    useExpensesForm({ nameInputRef, onSubmit, setOpenModal })

  const t = useTranslations('ExpensesForm')

  return (
    <section className='flex flex-col gap-2'>
      <p className='flex flex-nowrap items-center gap-1 text-[12px] text-gray-600'>
        <UserRound className='size-[12px] text-green-700' />
        {t('Add Expense')}
      </p>

      <form ref={formRef} className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='flex flex-wrap gap-3'>
          <Input
            className='min-w-36 flex-[2.5] placeholder:text-gray-300'
            name='name'
            ref={nameInputRef}
            maxLength={50}
            onChange={handleName}
            value={name}
            placeholder={t('John Spliti')}
            disabled={disabled}
            autoFocus={modalForm}
          />

          <div className='flex-grow-1 ml-auto flex flex-1 gap-4'>
            <div className={cn('relative ml-auto min-w-[5.5rem] flex-1', !modalForm ? 'max-w-24' : '')}>
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
                disabled={disabled}
              />
            </div>

            {!modalForm && (
              <Button size='icon' className='w-10' type='submit' disabled={name.trim() === '' || disabled}>
                <Plus />
              </Button>
            )}
          </div>
        </div>

        {modalForm && (
          <div className='flex min-h-0 max-w-full flex-wrap gap-2 border-y border-transparent px-1'>
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
                disabled={disabled}
              />
            </div>

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
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {modalForm && (
          <Button className='mb-3' type='submit' disabled={name.trim() === ''}>
            {t('ADD EXPENSE')}
          </Button>
        )}
      </form>
    </section>
  )
}

export default ExpensesForm
