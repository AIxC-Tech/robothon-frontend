// Persists the visitor's completed registration in localStorage so it survives
// page reloads / new sessions. On the next visit the register window shows the
// saved info and locks input. The email is also used to highlight the visitor's
// own row on the leaderboard.
import { useEffect, useState } from 'react'

const REG_KEY = 'ffai.registration'
const EVENT = 'ffai:registration'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface StoredRegistration {
  nickname: string
  agent: string
  direction: string
  email: string
  uuid: string
}

export function isValidEmail(v: string): boolean {
  return EMAIL_RE.test(v.trim())
}

/** Normalize for matching: trimmed + lowercased. */
export function normalizeEmail(v: string): string {
  return v.trim().toLowerCase()
}

/** The completed registration, or null if the visitor hasn't registered here. */
export function getRegistration(): StoredRegistration | null {
  try {
    const raw = localStorage.getItem(REG_KEY)
    if (!raw) return null
    const r = JSON.parse(raw) as StoredRegistration
    return r && typeof r.uuid === 'string' && r.uuid ? r : null
  } catch {
    return null
  }
}

export function storeRegistration(reg: StoredRegistration): void {
  try {
    localStorage.setItem(REG_KEY, JSON.stringify(reg))
  } catch {
    // localStorage unavailable (private mode / blocked) — degrade silently.
  }
  // notify same-tab listeners (the native `storage` event only fires cross-tab)
  window.dispatchEvent(new CustomEvent(EVENT))
}

/** Normalized email of the stored registration (for leaderboard self-row highlight). */
export function getUserEmail(): string {
  return normalizeEmail(getRegistration()?.email ?? '')
}

/** React hook returning the current (normalized) registered email, kept in sync. */
export function useUserEmail(): string {
  const [email, setEmail] = useState(getUserEmail)

  useEffect(() => {
    const onChange = () => setEmail(getUserEmail())
    window.addEventListener(EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  return email
}
