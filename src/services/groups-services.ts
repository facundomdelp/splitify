import Groups from '@/db/firebase/repositories/groups-db'

import { Locale } from '@/types/common-types'

import { generateRandomName } from '@/utils/functions/generateRandomName'

const groups = new Groups()

class GroupService {
  async addGroup({ name, locale, currency }: { name?: string; locale?: Locale; currency?: string }) {
    if (!name) {
      name = generateRandomName(locale)
    }

    return groups.addGroup({ name, currency })
  }

  async getGroup(groupId: string) {
    return groups.getGroup(groupId)
  }

  async updateGroup({ groupId, name, currency }: { groupId: string; name?: string; currency?: string }) {
    return groups.updateGroup({ groupId, name, currency })
  }
}

export default GroupService
