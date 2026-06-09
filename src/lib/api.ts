// Backend base URL. Override with VITE_API_BASE (e.g. the deployed backend);
// defaults to the local dev backend.
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787'

// URL encoded into the share-card QR code. Set VITE_SHARE_URL to the public site/registration link.
export const SHARE_URL = import.meta.env.VITE_SHARE_URL || 'https://robothon.ff.com'

export type ApiRole = 'user' | 'assistant'
export interface ApiMessage {
  role: ApiRole
  content: string
}

export interface ChatReply {
  reply: string
  done: boolean
  /** participant id assigned by the backend once registration completes */
  uuid?: string
}

export interface RegisterResult {
  uuid: string
  /** true when this email had already registered (same uuid returned) */
  duplicate: boolean
}

export class InvalidEmailError extends Error {
  constructor() {
    super('invalid_email')
    this.name = 'InvalidEmailError'
  }
}

/**
 * Submit a completed registration (fields collected via the fixed question
 * flow). The backend validates the email, dedups by email, and returns the
 * participant UUID. Throws InvalidEmailError on a 400 invalid_email response.
 */
export async function submitRegistration(data: {
  nickname: string
  agent: string
  direction: string
  email: string
}): Promise<RegisterResult> {
  const res = await fetch(`${API_BASE}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (res.status === 400) throw new InvalidEmailError()
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`register ${res.status}: ${body.slice(0, 200)}`)
  }
  return (await res.json()) as RegisterResult
}

/**
 * Send the registration conversation to the backend (Zhipu GLM assistant).
 * `email` (if known) is the dedup key the backend uses to reuse a participant id.
 */
export async function registerChat(
  lang: 'en' | 'zh',
  messages: ApiMessage[],
  email = '',
): Promise<ChatReply> {
  const res = await fetch(`${API_BASE}/api/register/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang, email, messages }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`register/chat ${res.status}: ${body.slice(0, 200)}`)
  }
  return (await res.json()) as ChatReply
}

// ---- Leaderboard ----

export interface Badge {
  en: string
  zh: string
  c: string
}
export interface JudgeVerdict {
  en: string
  zh: string
}
export interface Reviews {
  claude: JudgeVerdict
  gpt: JudgeVerdict
  gemini: JudgeVerdict
}
export interface LeaderboardRow {
  rank: number
  name: string
  nameZh: string
  desc: string
  descZh: string
  badges: Badge[]
  tool: string
  score: number
  cls: string
  email?: string
  reviews: Reviews
}
export interface LeaderboardReply {
  rows: LeaderboardRow[]
  generatedAt: string
}

/** Fetch the live leaderboard (rows carry per-judge verdicts). */
export async function fetchLeaderboard(): Promise<LeaderboardReply> {
  const res = await fetch(`${API_BASE}/api/leaderboard`)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`leaderboard ${res.status}: ${body.slice(0, 200)}`)
  }
  return (await res.json()) as LeaderboardReply
}
