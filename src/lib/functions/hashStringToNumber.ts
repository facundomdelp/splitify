export function hashStringToNumber(word: string, max = 200): number {
  let hash = 0

  for (let i = 0; i < word.length; i++) {
    hash = (hash << 5) - hash + word.charCodeAt(i)
  }

  return Math.abs(hash % max) + 1
}
