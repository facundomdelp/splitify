import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

import { Metadata } from '@/types/common.types'

export const useGetMetadata = () => {
  return useReadLocalStorage<Metadata>('metadata')
}

export const useSetMetadata = () => {
  return useLocalStorage<Metadata>('metadata', { isLoaded: false }, { initializeWithValue: false })
}
