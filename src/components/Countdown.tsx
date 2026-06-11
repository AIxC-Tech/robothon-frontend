import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'

// 提交 6.17 00:00 (UTC+8) 开启；提交 6.22 24:00 (UTC+8) 截止
const REG_OPEN = Date.UTC(2026, 5, 16, 16, 0, 0) // 6.17 00:00 UTC+8 == 6.16 16:00 UTC
const REG_CLOSE = Date.UTC(2026, 5, 22, 16, 0, 0) // 6.22 24:00 UTC+8 == 6.22 16:00 UTC

export default function Countdown() {
  const { lang, t } = useLang()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(iv)
  }, [])

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const dd = Math.floor(s / 86400)
    const hh = Math.floor((s % 86400) / 3600)
    const mm = Math.floor((s % 3600) / 60)
    const ss = s % 60
    const p = (v: number) => String(v).padStart(2, '0')
    const u = lang === 'zh' ? ['天', '时', '分', '秒'] : ['d', 'h', 'm', 's']
    return `${dd}${u[0]} ${p(hh)}${u[1]} ${p(mm)}${u[2]} ${p(ss)}${u[3]}`
  }

  let label: string
  let time: string
  if (now < REG_OPEN) {
    // 提交尚未开启：倒数到提交开启
    label = t('Submissions open in', '距离提交开启')
    time = fmt(REG_OPEN - now)
  } else if (now < REG_CLOSE) {
    // 提交进行中：倒数到提交截止
    label = t('Submissions close in', '距离提交截止')
    time = fmt(REG_CLOSE - now)
  } else {
    label = t('Submissions closed', '提交已截止')
    time = '—'
  }

  return (
    <div id="counter">
      <div className="cd-label">{label}</div>
      <div className="cd-time">{time}</div>
    </div>
  )
}
