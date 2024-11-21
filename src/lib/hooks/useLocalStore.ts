import { useCallback, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (value) => {
      try {
        setStoredValue((prev: T) => {
          const newValue = value instanceof Function ? value(prev) : value
          window.localStorage.setItem(key, JSON.stringify(newValue))
          return newValue
        })
      } catch (error) {
        console.error(error)
      }
    },
    [key],
  )

  return [storedValue, setValue]
}
