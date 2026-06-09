import Window from '../Window'
import { useLang } from '../../context/LangContext'

export default function BannerWindow() {
  const { t } = useLang()
  return (
    <Window id="w-banner" title="project_brief.exe">
      <div className="banner-grad" />
      <div className="banner-grid" />
      <div className="banner-fg">
        <h1>FFAI ROBOTHON</h1>
        <div className="sub">{t('SUMMER 2026 · MuJoCo Embodied-AI Program', '2026 夏季 · MuJoCo 具身智能计划')}</div>
        <div className="usdc">
          {t('Total pool', '总奖池')} &nbsp; <b>8,000 USDC</b> &nbsp;{t('· 11 slots · 3×AI judges', '· 11 名额 · 3×AI 评审')}
        </div>
      </div>
      <svg className="robot" viewBox="0 0 100 110">
        <rect x="28" y="20" width="44" height="38" rx="5" fill="none" stroke="#c98a7d" strokeWidth="2.5" />
        <circle cx="42" cy="38" r="5" fill="#c98a7d" />
        <circle cx="58" cy="38" r="5" fill="#c98a7d" />
        <line x1="50" y1="20" x2="50" y2="8" stroke="#c98a7d" strokeWidth="2.5" />
        <circle cx="50" cy="6" r="3" fill="#c98a7d" />
        <rect x="36" y="60" width="28" height="30" rx="3" fill="none" stroke="#c98a7d" strokeWidth="2.5" />
        <line x1="28" y1="64" x2="16" y2="80" stroke="#c98a7d" strokeWidth="2.5" />
        <line x1="72" y1="64" x2="84" y2="80" stroke="#c98a7d" strokeWidth="2.5" />
        <line x1="44" y1="90" x2="44" y2="104" stroke="#c98a7d" strokeWidth="2.5" />
        <line x1="56" y1="90" x2="56" y2="104" stroke="#c98a7d" strokeWidth="2.5" />
      </svg>
    </Window>
  )
}
