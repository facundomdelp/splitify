'use client'

import { useEffect, useState } from 'react'

import { GeoLocation } from '@/types/common-types'

export const useGetGeoLocation = () => {
  const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('/api/geolocation')
        const data = await response.json()
        setGeoLocation(data)
      } catch {
        setGeoLocation(null)
      }
    }

    fetchLocation()
  }, [])

  return geoLocation
}
