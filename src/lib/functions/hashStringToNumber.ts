export function hashStringToNumber(word: string, max = 200): number {
  let hash = 0
  const constantFactor = 31
  for (let i = 0; i < word.length; i++) {
    hash = constantFactor * hash + word.charCodeAt(i)
  }

  return Math.abs(hash % max) + 1
}
