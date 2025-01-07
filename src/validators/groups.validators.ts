import { z } from 'zod'
import { AddGroupRequestBody, GetGroupRequestBody } from '@/types/group.types'
import { ValidationResult } from '@/types/common.types'

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

const getGroupSchema = z.object({
  id: z
    .string()
    .length(20, 'Invalid Group ID')
    .regex(/^[A-Za-z0-9\-_]+$/, 'Invalid Group ID'),
})

export const validateGroupId = ({ id }: Partial<GetGroupRequestBody>): ValidationResult<GetGroupRequestBody> => {
  const validationResult = getGroupSchema.safeParse({ id })
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }))
  }

  return [validationResult.success ? validationResult.data : null, errors] as const
}
