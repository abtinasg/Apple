'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Persist state to localStorage. SSR-safe: starts from the initial value on the
 * server and hydrates from storage after mount.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw !== null) setValue(JSON.parse(raw) as T)
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [key])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore */
    }
  }, [key, value, hydrated])

  const update = useCallback((v: T | ((prev: T) => T)) => setValue(v), [])

  return [value, update, hydrated] as const
}
