import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { CustomError } from '@/lib/errors/CustomErrors'
import { db } from '..'

const GROUPS = 'groups'

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

  async addGroup({ name }: { name: string }) {
    return (
      await addDoc(this.groupCollection, {
        createdAt: Timestamp.fromDate(new Date()),
        deletedAt: null,
        name,
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
}

export default Groups
