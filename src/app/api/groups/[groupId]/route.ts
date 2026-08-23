import { NextRequest, NextResponse } from 'next/server'

import GroupService from '@/services/groups-services'

import { validateGroupId, validateUpdateGroup } from '@/validators/groups-validators'

import { UpdateGroupRequestBody } from '@/types/group-types'

import { handleErrors } from '@/utils/errors/handleErrors'

const groupService = new GroupService()

export async function GET(_request: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params
  const [data, errors] = validateGroupId({ groupId })

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await groupService.getGroup(data.groupId)

    return NextResponse.json({ group: result }, { status: 200 })
  } catch (error) {
    return handleErrors(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params
  const [groupIdData, groupIdErrors] = validateGroupId({ groupId })

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
      groupId: groupIdData.groupId,
      name: data.name,
      currency: data.currency,
    })

    return NextResponse.json({ group: result }, { status: 200 })
  } catch (error) {
    return handleErrors(error)
  }
}
