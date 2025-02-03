import { NextRequest, NextResponse } from 'next/server'

import GroupService from '@/services/groups-services'

import { validateGroupId, validateUpdateGroup } from '@/validators/groups-validators'

import { UpdateGroupRequestBody } from '@/types/group-types'

import { handleErrors } from '@/utils/errors/handleErrors'

const groupService = new GroupService()

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [data, errors] = validateGroupId({ id })

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await groupService.getGroup(data.id)

    return NextResponse.json({ group: result }, { status: 200 })
  } catch (error) {
    return handleErrors(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [groupIdData, groupIdErrors] = validateGroupId({ id })

  if (!groupIdData || groupIdErrors) {
    return NextResponse.json({ errors: groupIdErrors }, { status: 400 })
  }

  const body: UpdateGroupRequestBody = await request.json()

  const [data, errors] = validateUpdateGroup(body)

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await groupService.updateGroup({
      groupId: groupIdData.id,
      name: data.name,
    })

    return NextResponse.json({ group: result }, { status: 200 })
  } catch (error) {
    return handleErrors(error)
  }
}
