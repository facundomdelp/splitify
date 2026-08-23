'use client'

import { useEffect } from 'react'

import { useGetMetadata, useSetMetadata } from '@/store/metadata-store'

import { getDefaultCurrency, isSupportedCurrency } from '@/utils/constants/availableCurrencies'

import { useGetGeoLocation } from './useGetGeoLocation'

export const useGetCurrency = () => {
  return useGetMetadata()?.currency
}

export const useSetCurrency = () => {
  const [metadata, setMetadata] = useSetMetadata()

  const setCurrency = (currency: string) => {
    setMetadata((prev) => ({ ...prev, currency, currencySource: 'user' }))
  }

  return { currency: metadata.currency, setCurrency }
}

/* Guesses from the browser locale straight away, then upgrades to the detected country when it arrives.
   A currency the user picked themselves is never touched */
export const useInitCurrency = () => {
  const [metadata, setMetadata] = useSetMetadata()
  const geoLocation = useGetGeoLocation()

  const { isLoaded, currency } = metadata
  const detected = geoLocation?.currency

  useEffect(() => {
    if (!isLoaded || currency) return

    setMetadata((prev) => (prev.currency ? prev : { ...prev, currency: getDefaultCurrency(), currencySource: 'auto' }))
  }, [isLoaded, currency, setMetadata])

  useEffect(() => {
    if (!isLoaded || !isSupportedCurrency(detected)) return

    setMetadata((prev) =>
      prev.currencySource === 'user' || prev.currency === detected
        ? prev
        : { ...prev, currency: detected, currencySource: 'auto' },
    )
  }, [isLoaded, detected, setMetadata])
}
