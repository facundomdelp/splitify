import { GeoLocation } from '@/types/common-types'

import { getCurrencyForRegion } from '@/utils/constants/availableCurrencies'

const TIMEOUT = 2500

const PRIVATE_IP =
  /^(::1|::ffff:127\.|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|f[cd][0-9a-f]{2}:|fe80:)/i

const toPublicIp = (ip?: string) => (ip && !PRIVATE_IP.test(ip) ? ip : undefined)

const toGeoLocation = (countryCode?: string, currency?: string): GeoLocation | null => {
  if (!countryCode) return null

  return { countryCode: countryCode.toUpperCase(), currency: currency || getCurrencyForRegion(countryCode) }
}

const request = async (url: string): Promise<Record<string, unknown> | null> => {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'splitify' },
      signal: AbortSignal.timeout(TIMEOUT),
    })

    if (!response.ok) return null

    return await response.json()
  } catch {
    return null
  }
}

/* Ordered cheapest and most reliable first. The edge already knows the country, so no call is needed in production */
const PROVIDERS: Array<(ip?: string) => Promise<GeoLocation | null>> = [
  async (ip) => {
    if (!ip) return null

    const data = await request(`https://ipwho.is/${ip}`)
    const currency = data?.currency as { code?: string } | undefined

    return data?.success ? toGeoLocation(data?.country_code as string, currency?.code) : null
  },
  async (ip) => {
    const data = await request(ip ? `https://api.country.is/${ip}` : 'https://api.country.is/')

    return toGeoLocation(data?.country as string)
  },
]

class GeoLocationService {
  async getGeoLocation({ countryCode, ip }: { countryCode?: string; ip?: string }): Promise<GeoLocation | null> {
    const fromEdge = toGeoLocation(countryCode)

    if (fromEdge) return fromEdge

    const publicIp = toPublicIp(ip)

    for (const provider of PROVIDERS) {
      const geoLocation = await provider(publicIp)

      if (geoLocation) return geoLocation
    }

    return null
  }
}

export default GeoLocationService
