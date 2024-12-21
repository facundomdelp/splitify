import { Metadata } from '@/types/common.types'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

export const useGetMetadata = () => {
  return useReadLocalStorage<Metadata>('metadata')
}

export const useSetMetadata = () => {
  return useLocalStorage<Metadata>('metadata', { isLoaded: false }, { initializeWithValue: false })
}
