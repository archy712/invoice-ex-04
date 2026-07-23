import { useSyncExternalStore } from "react"

function subscribe() {
  return () => {}
}

function getSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

/** True once the component has hydrated on the client. Avoids SSR/CSR mismatches without a setState-in-effect. */
export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
