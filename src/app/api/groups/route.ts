import { NextRequest, NextResponse } from 'next/server'

import GroupService from '@/services/groups.services'

import { validateAddGroup } from '@/validators/groups.validators'

import { Locale } from '@/types/common.types'
import { AddGroupRequestBody } from '@/types/group.types'

import { handleErrors } from '@/utils/errors/handleErrors'

const groupService = new GroupService()

export async function POST(request: NextRequest) {
  const locale = (request.cookies.get('NEXT_LOCALE')?.value as Locale) || 'en'

  let body: AddGroupRequestBody = {}
  if (request.headers.get('content-length') !== '0') {
    body = await request.json()
  }

  const [data, errors] = validateAddGroup(body)

  if (!data || errors) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const result = await groupService.addGroup({
      locale,
      name: data.name,
    })

    return NextResponse.json({ message: 'Group created successfully!', group: result }, { status: 201 })
  } catch (error) {
    return handleErrors(error)
  }
}
