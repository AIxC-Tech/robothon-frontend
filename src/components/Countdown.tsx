import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'

// submission closes 6.21 24:00 UTC+8 == 6.21 16:00 UTC
const DEADLINE = Date.UTC(2026, 5, 21, 16, 0, 0)

export default function Countdown() {
  const { lang, t } = useLang()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(iv)
  }, [])

  let time: string
  const diff = DEADLINE - now
  if (diff <= 0) {
    time = t('Closed', '已截止')
  } else {
    const s = Math.floor(diff / 1000)
    const dd = Math.floor(s / 86400)
    const hh = Math.floor((s % 86400) / 3600)
    const mm = Math.floor((s % 3600) / 60)
    const ss = s % 60
    const p = (v: number) => String(v).padStart(2, '0')
    const u = lang === 'zh' ? ['天', '时', '分', '秒'] : ['d', 'h', 'm', 's']
    time = `${dd}${u[0]} ${p(hh)}${u[1]} ${p(mm)}${u[2]} ${p(ss)}${u[3]}`
  }

  return (
    <div id="counter">
      <div className="cd-label">{t('Submission closes in', '距提交截止')}</div>
      <div className="cd-time">{time}</div>
    </div>
  )
}
