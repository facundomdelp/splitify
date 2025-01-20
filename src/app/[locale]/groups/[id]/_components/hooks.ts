import { useRouter } from '@/i18n/routing'
import { useSetGroups } from '@/store/groups.store'

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
