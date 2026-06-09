import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type WinId =
  | 'w-hero'
  | 'w-rules'
  | 'w-scoring'
  | 'w-prizes'
  | 'w-timeline'
  | 'w-faq'
  | 'w-leaderboard'
  | 'w-cases'
  | 'w-register'
  | 'w-plot'
  | 'w-term'
  | 'w-trace'
  | 'w-banner'
  | 'w-dexhand'
  | 'w-scripts'
  | 'w-decrypt'
  | 'w-data'

interface WinState {
  open: boolean
  top: number
  left: string | number
  /** explicit size (only for "page" windows); undefined means CSS controls size */
  width?: number
  height?: number
  max: boolean
  z: number
}

/** windows that flow into the centered, vertically-stacked "page" layout */
const PAGE: [WinId, number, number][] = [
  ['w-hero', 720, 380],
  ['w-register', 720, 480],
  ['w-rules', 720, 440],
  ['w-scoring', 720, 470],
  ['w-prizes', 720, 420],
  ['w-timeline', 720, 440],
  ['w-faq', 720, 480],
  ['w-leaderboard', 720, 500],
  ['w-cases', 720, 280],
]

interface Layout {
  top: number
  w: number
  h: number
}
const LAYOUT: Partial<Record<WinId, Layout>> = (() => {
  const out: Partial<Record<WinId, Layout>> = {}
  let y = 90
  const gap = 46
  for (const [id, w, h] of PAGE) {
    out[id] = { top: y, w, h }
    y += h + gap
  }
  return out
})()

/** non-page windows keep their CSS size; only their first-open left differs */
const DEFAULT_LEFT: Partial<Record<WinId, number>> = { 'w-dexhand': 330 }

const isMobile = () => window.matchMedia('(max-width:900px)').matches

interface WindowManagerCtx {
  state: Record<WinId, WinState>
  open: (id: WinId) => void
  close: (id: WinId) => void
  focus: (id: WinId) => void
  toggleMax: (id: WinId) => void
  move: (id: WinId, top: number, left: number) => void
  pageMinHeight: number
}

const Ctx = createContext<WindowManagerCtx | null>(null)

const ALL_IDS: WinId[] = [
  'w-hero', 'w-rules', 'w-scoring', 'w-prizes', 'w-timeline', 'w-faq',
  'w-leaderboard', 'w-cases', 'w-register', 'w-plot', 'w-term', 'w-trace',
  'w-banner', 'w-dexhand', 'w-scripts', 'w-decrypt', 'w-data',
]

function initialState(): Record<WinId, WinState> {
  const out = {} as Record<WinId, WinState>
  for (const id of ALL_IDS) {
    out[id] = { open: false, top: 90, left: 340, max: false, z: 10 }
  }
  // hero starts open, centered (matches original openWin('w-hero') on load)
  return out
}

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Record<WinId, WinState>>(initialState)
  const zTop = useRef(20)

  const focus = useCallback((id: WinId) => {
    zTop.current += 1
    const z = zTop.current
    setState((prev) => ({ ...prev, [id]: { ...prev[id], z } }))
  }, [])

  const open = useCallback((id: WinId) => {
    zTop.current += 1
    const z = zTop.current
    setState((prev) => {
      const cur = prev[id]
      const next: WinState = { ...cur, open: true, z }
      if (!isMobile()) {
        const L = LAYOUT[id]
        if (L) {
          next.width = L.w
          next.height = L.h
          next.left = `calc(50% - ${L.w / 2}px)`
          next.top = L.top
        } else {
          next.top = window.scrollY + 80
          next.left = DEFAULT_LEFT[id] ?? 340
        }
      }
      return { ...prev, [id]: next }
    })
    // scroll page windows / mobile into view after they render
    if (LAYOUT[id] || isMobile()) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
    }
  }, [])

  const close = useCallback((id: WinId) => {
    setState((prev) => ({ ...prev, [id]: { ...prev[id], open: false } }))
  }, [])

  const toggleMax = useCallback((id: WinId) => {
    zTop.current += 1
    const z = zTop.current
    setState((prev) => ({ ...prev, [id]: { ...prev[id], max: !prev[id].max, z } }))
  }, [])

  const move = useCallback((id: WinId, top: number, left: number) => {
    setState((prev) => ({ ...prev, [id]: { ...prev[id], top, left } }))
  }, [])

  const pageMinHeight = useMemo(() => {
    let max = 0
    for (const id of ALL_IDS) {
      const L = LAYOUT[id]
      const s = state[id]
      if (L && s.open && !s.max) max = Math.max(max, L.top + (s.height ?? L.h))
    }
    return max ? max + 90 : 0
  }, [state])

  const value = useMemo<WindowManagerCtx>(
    () => ({ state, open, close, focus, toggleMax, move, pageMinHeight }),
    [state, open, close, focus, toggleMax, move, pageMinHeight],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useWindows(): WindowManagerCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useWindows must be used within a WindowManagerProvider')
  return ctx
}
