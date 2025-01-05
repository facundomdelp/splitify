import ExpensesForm from '@/components/ExpensesForm'
import { Expense } from '@/types/expense.types'
import React, { useState } from 'react'

const GroupExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])

  return (
    <section>
      <div className='flex flex-col gap-3'>
        <ExpensesForm expenses={expenses} setExpenses={setExpenses} details />
      </div>
      <div>Facu</div>
      <div>Facu</div>
      <div>Facu</div>
      <div>Facu</div>
      <div>Facu</div>
      <div>Facu</div>
      <div>Facu</div>
      <div>Facu</div>
      <div>Facu</div>
      <div>Facu</div>
    </section>
  )
}

export default GroupExpenses
