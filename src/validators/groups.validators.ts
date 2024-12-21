import { z } from 'zod'
import { AddGroupRequestBody } from '@/types/group.types'

const addGroupSchema = z.object({
  name: z.string().max(100, 'Group name is too long').optional(),
})

export const validateAddGroup = (body: AddGroupRequestBody) => {
  const validationResult = addGroupSchema.safeParse(body)
  let errors: Array<{ field: string; message: string }> | null = null

  if (!validationResult.success) {
    errors = validationResult.error.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }))
  }

  return [validationResult.data, errors] as const
}
