import { Groups } from '@/types/group.types'
import { useLocalStorage } from 'usehooks-ts'

export const useSetPublicGroups = () => {
  return useLocalStorage<Groups[]>('public-groups', [], { initializeWithValue: false })
}
