import { useState } from 'react'

import DrawerModal from '@/components/DrawerModal'
import ExpenseForm from '@/components/ExpenseForm'

import { Edit3 } from 'lucide-react'

interface Props {
  id: string
  onRemoveExpense: (id: string) => void
  onEditExpense: ({
    id,
    name,
    amount,
    title,
    date,
  }: {
    id: string
    name: string
    amount: number
    title?: string
    date?: number
  }) => void
}

const ManageExpense = ({ id, onRemoveExpense, onEditExpense }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Edit3
        className='mx-1 size-[15px] shrink-0 cursor-pointer items-center text-gray-500 hover:text-green-600'
        onClick={() => setOpen(true)}
      />

      {open && (
        <DrawerModal open={open} setOpen={setOpen} title='Manage Expense' className='px-4'>
          <ExpenseForm
            submitButtonCopy='Edit'
            autoFocus
            fullForm
            onSubmit={(expense) => onEditExpense({ id, ...expense })}
            closeModal={() => setOpen(false)}
            secondaryButton={{ copy: 'Remove', variant: 'destructive', onClick: () => onRemoveExpense(id) }}
          />
        </DrawerModal>
      )}
    </>
  )
}

export default ManageExpense
