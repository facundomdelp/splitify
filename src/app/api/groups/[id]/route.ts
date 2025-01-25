import { NextRequest, NextResponse } from 'next/server'

import GroupService from '@/services/groups-services'

import { validateGroupId } from '@/validators/groups-validators'

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
