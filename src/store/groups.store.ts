import { useLocalStorage } from 'usehooks-ts'

import { useEffect, useState } from 'react'

import { Groups } from '@/types/group.types'

export const useSetGroups = () => {
  const [initialized, setInitialized] = useState(false)

  const [groups, setGroups] = useLocalStorage<Groups[]>('groups', [], {
    initializeWithValue: false,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // if (!groups) {
      //   localStorage.setItem('groups', JSON.stringify([]))
      // }

      setInitialized(true)
    }
  }, [])

  return { groups, setGroups, initialized }
}
