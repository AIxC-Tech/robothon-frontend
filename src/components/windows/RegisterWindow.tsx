import { useEffect, useRef, useState } from 'react'
import Window from '../Window'
import { useLang, type Lang } from '../../context/LangContext'
import { getRegistration, isValidEmail, storeRegistration, type StoredRegistration } from '../../lib/userSession'
import { submitRegistration, InvalidEmailError } from '../../lib/api'

// Fixed, scripted question flow — no LLM drives the conversation. The backend is
// called only once, at submit, to validate the email + assign/dedup the UUID.
// On success the full registration is persisted (localStorage); on a later visit
// the window shows the saved info, locks input, and offers a "Copy UUID" button.
interface Copy {
  nickname: string
  agent: (nickname: string) => string
  direction: string
  email: string
  invalidEmail: (v: string) => string
  success: (uuid: string) => string
  duplicate: (uuid: string) => string
  error: string
  registered: (r: StoredRegistration) => string
  copyUuid: string
}

const COPY: Record<Lang, Copy> = {
  en: {
    nickname: "Hi, welcome to FFAI Robothon — I'm the registration assistant. What nickname would you like to compete under?",
    agent: (n) => `Got it — “${n}”. Which AI agent / tools will you use? (Claude Code / Codex / Gemini CLI / Cursor / Kimi / your own)`,
    direction: 'Which direction do you want to tackle? (teleop / long-horizon tasks / data collection / dexterous hand / real-world scenarios, or freestyle)',
    email: 'Last one — what email should we send your score notifications to?',
    invalidEmail: (v) => `“${v}” doesn't look like a valid email. Please enter a valid email address (e.g. you@example.com).`,
    success: (id) => `Registration complete ✓ Your participant ID is ${id}. The contest kicks off June 16 — keep an eye on the live leaderboard!`,
    duplicate: (id) => `You're already registered ✓ Your participant ID is ${id}. See you on the live leaderboard!`,
    error: 'Sorry, something went wrong saving your registration. Please try again in a moment.',
    registered: (r) =>
      `You're already registered ✓\n· Nickname: ${r.nickname}\n· Agent: ${r.agent}\n· Direction: ${r.direction}\n· Email: ${r.email}\nYour participant ID is ${r.uuid}`,
    copyUuid: 'Copy UUID',
  },
  zh: {
    nickname: '你好，欢迎报名 FFAI Robothon。我是 AI 报名助手。请问你想使用的参赛昵称是？',
    agent: (n) => `收到，昵称「${n}」。这次你计划使用哪个 AI agent / 工具？(Claude Code / Codex / Gemini CLI / Cursor / Kimi / 自研)`,
    direction: '你想挑战的方向是？(遥操作 / 长程任务 / 数据采集 / 灵巧手 / 实际场景，或自由发挥)',
    email: '最后留一个邮箱地址吧，方便我们通知你成绩。',
    invalidEmail: (v) => `「${v}」不是有效的邮箱地址，请重新输入正确的邮箱（如 you@example.com）。`,
    success: (id) => `报名成功 ✓ 你的参赛 ID 是：${id}。比赛将于 6 月 16 日开赛，记得关注实时排行榜！`,
    duplicate: (id) => `你已经报名过了 ✓ 你的参赛 ID 是：${id}。记得关注实时排行榜！`,
    error: '抱歉，保存报名时出错了，请稍后再试。',
    registered: (r) =>
      `你已报名 ✓\n· 昵称：${r.nickname}\n· 工具：${r.agent}\n· 方向：${r.direction}\n· 邮箱：${r.email}\n你的参赛 ID 是：${r.uuid}`,
    copyUuid: '复制 UUID',
  },
}

const CHAT_PH: Record<Lang, { idle: string; busy: string }> = {
  en: { idle: 'Type and press Enter…', busy: 'Submitting…' },
  zh: { idle: '输入后回车…', busy: '提交中…' },
}

interface Msg {
  role: 'bot' | 'me'
  text: string
  typing?: boolean
}

type Step = 'nickname' | 'agent' | 'direction' | 'email'

const UUID_SPLIT = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i
const UUID_TEST = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function fallbackCopy(text: string, ack: () => void) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand('copy')
  } catch {
    /* ignore */
  }
  document.body.removeChild(ta)
  ack()
}

export default function RegisterWindow() {
  const { lang, t } = useLang()
  const [messages, setMessages] = useState<Msg[]>([])
  const [busy, setBusy] = useState(false)
  const [value, setValue] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [registration, setRegistration] = useState<StoredRegistration | null>(null)
  const step = useRef<Step>('nickname')
  const answers = useRef({ nickname: '', agent: '', direction: '', email: '' })
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const typer = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrollDown = () => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }

  useEffect(() => {
    scrollDown()
  }, [messages])

  const botSay = (text: string) => {
    setMessages((m) => [...m, { role: 'bot', text: '', typing: true }])
    let i = 0
    if (typer.current) clearInterval(typer.current)
    typer.current = setInterval(() => {
      i++
      setMessages((m) => {
        const copy = [...m]
        const last = copy[copy.length - 1]
        if (last && last.role === 'bot') {
          copy[copy.length - 1] = { ...last, text: text.slice(0, i), typing: i <= text.length }
        }
        return copy
      })
      scrollDown()
      if (i > text.length && typer.current) {
        clearInterval(typer.current)
        typer.current = null
      }
    }, 16)
  }

  useEffect(() => {
    setBusy(false)
    setValue('')
    setMessages([])
    step.current = 'nickname'
    answers.current = { nickname: '', agent: '', direction: '', email: '' }
    const saved = getRegistration()
    setRegistration(saved)
    botSay(saved ? COPY[lang].registered(saved) : COPY[lang].nickname)
    return () => {
      if (typer.current) clearInterval(typer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const submit = async () => {
    const c = COPY[lang]
    setBusy(true)
    try {
      const { uuid, duplicate } = await submitRegistration(answers.current)
      const reg: StoredRegistration = { ...answers.current, uuid }
      storeRegistration(reg)
      botSay(duplicate ? c.duplicate(uuid) : c.success(uuid))
      setRegistration(reg)
    } catch (err) {
      if (err instanceof InvalidEmailError) {
        botSay(c.invalidEmail(answers.current.email))
      } else {
        console.error('[register] submit failed:', err)
        botSay(c.error)
      }
    } finally {
      setBusy(false)
      inputRef.current?.focus()
    }
  }

  const send = () => {
    const v = value.trim()
    if (!v || busy || registration) return
    const c = COPY[lang]

    setMessages((m) => [...m, { role: 'me', text: v }])
    setValue('')

    switch (step.current) {
      case 'nickname':
        answers.current.nickname = v
        step.current = 'agent'
        botSay(c.agent(v))
        break
      case 'agent':
        answers.current.agent = v
        step.current = 'direction'
        botSay(c.direction)
        break
      case 'direction':
        answers.current.direction = v
        step.current = 'email'
        botSay(c.email)
        break
      case 'email':
        if (!isValidEmail(v)) {
          botSay(c.invalidEmail(v))
          break
        }
        answers.current.email = v
        void submit()
        break
    }
  }

  const copyUuid = (uuid: string) => {
    const ack = () => {
      setCopiedId(uuid)
      setTimeout(() => setCopiedId((c) => (c === uuid ? null : c)), 1500)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(uuid).then(ack).catch(() => fallbackCopy(uuid, ack))
    } else {
      fallbackCopy(uuid, ack)
    }
  }

  const renderText = (text: string) =>
    text.split(UUID_SPLIT).map((part, i) =>
      UUID_TEST.test(part) ? (
        <span key={i} className="copy-id" title={t('Click to copy', '点击复制')} onClick={() => copyUuid(part)}>
          {copiedId === part ? t('Copied ✓', '已复制 ✓') : part}
        </span>
      ) : (
        part
      ),
    )

  const placeholder = busy ? CHAT_PH[lang].busy : CHAT_PH[lang].idle

  return (
    <Window id="w-register" title="register@ffai-robothon — AI Registration Assistant">
      <div id="chatlog" ref={logRef}>
        {messages.map((m, i) => (
          <div className={`msg ${m.role}${m.typing ? ' typing' : ''}`} key={i}>
            {renderText(m.text)}
          </div>
        ))}
      </div>
      <div className="cin">
        {registration ? (
          <button type="button" className="copy-uuid-btn" onClick={() => copyUuid(registration.uuid)}>
            {copiedId === registration.uuid ? t('Copied ✓', '已复制 ✓') : COPY[lang].copyUuid}
          </button>
        ) : (
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation()
                send()
              }
            }}
          />
        )}
      </div>
    </Window>
  )
}
