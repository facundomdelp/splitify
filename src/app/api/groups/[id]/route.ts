import { NextRequest, NextResponse } from 'next/server'
import GroupService from '@/services/groups.services'
import { validateGetGroup } from '@/validators/groups.validators'
import { handleErrors } from '@/lib/errors/handleErrors'

const groupService = new GroupService()

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url)
  const id = pathname.split('/').pop()

  const [data, errors] = validateGetGroup({ id })

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await groupService.getGroup(data.id)

    return NextResponse.json({ group: result }, { status: 201 })
  } catch (error) {
    return handleErrors(error)
  }
}
