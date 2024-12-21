import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '..'

const GROUPS = 'groups'

class Groups {
  private groupCollection = collection(db, GROUPS)

  private getGroupRef = (expenseId: string) => {
    return doc(db, GROUPS, expenseId)
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
}

export default Groups
