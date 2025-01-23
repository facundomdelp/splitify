import { useCallback } from 'react'

import { useGetMetadata } from '@/store/metadata.store'

import { EMOJIS } from '../constants/emojis'
import { hashStringToNumber } from '../functions/hashStringToNumber'

const emojis = Object.keys(EMOJIS)
const emojisLength = emojis.length

export const useGetEmojiFromString = (fixedHash?: boolean) => {
  const metadata = useGetMetadata()

  const getEmojiFromString = useCallback(
    (string: string) => {
      return emojis[hashStringToNumber(string, emojisLength, fixedHash ? undefined : Number(metadata?.emojiHash))]
    },
    [fixedHash, metadata?.emojiHash],
  )

  return getEmojiFromString
}
