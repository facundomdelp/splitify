import { useIsClient, useLocalStorage } from 'usehooks-ts'

import { Groups } from '@/types/group-types'

export const useSetGroups = () => {
  const initialized = useIsClient()

  const [groups, setGroups] = useLocalStorage<Groups[]>('groups', [], {
    initializeWithValue: false,
  })

  return { groups, setGroups, initialized }
}
