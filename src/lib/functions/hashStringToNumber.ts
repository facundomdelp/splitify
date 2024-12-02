export function hashStringToNumber(word: string, max: number, initialHash = 5381): number {
  let hash = initialHash
  for (let i = 0; i < word.length; i++) {
    hash = (hash * 33) ^ word.charCodeAt(i)
  }

  return Math.abs(hash % max)
}
