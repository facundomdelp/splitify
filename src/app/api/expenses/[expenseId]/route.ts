import { NextRequest, NextResponse } from 'next/server'

import ExpenseService from '@/services/expenses-services'

import { validateExpenseId, validateUpdateExpense } from '@/validators/expenses-validators'

import { UpdateExpenseRequestBody } from '@/types/expense-types'

import { handleErrors } from '@/utils/errors/handleErrors'

/* This endpoints don't live inside /api/groups/[id]/expenses/[id] to avoid doing more requests to Firebase (because of the free tier) */
/* It is suggested to validate that the expense trying to be deleted or update, is from the correspondent group */

const expenseService = new ExpenseService()

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ expenseId: string }> }) {
  const { expenseId } = await params
  const [data, errors] = validateExpenseId({ expenseId })

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await expenseService.removeExpense(data.expenseId)

    return NextResponse.json({ message: 'Expsense removed successfully!', expense: result }, { status: 200 })
  } catch (error) {
    return handleErrors(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ expenseId: string }> }) {
  const { expenseId } = await params
  const [expenseIdData, expenseIdErrors] = validateExpenseId({ expenseId })

  if (!expenseIdData || expenseIdErrors) {
    return NextResponse.json({ errors: expenseIdErrors }, { status: 400 })
  }

  const body: UpdateExpenseRequestBody = await request.json()

  const [data, errors] = validateUpdateExpense(body)

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await expenseService.updateExpense({ expenseId, ...data })

    return NextResponse.json({ group: result }, { status: 200 })
  } catch (error) {
    return handleErrors(error)
  }
}
