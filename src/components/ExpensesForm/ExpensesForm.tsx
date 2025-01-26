'use client'

import { useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { MinusIcon, Plus, PlusIcon, UserRound } from 'lucide-react'

import DrawerModal from '../DrawerModal'
import { useExpensesForm } from './hooks'

interface Props {
  onSubmit?: ({ name, amount }: { name: string; amount: number }) => void
  disabled?: boolean
  modalForm?: boolean
}

const ExpensesForm = ({ onSubmit, disabled, modalForm }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const t = useTranslations('ExpensesForm')

  return (
    <>
      {modalForm && (
        <DrawerModal open={openModal} setOpen={setOpenModal} title={t('Add Expense')} className='px-5'>
          <Form
            onSubmit={onSubmit}
            setOpenModal={setOpenModal}
            nameInputRef={nameInputRef}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            disabled={disabled}
            modalForm
          />
        </DrawerModal>
      )}

      <Form
        onSubmit={onSubmit}
        setOpenModal={setOpenModal}
        nameInputRef={nameInputRef}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        disabled={disabled}
        onFocus={modalForm ? () => setOpenModal(true) : undefined}
      />
    </>
  )
}

interface FormProps {
  onSubmit?: ({ name, amount, title, date }: { name: string; amount: number; title?: string; date?: string }) => void
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
  nameInputRef: React.RefObject<HTMLInputElement>
  showDetails: boolean
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: boolean
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  modalForm?: boolean
}

const Form = ({
  onSubmit,
  setOpenModal,
  nameInputRef,
  showDetails,
  setShowDetails,
  disabled,
  onFocus,
  modalForm,
}: FormProps) => {
  const {
    name,
    handleName,
    amount,
    handleAmount,
    handleShowDetails,
    title,
    handleTitle,
    date,
    handleDate,
    handleSubmit,
  } = useExpensesForm({ nameInputRef, onSubmit, setOpenModal, showDetails, setShowDetails })

  const t = useTranslations('ExpensesForm')

  return (
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
            ref={nameInputRef}
            maxLength={50}
            onChange={handleName}
            value={name}
            placeholder={t('John Spliti')}
            onFocus={onFocus}
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
                onFocus={onFocus}
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
          <div className='min-h-auto flex flex-col'>
            <div
              className={cn('overflow-hidden transition-all duration-500', !showDetails ? 'max-h-0' : 'max-h-[250px]')}
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
                    tabIndex={!showDetails ? -1 : undefined}
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
                    tabIndex={!showDetails ? -1 : undefined}
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>

            <Button
              className={cn('text-gray-600', !showDetails ? '' : 'mt-3')}
              variant='outline'
              type='button'
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleShowDetails()}
              disabled={disabled}
            >
              {!showDetails ? <PlusIcon /> : <MinusIcon />}
              {t('Details')}
            </Button>
          </div>
        )}

        {modalForm && (
          <Button className='flex' type='submit' disabled={name.trim() === ''}>
            {t('ADD EXPENSE')}
          </Button>
        )}
      </form>
    </section>
  )
}

export default ExpensesForm
