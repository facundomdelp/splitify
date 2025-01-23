import Groups from '@/db/firebase/repositories.ts/groups.db'

import { Locale } from '@/types/common.types'

import { generateRandomName } from '@/utils/functions/generateRandomName'

const groups = new Groups()

class GroupService {
  async addGroup({ name, locale }: { name?: string; locale?: Locale }) {
    if (!name) {
      name = generateRandomName(locale)
    }

    return groups.addGroup({ name })
  }

  async getGroup(groupId: string) {
    return groups.getGroup(groupId)
  }
}

export default GroupService
