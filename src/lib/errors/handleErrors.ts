import { NextResponse } from 'next/server'
import { CustomError } from './CustomErrors'

export function handleErrors(error: unknown) {
  if (error instanceof CustomError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
