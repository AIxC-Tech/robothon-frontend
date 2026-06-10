import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import qrcode from 'qrcode-generator'
import Window from '../Window'
import { useLang, type Lang } from '../../context/LangContext'
import { normalizeEmail, useUserEmail } from '../../lib/userSession'
import { fetchLeaderboard, SHARE_URL, type LeaderboardRow, type Reviews } from '../../lib/api'

type Row = LeaderboardRow

// Offline fallback so the board never renders empty if the backend is unreachable.
// Reviews come from the backend; the fallback omits them (the share card simply
// drops the verdicts section when they're absent).
const EMPTY_REVIEWS: Reviews = {
  claude: { en: '', zh: '' },
  gpt: { en: '', zh: '' },
  gemini: { en: '', zh: '' },
}
const FALLBACK_ROWS: Row[] = [
  {
    rank: 1, name: 'Team Tendon', nameZh: 'Team Tendon',
    desc: 'Improvised dance choreography for a quadruped, driven by language commands',
    descZh: '用语言指令让四足机器人即兴编排舞蹈',
    badges: [{ en: 'Champion · 3,000 USDC', zh: '冠军 · 3,000 USDC', c: 'gold' }], tool: 'Claude Code', score: 87.5, cls: 'top1',
    email: 'tendon@ffai.dev', reviews: EMPTY_REVIEWS,
  },
  {
    rank: 2, name: 'soft-gripper', nameZh: 'soft-gripper',
    desc: 'Adaptive grasping — infers object fragility from a sentence and tunes grip force',
    descZh: '自适应抓取：从一句话推断物体易碎度并调整夹爪力度',
    badges: [{ en: 'Runner-up · 1,500 USDC', zh: '亚军 · 1,500 USDC', c: '' }], tool: 'Codex', score: 86.6, cls: 'top2',
    email: 'softgripper@ffai.dev', reviews: EMPTY_REVIEWS,
  },
  {
    rank: 3, name: 'Anonymous 🔒', nameZh: '匿名选手 🔒',
    desc: 'Multi-agent transport: three robotic arms self-negotiate the division of labor',
    descZh: '多智能体协作搬运：三台机械臂自协商分工',
    badges: [{ en: '3rd · 800 USDC', zh: '季军 · 800 USDC', c: '' }], tool: 'Gemini CLI', score: 84.1, cls: 'top3',
    email: 'anon@ffai.dev', reviews: EMPTY_REVIEWS,
  },
  {
    rank: 4, name: 'GraspGPT', nameZh: 'GraspGPT',
    desc: 'Desktop-tidying robot that understands “put away the red ones” and executes it',
    descZh: '桌面整理机器人：听懂‘把红色的收起来’并执行',
    badges: [{ en: 'Excellence · 300 USDC', zh: '优秀作品奖 · 300 USDC', c: '' }], tool: 'Claude Code', score: 82.5, cls: '',
    email: 'graspgpt@ffai.dev', reviews: EMPTY_REVIEWS,
  },
  {
    rank: 5, name: 'BalanceBot', nameZh: 'BalanceBot',
    desc: 'Inverted-pendulum robot switches its balance strategy in real time from audience shouts',
    descZh: '倒立摆机器人根据观众喊话实时切换平衡策略',
    badges: [{ en: 'Excellence · 300 USDC', zh: '优秀作品奖 · 300 USDC', c: '' }], tool: 'Cursor', score: 82.3, cls: '',
    email: 'balancebot@ffai.dev', reviews: EMPTY_REVIEWS,
  },
  {
    rank: 6, name: 'Hexapod Buddy', nameZh: '六足同学',
    desc: 'Hexapod re-plans its gait after injury (language-triggered fault injection)',
    descZh: '六足机器人受伤后自我重规划步态（语言触发故障注入）',
    badges: [
      { en: 'Excellence · 300 USDC', zh: '优秀作品奖 · 300 USDC', c: '' },
      { en: '★ Best Human-AI Collab · 400 USDC', zh: '★ 最佳人机协作 · 400 USDC', c: 'star' },
    ], tool: 'Codex', score: 81.3, cls: '',
    email: 'hexapod@ffai.dev', reviews: EMPTY_REVIEWS,
  },
]

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
    <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
  </svg>
)

function shareText(r: Row, lang: Lang) {
  return lang === 'zh'
    ? `FFAI Robothon 2026 排行榜 #${r.rank} ${r.nameZh} — ${r.score.toFixed(1)}/100，由 ${r.tool} 构建。#FFAIRobothon #MuJoCo`
    : `#${r.rank} ${r.name} — ${r.score.toFixed(1)}/100 on the FFAI Robothon Summer 2026 leaderboard, built with ${r.tool}. #FFAIRobothon #MuJoCo #EmbodiedAI`
}

// ===== Share card (mockup-style portrait poster) =====

const CARD_FONT = 'Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
const JUDGES = [
  { key: 'claude', label: 'Claude', dot: '#e8825a' },
  { key: 'gpt', label: 'GPT', dot: '#19c37d' },
  { key: 'gemini', label: 'Gemini', dot: '#5a9dff' },
] as const

/** Split mixed CJK/Latin text into wrap-friendly tokens (CJK chars are individual). */
function tokenize(s: string): string[] {
  return s.match(/[一-鿿　-〿＀-￯]|[^\s一-鿿　-〿＀-￯]+|\s+/g) ?? []
}
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const tk of tokenize(text)) {
    const test = line + tk
    if (ctx.measureText(test).width > maxWidth && line.trim() !== '') {
      lines.push(line.replace(/\s+$/, ''))
      line = /^\s+$/.test(tk) ? '' : tk
    } else {
      line = test
    }
  }
  if (line.trim() !== '') lines.push(line.replace(/\s+$/, ''))
  return lines
}

/** Trim text to a single line that fits maxWidth, adding an ellipsis if clipped. */
function ellipsize(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text
  let s = text
  while (s.length > 1 && ctx.measureText(s + '…').width > maxWidth) s = s.slice(0, -1)
  return s.replace(/\s+$/, '') + '…'
}

function fmtTs(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function pill(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  o: { font: string; h: number; padX: number; radius: number; bg?: string; border?: string; color: string },
): number {
  ctx.font = o.font
  const w = ctx.measureText(text).width + o.padX * 2
  ctx.beginPath()
  ctx.roundRect(x, y, w, o.h, o.radius)
  if (o.bg) { ctx.fillStyle = o.bg; ctx.fill() }
  if (o.border) { ctx.lineWidth = 1.2; ctx.strokeStyle = o.border; ctx.stroke() }
  ctx.fillStyle = o.color
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x + o.padX, y + o.h / 2 + 0.5)
  ctx.textBaseline = 'alphabetic'
  return w
}

function drawQR(ctx: CanvasRenderingContext2D, url: string, x: number, y: number, size: number) {
  const qr = qrcode(0, 'M')
  qr.addData(url)
  qr.make()
  const n = qr.getModuleCount()
  const quiet = 2
  const cell = size / (n + quiet * 2)
  ctx.fillStyle = '#f4f6fb'
  ctx.beginPath()
  ctx.roundRect(x, y, size, size, 10)
  ctx.fill()
  ctx.fillStyle = '#0c1124'
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillRect(x + (c + quiet) * cell, y + (r + quiet) * cell, cell + 0.6, cell + 0.6)
      }
    }
  }
}

function drawCard(r: Row, lang: Lang, generatedAt: Date): HTMLCanvasElement {
  const sc = 2, W = 560, P = 42
  const contentW = W - P * 2

  // ---- measuring pass: wrap each judge verdict to know the card height ----
  const measure = document.createElement('canvas').getContext('2d')!
  measure.font = `italic 400 15.5px ${CARD_FONT}`
  const blocks = JUDGES
    .map((j) => {
      const v = r.reviews?.[j.key]
      const text = (v ? (lang === 'zh' ? v.zh : v.en) : '').trim()
      return { j, lines: text ? wrapText(measure, `“${text}”`, contentW - 20) : [] }
    })
    .filter((b) => b.lines.length > 0)

  const REV_TOP = 486
  let by = REV_TOP
  for (const b of blocks) by += 22 + b.lines.length * 20 + 13
  const reviewsEnd = blocks.length ? by - 13 : 430
  const footerDivY = reviewsEnd + 24
  const metaY = footerDivY + 26
  const qrTop = metaY + 16
  const qrSize = 92
  const presentY = qrTop + 16
  const pillsTop = presentY + 12
  const hashY = pillsTop + 30 + 26
  const H = Math.max(hashY, qrTop + qrSize) + 26

  const cv = document.createElement('canvas')
  cv.width = W * sc
  cv.height = H * sc
  const x = cv.getContext('2d')!
  x.scale(sc, sc)
  x.textBaseline = 'alphabetic'

  // background — diagonal navy → purple
  const bg = x.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#0c1226')
  bg.addColorStop(0.55, '#161335')
  bg.addColorStop(1, '#241a47')
  x.fillStyle = bg
  x.fillRect(0, 0, W, H)
  // soft glow top-right
  const glow = x.createRadialGradient(W - 60, 40, 10, W - 60, 40, 320)
  glow.addColorStop(0, 'rgba(90,157,255,0.16)')
  glow.addColorStop(1, 'rgba(90,157,255,0)')
  x.fillStyle = glow
  x.fillRect(0, 0, W, H)

  // header
  const brand = x.createLinearGradient(P, 0, P + 230, 0)
  brand.addColorStop(0, '#6fe6cd')
  brand.addColorStop(1, '#46c6ec')
  x.fillStyle = brand
  x.font = `700 21px ${CARD_FONT}`
  x.fillText('FFAI ROBOTHON', P, 54)
  x.fillStyle = '#aab2c8'
  x.font = `600 16px ${CARD_FONT}`
  x.textAlign = 'right'
  x.fillText(lang === 'zh' ? 'AI × 具身智能' : 'AI × Embodied', W - P, 52)
  x.textAlign = 'left'

  // kicker
  x.fillStyle = '#45dcc8'
  x.font = `700 18px ${CARD_FONT}`
  x.fillText(lang === 'zh' ? '实时排名' : 'LIVE RANKING', P, 112)

  // rank number with gradient
  x.font = `800 84px ${CARD_FONT}`
  const rankTxt = '#' + r.rank
  const rankW = x.measureText(rankTxt).width
  const rankGrad = x.createLinearGradient(P, 0, P + rankW, 0)
  rankGrad.addColorStop(0, '#7b8cff')
  rankGrad.addColorStop(1, '#b483ff')
  x.fillStyle = rankGrad
  x.fillText(rankTxt, P, 200)

  // team name
  const nm = lang === 'zh' ? r.nameZh : r.name
  x.fillStyle = '#f4f6fb'
  x.font = `700 38px ${CARD_FONT}`
  x.fillText(nm, P, 270)

  // description
  const ds = lang === 'zh' ? r.descZh : r.desc
  x.fillStyle = '#9aa3ba'
  x.font = `400 16px ${CARD_FONT}`
  x.fillText(ellipsize(x, ds, contentW), P, 300)

  // tool pill
  pill(x, r.tool, P, 322, {
    font: `600 14px ${CARD_FONT}`, h: 32, padX: 16, radius: 16,
    bg: 'rgba(123,140,255,0.16)', border: 'rgba(123,140,255,0.5)', color: '#c7c9ff',
  })

  // primary badge pill
  const b0 = r.badges[0]
  if (b0) {
    pill(x, lang === 'zh' ? b0.zh : b0.en, P, 372, {
      font: `600 14px ${CARD_FONT}`, h: 30, padX: 14, radius: 8,
      bg: 'rgba(255,200,90,0.12)', border: 'rgba(255,200,90,0.45)', color: '#ffd56a',
    })
  }

  // divider before verdicts
  x.strokeStyle = 'rgba(255,255,255,0.12)'
  x.lineWidth = 1
  x.beginPath()
  x.moveTo(P, 426)
  x.lineTo(W - P, 426)
  x.stroke()

  // verdicts
  if (blocks.length) {
    x.fillStyle = '#45dcc8'
    x.font = `700 15px ${CARD_FONT}`
    x.fillText(lang === 'zh' ? 'AI 评审锐评' : "AI JUDGES' TAKE", P, 462)

    let cy = REV_TOP
    for (const b of blocks) {
      x.fillStyle = b.j.dot
      x.beginPath()
      x.arc(P + 5, cy - 5, 4.5, 0, Math.PI * 2)
      x.fill()
      x.fillStyle = '#eef1f8'
      x.font = `700 15px ${CARD_FONT}`
      x.fillText(b.j.label, P + 18, cy)
      x.fillStyle = '#aeb6c8'
      x.font = `italic 400 15.5px ${CARD_FONT}`
      let qy = cy + 21
      for (const ln of b.lines) {
        x.fillText(ln, P + 18, qy)
        qy += 20
      }
      cy = qy + 13
    }
  }

  // footer divider
  x.strokeStyle = 'rgba(255,255,255,0.1)'
  x.beginPath()
  x.moveTo(P, footerDivY)
  x.lineTo(W - P, footerDivY)
  x.stroke()

  // meta line
  x.fillStyle = '#727c92'
  x.font = `400 12px ${CARD_FONT}`
  x.fillText(
    lang === 'zh'
      ? `生成于 ${fmtTs(generatedAt)} · 奖励按当前实时排名，最终以终审为准`
      : `Generated ${fmtTs(generatedAt)} · prizes track the live ranking; final review prevails`,
    P, metaY,
  )

  // presented-by + brand pills (left column)
  x.fillStyle = '#8b93a8'
  x.font = `600 12px ${CARD_FONT}`
  x.fillText(lang === 'zh' ? '联合呈现' : 'Presented by', P, presentY)
  const w1 = pill(x, 'FFAI', P, pillsTop, {
    font: `700 13px ${CARD_FONT}`, h: 30, padX: 14, radius: 8,
    border: 'rgba(255,255,255,0.22)', color: '#dfe3ec',
  })
  pill(x, 'AIXC', P + w1 + 10, pillsTop, {
    font: `700 13px ${CARD_FONT}`, h: 30, padX: 14, radius: 8,
    border: 'rgba(255,255,255,0.22)', color: '#dfe3ec',
  })

  // hashtags
  x.fillStyle = '#5d6680'
  x.font = `500 12px ${CARD_FONT}`
  x.fillText('#FFAIRobothon · #MuJoCo · #EmbodiedAI', P, hashY)

  // QR (bottom-right)
  drawQR(x, SHARE_URL, W - P - qrSize, qrTop, qrSize)
  x.fillStyle = '#727c92'
  x.font = `400 10px ${CARD_FONT}`
  x.textAlign = 'center'
  x.fillText(lang === 'zh' ? '扫码报名' : 'Scan to join', W - P - qrSize / 2, qrTop + qrSize + 14)
  x.textAlign = 'left'

  return cv
}

export default function LeaderboardWindow() {
  const { lang, t } = useLang()
  const userEmail = useUserEmail()
  const [rows, setRows] = useState<Row[]>(FALLBACK_ROWS)
  const [generatedAt, setGeneratedAt] = useState<Date>(() => new Date())
  const [expanded, setExpanded] = useState(false)
  const [, setTick] = useState(0)
  const [pop, setPop] = useState<{ x: number; y: number; row: Row } | null>(null)

  // load the live leaderboard from the backend (falls back to the bundled rows)
  useEffect(() => {
    let alive = true
    fetchLeaderboard()
      .then((data) => {
        if (!alive || !data.rows?.length) return
        setRows(data.rows)
        setGeneratedAt(new Date(data.generatedAt))
      })
      .catch((err) => console.warn('[leaderboard] using fallback rows:', err))
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setTick((n) => n + 1), 1800)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (!pop) return
    const onDoc = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el.closest('.lb-share') && !el.closest('#sharepop')) setPop(null)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [pop])

  // Auto-reveal the full board when the visitor's own row sits outside the top 3,
  // otherwise their highlighted row would stay hidden behind "Open full leaderboard".
  useEffect(() => {
    if (!userEmail) return
    const mine = rows.findIndex((r) => r.email && normalizeEmail(r.email) === userEmail)
    if (mine >= 3) setExpanded(true)
  }, [userEmail, rows])

  const shown = expanded ? rows : rows.slice(0, 3)

  const openShare = (e: React.MouseEvent, row: Row) => {
    e.stopPropagation()
    const rc = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setPop({
      x: Math.min(rc.left + window.scrollX, window.scrollX + window.innerWidth - 180),
      y: rc.bottom + window.scrollY + 6,
      row,
    })
  }

  return (
    <>
      <Window id="w-leaderboard" title="live_leaderboard.feed" bodyClassName="c ctext">
        <div className="winh">{t('Live Leaderboard', '实时排行榜')}</div>
        <div className="lb-head">
          <span style={{ color: 'var(--grant)' }}>● LIVE</span>
          {t(' · top submissions · scored /100', ' · 热门提交 · 总分 /100')}
        </div>
        <div>
          {shown.map((r) => {
            const s = (r.score + (Math.random() * 0.2 - 0.1)).toFixed(1)
            const nm = lang === 'zh' ? r.nameZh : r.name
            const ds = lang === 'zh' ? r.descZh : r.desc
            const isMe = !!userEmail && !!r.email && normalizeEmail(r.email) === userEmail
            return (
              <div className={`lb-row ${r.cls}${isMe ? ' me' : ''}`} key={r.rank}>
                <div className="lb-rank">{r.rank}</div>
                <div className="lb-main">
                  <div className="lb-name">
                    {nm}
                    {isMe && <span className="lb-you">{t('You', '你')}</span>}
                  </div>
                  <div className="lb-desc">{ds}</div>
                  <div className="lb-badges">
                    {r.badges.map((b, i) => (
                      <span className={`lb-badge ${b.c}`} key={i}>
                        {lang === 'zh' ? b.zh : b.en}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lb-tool">{r.tool}</div>
                <div className="lb-score">
                  <b>{s}</b>
                  <span> /100</span>
                </div>
                <button className="lb-share" aria-label="Share" onClick={(e) => openShare(e, r)}>
                  <ShareIcon />
                </button>
              </div>
            )
          })}
        </div>
        {!expanded && (
          <div style={{ marginTop: 14 }}>
            <span className="actbtn" onClick={() => setExpanded(true)}>
              {t('▸ Open full leaderboard', '▸ 展开完整排行榜')}
            </span>
          </div>
        )}
      </Window>

      {pop &&
        createPortal(
          <div id="sharepop" className="show" style={{ left: pop.x, top: pop.y }}>
            <button
              onClick={() => {
                window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText(pop.row, lang)), '_blank')
                setPop(null)
              }}
            >
              𝕏 &nbsp;{t('Share on X', '分享到 X')}
            </button>
            <button
              onClick={() => {
                drawCard(pop.row, lang, generatedAt).toBlob((bl) => {
                  if (!bl) return
                  const u = URL.createObjectURL(bl)
                  const a = document.createElement('a')
                  a.href = u
                  a.download = 'robothon-rank-' + pop.row.rank + '.png'
                  a.click()
                  URL.revokeObjectURL(u)
                })
                setPop(null)
              }}
            >
              ⤓ &nbsp;{t('Download image', '下载图片')}
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
