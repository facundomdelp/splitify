import { z } from 'zod'

import { ValidationResult } from '@/types/common-types'
import { AddGroupRequestBody, UpdateGroupRequestBody } from '@/types/group-types'

import { AVAILABLE_CURRENCIES } from '@/utils/constants/availableCurrencies'

const currencySchema = z.enum(AVAILABLE_CURRENCIES, { message: 'Unsupported currency' }).optional()

const validateGroupIdSchema = z.object({
  groupId: z
    .string()
    .length(20, 'Invalid Group ID')
    .regex(/^[A-Za-z0-9\-_]+$/, 'Invalid Group ID'),
})

export const validateGroupId = ({ groupId }: Partial<{ groupId: string }>): ValidationResult<{ groupId: string }> => {
  const validationResult = validateGroupIdSchema.safeParse({ groupId })
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}

const addGroupSchema = z.object({
  name: z.string().max(100, 'Group name is too long').optional(),
  currency: currencySchema,
})

export const validateAddGroup = (body: Partial<AddGroupRequestBody>): ValidationResult<AddGroupRequestBody> => {
  const validationResult = addGroupSchema.safeParse(body)
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}

const updateGroupSchema = z.object({
  name: z.string().max(100, 'Group name is too long').optional(),
  currency: currencySchema,
})

export const validateUpdateGroup = (
  body: Partial<UpdateGroupRequestBody>,
): ValidationResult<UpdateGroupRequestBody> => {
  const validationResult = updateGroupSchema.safeParse(body)
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}
