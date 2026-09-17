/* Tiny safe localStorage helpers — never throw, never lose data on a
   corrupted value, and degrade gracefully when storage is blocked. */

const PREFIX = 'poli.v1.'

function hasStorage(): boolean {
  try {
    const probe = '__poli_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return true
  } catch {
    return false
  }
}

const available = typeof window !== 'undefined' && hasStorage()

export function readStore<T>(key: string, fallback: T): T {
  if (!available) return fallback
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || parsed === undefined) return fallback
    return parsed as T
  } catch {
    return fallback
  }
}

export function writeStore(key: string, value: unknown): void {
  if (!available) return
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* storage full or blocked — the app keeps working in memory */
  }
}

export function removeStore(key: string): void {
  if (!available) return
  try {
    window.localStorage.removeItem(PREFIX + key)
  } catch {
    /* ignore */
  }
}

export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function dayOffset(iso: string, deltaDays: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + deltaDays)
  return todayKey(date)
}

export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`
}
