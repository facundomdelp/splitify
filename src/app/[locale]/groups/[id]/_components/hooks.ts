import { useMemo } from 'react'

import { useRouter } from '@/i18n/routing'

import { useSetGroups } from '@/store/groups-store'

import { CustomError } from '@/utils/errors/CustomErrors'

interface useRemoveGroupProps {
  groupId?: string
}

export const useRemoveGroup = ({ groupId }: useRemoveGroupProps) => {
  const { groups, setGroups } = useSetGroups()

  const router = useRouter()

  const handleRemoveGroup = () => {
    const newGroups = groups.filter((group) => group.id !== groupId)
    setGroups(newGroups)

    router.replace('/')
  }

  return { handleRemoveGroup }
}

interface useUpdateGroupName {
  groupId?: string
}

export const useUpdateGroupName = ({ groupId }: useUpdateGroupName) => {
  const { groups, setGroups } = useSetGroups()

  const handleEditGroupName = async ({ groupName }: { groupName: string }) => {
    const originalGroups = structuredClone(groups)

    groups.some((group) => {
      if (group.id === groupId) {
        group.name = groupName
        return true
      }
    })

    setGroups(groups)

    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: groupName,
        }),
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }
    } catch {
      setGroups(originalGroups)
    }
  }

  const groupName = useMemo(() => groups.find((group) => group.id === groupId)?.name, [groupId, groups])

  return { handleEditGroupName, groupName }
}

interface useUpdateGroupCurrency {
  groupId?: string
}
export const useUpdateGroupCurrency = ({ groupId }: useUpdateGroupCurrency) => {
  const { groups, setGroups } = useSetGroups()

  const handleEditGroupCurrency = async (currency: string) => {
    const originalGroups = structuredClone(groups)

    setGroups(groups.map((group) => (group.id === groupId ? { ...group, currency } : group)))

    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency }),
      })

      if (!response.ok) {
        throw new CustomError(response.status)
      }
    } catch {
      setGroups(originalGroups)
    }
  }

  const groupCurrency = useMemo(() => groups.find((group) => group.id === groupId)?.currency, [groupId, groups])

  return { handleEditGroupCurrency, groupCurrency }
}
