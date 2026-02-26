import Groups from '@/db/firebase/repositories/groups-db'

import { Locale } from '@/types/common-types'

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

  async updateGroup({ groupId, name }: { groupId: string; name?: string }) {
    return groups.updateGroup({ groupId, name })
  }
}

export default GroupService
