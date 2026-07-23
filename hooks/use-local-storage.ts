"use client"

import useLocalStorageStateImpl from "use-local-storage-state"

export function useLocalStorage<T>(key: string, defaultValue: T) {
  return useLocalStorageStateImpl<T>(key, { defaultValue })
}
