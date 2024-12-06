import { Metadata } from '@/types/Common'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

export const useGetMetadata = () => {
  return useReadLocalStorage<Metadata>('metadata')
}

export const useHandleMetadata = () => {
  return useLocalStorage<Metadata>('metadata', {} as Metadata, { initializeWithValue: false })
}
