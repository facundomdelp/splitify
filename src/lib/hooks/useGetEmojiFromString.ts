import { EMOJIS } from '../constants/emojis'
import { hashStringToNumber } from '../functions/hashStringToNumber'
import { useCallback } from 'react'
import { useGetMetadata } from '../../store/metadata.store'

const emojis = Object.keys(EMOJIS)
const emojisLength = emojis.length

export const useGetEmojiFromString = () => {
  const metadata = useGetMetadata()

  const getEmojiFromString = useCallback(
    (string: string) => {
      return emojis[hashStringToNumber(string, emojisLength, Number(metadata?.emojiHash))]
    },
    [metadata?.emojiHash],
  )

  return getEmojiFromString
}
