import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'zh'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  /** pick the english or chinese variant for the current language */
  t: (en: string, zh: string) => string
}

const Ctx = createContext<LangCtx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    document.documentElement.lang = l === 'en' ? 'en' : 'zh-CN'
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'zh' : 'en'
      document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN'
      return next
    })
  }, [])

  const value = useMemo<LangCtx>(
    () => ({ lang, setLang, toggle, t: (en, zh) => (lang === 'en' ? en : zh) }),
    [lang, setLang, toggle],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used within a LangProvider')
  return ctx
}
