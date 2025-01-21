import { NextRequest, NextResponse } from 'next/server'
import { validateGroupId } from '@/validators/groups.validators'
import { handleErrors } from '@/lib/errors/handleErrors'
import ExpenseService from '@/services/expenses.services'
import { AddExpenseRequestBody } from '@/types/expense.types'
import { validateAddExpense } from '@/validators/expenses.validators'

const expenseService = new ExpenseService()

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [data, errors] = validateGroupId({ id })

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await expenseService.getGroupExpenses(data.id)

    return NextResponse.json({ group: result }, { status: 201 })
  } catch (error) {
    return handleErrors(error)
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [groupIdData, groupIdErrors] = validateGroupId({ id })

  if (!groupIdData || groupIdErrors) {
    return NextResponse.json({ groupIdErrors }, { status: 400 })
  }

  const body: AddExpenseRequestBody = await request.json()

  const [data, errors] = validateAddExpense(body)

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await expenseService.addExpense({ groupId: groupIdData.id, ...data })

    return NextResponse.json({ message: 'Expsense added successfully!', expense: result }, { status: 201 })
  } catch (error) {
    return handleErrors(error)
  }
}
