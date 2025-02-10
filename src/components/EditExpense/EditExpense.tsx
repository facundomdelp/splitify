import React, { useState } from 'react'

import ExpensesForm from '@/components/ExpenseForm'

import { Edit3 } from 'lucide-react'

const EditExpense = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Edit3
        className='mx-1 size-[16px] shrink-0 cursor-pointer items-center text-gray-500 hover:text-green-600'
        onClick={() => setOpen(true)}
      />

      {open && <ExpensesForm />}
    </>
  )
}

export default EditExpense
