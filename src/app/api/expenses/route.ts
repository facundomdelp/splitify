import { NextRequest, NextResponse } from 'next/server'
import { handleErrors } from '@/lib/errors/handleErrors'
import ExpenseService from '@/services/expenses.services'
import { AddExpenseRequestBody } from '@/types/expense.types'
import { validateAddExpense } from '@/validators/expenses.validators'

const expenseService = new ExpenseService()

export async function POST(request: NextRequest) {
  const body: AddExpenseRequestBody = await request.json()

  const [data, errors] = validateAddExpense(body)

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await expenseService.addExpense(data)

    return NextResponse.json({ message: 'Expsense added successfully!', expense: result }, { status: 201 })
  } catch (error) {
    return handleErrors(error)
  }
}
