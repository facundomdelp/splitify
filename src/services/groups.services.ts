import Groups from '@/db/repositories.ts/groups.db'
import { generateRandomName } from '@/lib/functions/generateRandomName'
import { Locale } from '@/types/common.types'

const groups = new Groups()

class GroupService {
  async addGroup({ name, locale }: { name?: string; locale?: Locale }) {
    if (!name) {
      name = generateRandomName(locale)
    }

    return groups.addGroup({ name, createdAt: new Date() })
  }

  async getGroup(groupId: string) {
    return groups.getGroup(groupId)
  }
}

export default GroupService
