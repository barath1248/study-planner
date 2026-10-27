
import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key)

      return savedValue !== null
        ? JSON.parse(savedValue)
        : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Could not save to localStorage:', error)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
