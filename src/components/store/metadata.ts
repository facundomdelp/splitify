import { Metadata } from '@/types/Common'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

export const useGetMetadata = () => {
  return useReadLocalStorage<Metadata>('metadata')
}

export const useSetMetadata = () => {
  return useLocalStorage<Metadata | null>('metadata', null, { initializeWithValue: false })
}
