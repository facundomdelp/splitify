import { EMOJIS } from '../emojis'
import { hashStringToNumber } from './hashStringToNumber'

const emojis = Object.keys(EMOJIS)
const emojisLength = emojis.length

export function getEmojiFromString(string: string) {
  return emojis[hashStringToNumber(string, emojisLength)]
}
