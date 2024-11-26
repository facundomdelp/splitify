export function hashStringToNumber(word: string, max: number): number {
  let hash = 5381
  for (let i = 0; i < word.length; i++) {
    hash = (hash * 33) ^ word.charCodeAt(i)
  }

  return Math.abs(hash % max)
}
