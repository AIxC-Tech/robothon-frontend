import { useEffect } from 'react'
import './styles/global.css'
import { LangProvider, useLang } from './context/LangContext'
import { WindowManagerProvider, useWindows } from './context/WindowManager'
import RadarBackground from './components/RadarBackground'
import AuthStrip from './components/AuthStrip'
import Countdown from './components/Countdown'
import Sidebar from './components/Sidebar'
import BottomBar from './components/BottomBar'
import OfficialRules from './components/OfficialRules'

import HeroWindow from './components/windows/HeroWindow'
import BannerWindow from './components/windows/BannerWindow'
import RulesWindow from './components/windows/RulesWindow'
import ScoringWindow from './components/windows/ScoringWindow'
import PrizesWindow from './components/windows/PrizesWindow'
import TimelineWindow from './components/windows/TimelineWindow'
import FaqWindow from './components/windows/FaqWindow'
import LeaderboardWindow from './components/windows/LeaderboardWindow'
import CasesWindow from './components/windows/CasesWindow'
import RegisterWindow from './components/windows/RegisterWindow'
import PlotWindow from './components/windows/PlotWindow'
import TerminalWindow from './components/windows/TerminalWindow'
import TraceWindow from './components/windows/TraceWindow'
import DexHandWindow from './components/windows/DexHandWindow'
import ScriptsWindow from './components/windows/ScriptsWindow'
import DecryptWindow from './components/windows/DecryptWindow'
import DataWindow from './components/windows/DataWindow'

// Privacy Policy lives on the Official Rules page (Privacy section); the docx
// [PRIVACY POLICY URL] points to robothon.ff.com/official-rules per the organizer.
const PRIVACY_POLICY_URL = '/official-rules#privacy'

function Footer() {
  const { t } = useLang()
  return (
    <div id="foot">
      <span>{t('© 2026 FFAI Robothon · Embodied-AI Hackathon', '© 2026 FFAI Robothon · 具身智能黑客松')}</span>
      <span className="foot-links">
        <a href="/official-rules">{t('Official Rules', '官方规则')}</a>
        <span className="foot-sep">·</span>
        <a href={PRIVACY_POLICY_URL}>{t('Privacy Policy', '隐私政策')}</a>
      </span>
    </div>
  )
}

function AppShell() {
  const wm = useWindows()

  // open the welcome popup on load (matches original openWin('w-hero'))
  useEffect(() => {
    wm.open('w-hero')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <RadarBackground />
      <AuthStrip />
      <div id="topright">
        <Countdown />
      </div>

      <div id="app" style={{ position: 'relative', minHeight: wm.pageMinHeight ? wm.pageMinHeight : '100vh' }}>
        {/* page-layout windows (centered, stacked) */}
        <HeroWindow />
        <RegisterWindow />
        <RulesWindow />
        <ScoringWindow />
        <PrizesWindow />
        <TimelineWindow />
        <FaqWindow />
        <LeaderboardWindow />
        <CasesWindow />
        {/* free-floating desktop windows */}
        <BannerWindow />
        <PlotWindow />
        <TerminalWindow />
        <TraceWindow />
        <DexHandWindow />
        <ScriptsWindow />
        <DecryptWindow />
        <DataWindow />
      </div>

      <Sidebar />
      <Footer />
      <BottomBar />

      <div id="grant" className="hide">
        <span>
          ACCESS
          <br />
          GRANTED
        </span>
      </div>
      <div className="vig" />
    </>
  )
}

export default function App() {
  // Lightweight routing: the standalone Official Rules page lives at a stable URL
  // (must stay reachable during the Contest and for 1 year after). No router lib —
  // vercel.json rewrites /official-rules to index.html and we branch on the path.
  const path = window.location.pathname.replace(/\/+$/, '')
  const isOfficialRules = path === '/official-rules'

  return (
    <LangProvider>
      {isOfficialRules ? (
        <OfficialRules />
      ) : (
        <WindowManagerProvider>
          <AppShell />
        </WindowManagerProvider>
      )}
    </LangProvider>
  )
}
