import { useMemo, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Expense, ExpenseDraft } from '@/types/expense-types'

import { cn } from '@/lib/utils'

import ExpenseForm from '@/components/ExpenseForm'
import Expenses from '@/components/Expenses'
import GroupParticipants from '@/components/GroupParticipants'

import { getParticipants } from '@/utils/functions/getParticipants'

import DrawerModal from '../DrawerModal'
import { Button } from '../ui/button'

interface Props {
  expenses: Expense[]
  addExpense: (expense: ExpenseDraft) => void
  removeExpense: (id: string) => void
  editExpense?: (expense: Expense) => void
  removeParticipant?: (name: string) => void
  loadingExpenses?: boolean
  disabled?: boolean
  modalForm?: boolean
}

const ExpensesSection = ({
  expenses,
  addExpense,
  removeExpense,
  editExpense,
  removeParticipant,
  loadingExpenses,
  disabled,
  modalForm,
}: Props) => {
  const [open, setOpen] = useState(false)

  const participants = useMemo(() => getParticipants(expenses), [expenses])
  const participantNames = useMemo(() => participants.map(({ name }) => name), [participants])

  const t = useTranslations('ExpenseSection')

  const handleSubmit = ({ name, title, ...expense }: ExpenseDraft) => {
    addExpense({ ...expense, name: name.trim(), title: title?.trim() })
  }

  return (
    <section className={cn('flex min-w-0 flex-1 cursor-default flex-col gap-8', disabled ? 'pointer-events-none' : '')}>
      {modalForm ? (
        <div className='flex flex-col gap-3'>
          <Button
            variant='outline'
            className='border border-green-500 text-green-500 hover:bg-inherit hover:text-green-500 hover:opacity-70'
            onClick={() => setOpen(true)}
          >
            {t('Add Expense')}
          </Button>

          {removeParticipant && <GroupParticipants participants={participants} onRemove={removeParticipant} />}

          <DrawerModal open={open} setOpen={setOpen} title={t('Add Expense')} className='px-4'>
            <ExpenseForm
              autoFocus
              fullForm
              participants={participantNames}
              onSubmit={handleSubmit}
              disabled={disabled}
              closeModal={() => setOpen(false)}
              submitButtonCopy={t('Add')}
            />
          </DrawerModal>
        </div>
      ) : (
        <ExpenseForm
          onSubmit={handleSubmit}
          closeModal={() => setOpen(false)}
          disabled={disabled}
          submitButtonCopy={t('Add')}
        />
      )}

      <Expenses
        expenses={expenses}
        participants={participantNames}
        onRemoveExpense={removeExpense}
        onEditExpense={editExpense}
        loading={loadingExpenses}
      />
    </section>
  )
}

export default ExpensesSection
