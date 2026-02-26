import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'User-Agent': 'nodejs',
      },
    })

    if (!response.ok) {
      console.error(`ipapi.co responded with ${response.status}: ${response.statusText}`)
      return NextResponse.json(null, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Geolocation fetch error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
