import { useState } from 'react'

import ExpenseForm from '@/components/ExpenseForm'

import { Edit3 } from 'lucide-react'

import DrawerModal from '../DrawerModal'

const EditExpense = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = () => null

  return (
    <>
      <Edit3
        className='mx-1 size-[16px] shrink-0 cursor-pointer items-center text-gray-500 hover:text-green-600'
        onClick={() => setOpen(true)}
      />

      {open && (
        <DrawerModal open={open} setOpen={setOpen} title='Manage Expense' className='px-4'>
          <ExpenseForm
            submitButtonCopy='Edit'
            autoFocus
            fullForm
            onSubmit={handleSubmit}
            closeModal={() => setOpen(false)}
            secondaryButton={{ copy: 'Remove', variant: 'destructive', onClick: () => null }}
          />
        </DrawerModal>
      )}
    </>
  )
}

export default EditExpense
