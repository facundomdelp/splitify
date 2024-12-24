import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { CustomError } from '@/lib/errors/CustomErrors'
import { db } from '..'

const GROUPS = 'groups'

class Groups {
  private groupCollection = collection(db, GROUPS)

  private getGroupRef = (groupId: string) => {
    return doc(db, GROUPS, groupId)
  }

  async addGroup({ name, createdAt }: { name: string; createdAt: Date }) {
    return (
      await addDoc(this.groupCollection, {
        name,
        createdAt: Timestamp.fromDate(createdAt),
        deletedAt: null,
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
      return { id: groupDoc.id, ...groupDoc.data() }
    } else {
      throw new CustomError(404, `Group with ID ${groupId} not found.`)
    }
  }
}

export default Groups
