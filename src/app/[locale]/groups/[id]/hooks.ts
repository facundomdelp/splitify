import { CustomError } from '@/lib/errors/CustomErrors'
import { useSetGroups } from '@/store/groups.store'
import { GetGroupResponse } from '@/types/group.types'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useGetGroup = () => {
  const { groups, setGroups, initialized } = useSetGroups()

  const [{ loading, error }, setGetGroupState] = useState<{ loading: boolean; error: number | null }>({
    loading: true,
    error: null,
  })

  const { id } = useParams<{ id: string }>()

  const getGroup = useCallback(async () => {
    try {
      const response = await fetch(`/api/groups/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }

      const data: GetGroupResponse = await response.json()

      const groupIndex = groups.findIndex((group) => group.id === data.group.id)
      if (groupIndex === -1) {
        setGroups((prev) => [...(prev ?? []), data.group])
      } else {
        const newGroups = [...groups]
        newGroups[groupIndex] = data.group
        setGroups(newGroups)
      }

      //
      // I can:
      // * get the expenses within the group, populated from the backend
      // * get the expenses as soon as I get the group
      //
      //
    } catch (e) {
      if (e instanceof CustomError) {
        setGetGroupState((prev) => ({ ...prev, error: e.status }))
      }
    } finally {
      setGetGroupState((prev) => ({ ...prev, loading: false }))
    }
  }, [groups, id, setGroups])

  useEffect(() => {
    if (initialized) {
      getGroup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized])

  return { loading, error, groups }
}
