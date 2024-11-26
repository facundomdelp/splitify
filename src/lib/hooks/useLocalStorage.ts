import { useCallback, useEffect, useState } from 'react'

const LAST_UPDATE_DATE = new Date('2024-11-26')

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error syncing localStorage key "${key}":`, error)
    }
  }, [key])

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = useCallback(
    (value) => {
      try {
        setStoredValue((prev: T | undefined) => {
          const newValue = value instanceof Function ? value(prev) : value
          window.localStorage.setItem(key, JSON.stringify(newValue))
          return newValue
        })
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key],
  )

  useEffect(() => {
    const lastUpdate = window.localStorage.getItem('last_update')

    if (!lastUpdate || new Date(lastUpdate) < LAST_UPDATE_DATE) {
      window.localStorage.clear()
      window.localStorage.setItem('last_update', LAST_UPDATE_DATE.toISOString())
    } else {
      window.localStorage.setItem('last_update', LAST_UPDATE_DATE.toISOString())
    }
  }, [])

  return [storedValue, setValue]
}
