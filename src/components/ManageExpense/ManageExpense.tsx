import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Expense } from '@/types/expense-types'

import DrawerModal from '@/components/DrawerModal'
import ExpenseForm from '@/components/ExpenseForm'

import { Edit3 } from 'lucide-react'

interface Props {
  expense: Expense
  participants: string[]
  onRemoveExpense: (id: string) => void
  onEditExpense: (expense: Expense) => void
}

const ManageExpense = ({ expense, participants, onRemoveExpense, onEditExpense }: Props) => {
  const [open, setOpen] = useState(false)

  const t = useTranslations('ManageExpense')

  const { id, ...initialValues } = expense

  return (
    <>
      <Edit3
        className='text-muted-foreground hover:text-brand mx-1 size-[15px] shrink-0 cursor-pointer items-center'
        onClick={() => setOpen(true)}
      />

      {open && (
        <DrawerModal open={open} setOpen={setOpen} title={t('Manage Expense')} className='px-4'>
          <ExpenseForm
            initialValues={initialValues}
            participants={participants}
            submitButtonCopy={t('Edit')}
            fullForm
            onSubmit={(values) => onEditExpense({ id, ...values })}
            closeModal={() => setOpen(false)}
            secondaryButton={{ copy: t('Remove'), variant: 'destructive', onClick: () => onRemoveExpense(id) }}
          />
        </DrawerModal>
      )}
    </>
  )
}

export default ManageExpense
