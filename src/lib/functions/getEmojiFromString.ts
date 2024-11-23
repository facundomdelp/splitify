import { EMOJIS } from '../emojis'
import { hashStringToNumber } from './hashStringToNumber'

const emojis = Object.keys(EMOJIS)
const emojisLength = emojis.length

export function getEmojiFromString(string: string) {
  return emojis[hashStringToNumber(string, emojisLength)]
}

// export function getEmojiFromString(string: string, bannedEmojis?: string[]) {
//   let emojiIndex = hashStringToNumber(string, emojisLength)

//   for (let i = 0; i < emojisLength; i++) {
//     const emoji = emojis[emojiIndex]

//     if (!bannedEmojis?.includes(emoji)) {
//       return emoji
//     }

//     emojiIndex = (emojiIndex + 1) % emojisLength
//   }

//   return emojis[emojiIndex]
// }
