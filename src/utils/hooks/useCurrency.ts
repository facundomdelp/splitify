'use client'

import { useEffect } from 'react'

import { useGetMetadata, useSetMetadata } from '@/store/metadata-store'

import { useGetGeoLocation } from './useGetGeoLocation'

export const useGetCurrency = () => {
  return useGetMetadata()?.currency
}

export const useSetCurrency = () => {
  const [metadata, setMetadata] = useSetMetadata()

  const setCurrency = (currency: string) => {
    setMetadata((prev) => ({ ...prev, currency }))
  }

  return { currency: metadata.currency, setCurrency }
}

export const useInitCurrency = () => {
  const [metadata, setMetadata] = useSetMetadata()
  const geoLocation = useGetGeoLocation()

  const detected = geoLocation?.currency

  useEffect(() => {
    if (!detected || metadata.currency) return

    setMetadata((prev) => (prev.currency ? prev : { ...prev, currency: detected }))
  }, [detected, metadata.currency, setMetadata])
}
