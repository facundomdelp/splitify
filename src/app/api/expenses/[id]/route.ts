import { NextRequest, NextResponse } from 'next/server'

import ExpenseService from '@/services/expenses.services'

import { validateExpenseId } from '@/validators/expenses.validators'

import { handleErrors } from '@/utils/errors/handleErrors'

const expenseService = new ExpenseService()

/* This is not inside the groups routes because the expenses are hard deleted */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [data, errors] = validateExpenseId({ id })

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await expenseService.removeExpense(data.id)

    return NextResponse.json({ message: 'Expsense removed successfully!', expense: result }, { status: 200 })
  } catch (error) {
    return handleErrors(error)
  }
}
