import { Expenses } from '@/app/[locale]/_components/Expenses/Expenses'
import ExpensesForm from '@/components/ExpensesForm'
import Modal from '@/components/Modal'
import { Balance } from '@/types/balance.types'
import { Expense } from '@/types/expense.types'
import React, { useState } from 'react'

const GroupExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [balances, setBalances] = useState<Balance[]>([])
  console.log('👽 ~ file: GroupExpenses.tsx:11 ~ GroupExpenses ~ setBalances:', setBalances)

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Modal open={openModal} setOpen={setOpenModal} title={'Add Expense'} className='px-0'>
        <div className='space-y-2'>
          <ExpensesForm expenses={expenses} setExpenses={setExpenses} details bigAddButton />
        </div>
      </Modal>

      <main className='flex flex-col gap-8 flex-1 min-w-0 cursor-default'>
        <ExpensesForm expenses={expenses} setExpenses={setExpenses} onFocus={() => setOpenModal(true)} />
        <Expenses expenses={expenses} setExpenses={setExpenses} readOnly={balances.length > 0} />
      </main>
    </>
  )
}

export default GroupExpenses
