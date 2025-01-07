import { NextRequest, NextResponse } from 'next/server'
import { validateGroupId } from '@/validators/groups.validators'
import { handleErrors } from '@/lib/errors/handleErrors'
import ExpenseService from '@/services/expenses.services'

const expenseService = new ExpenseService()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const [data, errors] = validateGroupId({ id: params.id })

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
