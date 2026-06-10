import { useEffect } from 'react'
import './styles/global.css'
import { LangProvider, useLang } from './context/LangContext'
import { WindowManagerProvider, useWindows } from './context/WindowManager'
import RadarBackground from './components/RadarBackground'
import AuthStrip from './components/AuthStrip'
import Countdown from './components/Countdown'
import Sidebar from './components/Sidebar'
import BottomBar from './components/BottomBar'

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

function Footer() {
  const { t } = useLang()
  return <div id="foot">{t('© 2026 FFAI Robothon · Embodied-AI Hackathon', '© 2026 FFAI Robothon · 具身智能黑客松')}</div>
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
  return (
    <LangProvider>
      <WindowManagerProvider>
        <AppShell />
      </WindowManagerProvider>
    </LangProvider>
  )
}
