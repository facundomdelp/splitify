import { useLocalStorage } from 'usehooks-ts'
import { EMOJIS } from '../emojis'
import { hashStringToNumber } from '../functions/hashStringToNumber'
import { Metadata } from '@/types/Common'
import { useCallback } from 'react'

const emojis = Object.keys(EMOJIS)
const emojisLength = emojis.length

export const useGetEmojiFromString = () => {
  const [metadata] = useLocalStorage<Metadata>('metadata', {} as Metadata, { initializeWithValue: false })

  const getEmojiFromString = useCallback(
    (string: string) => {
      return emojis[hashStringToNumber(string, emojisLength, Number(metadata.emojiHash))]
    },
    [metadata.emojiHash],
  )

  return getEmojiFromString
}
