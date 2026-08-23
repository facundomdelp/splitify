import { NextRequest, NextResponse } from 'next/server'

import GeoLocationService from '@/services/geolocation-services'

const geoLocationService = new GeoLocationService()

export async function GET(request: NextRequest) {
  const countryCode = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || undefined
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()

  const geoLocation = await geoLocationService.getGeoLocation({ countryCode, ip })

  return NextResponse.json(geoLocation, {
    headers: { 'Cache-Control': geoLocation ? 'public, max-age=3600' : 'no-store' },
  })
}
