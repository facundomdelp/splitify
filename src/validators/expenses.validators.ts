import { z } from 'zod'
import { idParam, ValidationResult } from '@/types/common.types'
import { AddExpenseRequestBody } from '@/types/expense.types'

const validateExpenseIdSchema = z.object({
  id: z
    .string()
    .length(20, 'Invalid Expense ID')
    .regex(/^[A-Za-z0-9\-_]+$/, 'Invalid Expense ID'),
})

export const validateExpenseId = ({ id }: Partial<idParam>): ValidationResult<idParam> => {
  const validationResult = validateExpenseIdSchema.safeParse({ id })
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}

const addExpenseSchema = z.object({
  name: z.string().max(50, 'Expense owner name is too long'),
  amount: z
    .number()
    .min(0, { message: 'Amount must be at least 0' })
    .max(1000000000, { message: 'Amount must not exceed 1,000,000,000' })
    .step(0.01, { message: 'Amount must be in increments of 0.01' }),
  title: z.string().max(50, 'Expense title is too long').optional(),
  date: z
    .number()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined))
    .refine((date) => !date || !isNaN(date.getTime()), { message: 'Invalid date format' }),
})

export const validateAddExpense = (
  body: Partial<AddExpenseRequestBody>,
): ValidationResult<Omit<AddExpenseRequestBody, 'date'> & { date?: Date }> => {
  const validationResult = addExpenseSchema.safeParse(body)
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}
