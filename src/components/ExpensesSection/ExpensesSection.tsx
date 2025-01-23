import React, { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Expense } from '@/types/expense.types'

import { cn } from '@/lib/utils'

import { Expenses } from '@/components/Expenses/Expenses'
import ExpensesForm from '@/components/ExpensesForm'

import DrawerModal from '../DrawerModal/DrawerModal'

interface Props {
  expenses: Expense[]
  addExpense: (expense: Pick<Expense, 'name' | 'amount' | 'title' | 'date'>) => void
  removeExpense: (id: string) => void
  loadingExpenses?: boolean
  disabled?: boolean
  modalForm?: boolean
}

const ExpensesSection = ({ expenses, addExpense, removeExpense, loadingExpenses, disabled, modalForm }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  const handleSubmit = ({
    name,
    amount,
    title,
    date,
  }: {
    name: string
    amount: number
    title?: string
    date?: number
  }) => {
    setOpenModal(false)

    name = name.trim()
    title = title?.trim()
    date = date ? new Date(date).getTime() : undefined

    addExpense({ name, amount, title, date })
  }

  const t = useTranslations('ExpensesSection')

  return (
    <>
      {/* <Modal open={openModal} setOpen={setOpenModal} title={t('Add Expense')} className='px-6 w-[90vw] max-w-[500px]'>
        <ExpensesForm includeDetails bigAddButton onSubmit={handleSubmit} disabled={disabled} />
      </Modal> */}
      {modalForm ? (
        <>
          <DrawerModal open={openModal} setOpen={setOpenModal} title={t('Add Expense')} className='px-5'>
            <ExpensesForm includeDetails bigAddButton onSubmit={handleSubmit} disabled={disabled} />
          </DrawerModal>

          <section
            className={cn(
              'mx-4 flex min-w-0 flex-1 cursor-default flex-col gap-8',
              disabled ? 'pointer-events-none' : '',
            )}
          >
            <ExpensesForm onFocus={() => setOpenModal(true)} disabled={disabled} />
            <Expenses expenses={expenses} onRemoveExpense={removeExpense} loading={loadingExpenses} />
          </section>
        </>
      ) : (
        <section
          className={cn(
            'mx-4 flex min-w-0 flex-1 cursor-default flex-col gap-8',
            disabled ? 'pointer-events-none' : '',
          )}
        >
          <ExpensesForm onSubmit={handleSubmit} disabled={disabled} />
          <Expenses expenses={expenses} onRemoveExpense={removeExpense} loading={loadingExpenses} />
        </section>
      )}
    </>
  )
}

export default ExpensesSection
