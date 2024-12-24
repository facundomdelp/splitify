import { Timestamp } from 'firebase/firestore'

export type Groups = GetGroupResponse['group']

export type AddGroupRequestBody = {
  name?: string
}

export type GetGroupRequestBody = {
  id: string
}

export type GetGroupResponse = {
  group: {
    id: string
    name: string
    deletedAt: Pick<Timestamp, 'seconds' | 'nanoseconds'> | null
    createdAt: Pick<Timestamp, 'seconds' | 'nanoseconds'> | null
  }
}
