import { z } from 'zod'

import { ValidationResult } from '@/types/common-types'
import { AddGroupRequestBody, UpdateGroupRequestBody } from '@/types/group-types'

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
    errors = validationResult.error.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}

const addGroupSchema = z.object({
  name: z.string().max(100, 'Group name is too long').optional(),
})

export const validateAddGroup = (body: Partial<AddGroupRequestBody>): ValidationResult<AddGroupRequestBody> => {
  const validationResult = addGroupSchema.safeParse(body)
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}

const updateGroupSchema = z.object({
  name: z.string().max(100, 'Group name is too long').optional(),
})

export const validateUpdateGroup = (
  body: Partial<UpdateGroupRequestBody>,
): ValidationResult<UpdateGroupRequestBody> => {
  const validationResult = updateGroupSchema.safeParse(body)
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}
