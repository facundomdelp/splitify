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
    deletedAt: number
    createdAt: number
  }
}
