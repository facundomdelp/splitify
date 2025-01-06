import { Expenses } from '@/components/Expenses/Expenses'
import ExpensesForm from '@/components/ExpensesForm'
import Modal from '@/components/Modal'
import { Expense } from '@/types/expense.types'
import React, { useState } from 'react'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

const GroupExpenses = ({ expenses, setExpenses }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Modal open={openModal} setOpen={setOpenModal} title={'Add Expense'} className='px-0 w-[90vw] max-w-[500px]'>
        <div className='space-y-2'>
          <ExpensesForm expenses={expenses} setExpenses={setExpenses} details bigAddButton />
        </div>
      </Modal>

      <main className='flex flex-col gap-8 flex-1 min-w-0 cursor-default'>
        <ExpensesForm expenses={expenses} setExpenses={setExpenses} onFocus={() => setOpenModal(true)} />
        <Expenses expenses={expenses} setExpenses={setExpenses} />
      </main>
    </>
  )
}

export default GroupExpenses
