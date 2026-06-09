// Tracks the current visitor's email in sessionStorage so the leaderboard can
// highlight their own row. Session-scoped on purpose: the email is forgotten
// when the tab closes.
import { useEffect, useState } from 'react'

const KEY = 'ffai.userEmail'
const EVENT = 'ffai:userEmail'
const UUID_KEY = 'ffai.userUuid'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(v: string): boolean {
  return EMAIL_RE.test(v.trim())
}

/** Normalize for matching: trimmed + lowercased. */
export function normalizeEmail(v: string): string {
  return v.trim().toLowerCase()
}

export function getUserEmail(): string {
  try {
    return sessionStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

export function setUserEmail(email: string): void {
  const norm = normalizeEmail(email)
  try {
    sessionStorage.setItem(KEY, norm)
  } catch {
    // sessionStorage unavailable (private mode / blocked) — degrade silently.
  }
  // Notify same-tab listeners (the native `storage` event only fires cross-tab).
  window.dispatchEvent(new CustomEvent(EVENT, { detail: norm }))
}

/** The participant id assigned by the backend on registration (session-scoped). */
export function getUserUuid(): string {
  try {
    return sessionStorage.getItem(UUID_KEY) ?? ''
  } catch {
    return ''
  }
}

export function setUserUuid(uuid: string): void {
  try {
    sessionStorage.setItem(UUID_KEY, uuid)
  } catch {
    // sessionStorage unavailable — degrade silently.
  }
}

/** React hook returning the current (normalized) session email, kept in sync. */
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
