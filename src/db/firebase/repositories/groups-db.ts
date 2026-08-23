import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'

import { CustomError } from '@/utils/errors/CustomErrors'

import { db } from '..'
import { tablesNames } from '../tableNames'

const { GROUPS } = tablesNames()

class Groups {
  private groupCollection = collection(db, GROUPS)

  private getGroupRef = (groupId: string) => {
    return doc(db, GROUPS, groupId)
  }

  private parseDates = (data: { [key: string]: unknown }) => {
    for (const key in data) {
      if (data[key] instanceof Timestamp) {
        data[key] = data[key].toMillis()
      }
    }

    return data
  }

  async addGroup({ name, currency }: { name: string; currency?: string }) {
    return (
      await addDoc(this.groupCollection, {
        createdAt: Timestamp.fromDate(new Date()),
        deletedAt: null,
        name,
        currency: currency || null,
      })
    ).id
  }

  async removeGroup(groupId: string) {
    const groupRef = this.getGroupRef(groupId)
    return await updateDoc(groupRef, {
      deletedAt: Timestamp.fromDate(new Date()),
    })
  }

  async getGroup(groupId: string) {
    const groupRef = this.getGroupRef(groupId)
    const groupDoc = await getDoc(groupRef)

    if (groupDoc.exists()) {
      const data = this.parseDates(groupDoc.data())
      return { id: groupDoc.id, ...data }
    } else {
      throw new CustomError(404, `Group with ID ${groupId} not found.`)
    }
  }

  async updateGroup({ groupId, name, currency }: { groupId: string; name?: string; currency?: string }) {
    const groupRef = this.getGroupRef(groupId)
    return await updateDoc(groupRef, {
      ...(name !== undefined ? { name } : {}),
      ...(currency !== undefined ? { currency } : {}),
    })
  }
}

export default Groups
