export type Groups = GetGroupResponse['group']

export type AddGroupRequestBody = {
  name?: string
}

export type UpdateGroupRequestBody = {
  name?: string
}

export type GetGroupResponse = {
  group: {
    id: string
    name: string
    deletedAt: number
    createdAt: number
  }
}
