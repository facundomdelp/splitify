'use client'

import { GeoLocation } from '@/types/Common'
import { useEffect, useState } from 'react'

export const useGetGeoLocation = () => {
  const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json')
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
