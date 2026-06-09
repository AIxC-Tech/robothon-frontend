import Window from '../Window'
import { useLang } from '../../context/LangContext'
import { useWindows } from '../../context/WindowManager'

export default function HeroWindow() {
  const { t } = useLang()
  const wm = useWindows()
  return (
    <Window id="w-hero" title="welcome.exe" closable={false}>
      <div className="hk">FFAI ROBOTHON SUMMER 2026</div>
      <div className="hh">AI + EAI?</div>
      <div className="ht">
        {t(
          'Train smarter robots in MuJoCo with AI agents — ranked by an AI judging panel, competing for the ',
          '用 AI agent 在 MuJoCo 里训练更聪明的机器人，AI 评审团评分后排名，赢取 ',
        )}
        <span className="amt">8,000 USDC</span>
        {t(' prize pool.', ' 奖池。')}
      </div>
      <div className="hb">
        <a className="hbtn primary" href="https://discord.gg/" target="_blank" rel="noreferrer">
          {t('Developer Community', '开发者社群')}
        </a>
        <a className="hbtn ghost" onClick={() => wm.open('w-leaderboard')}>
          {t('Live Leaderboard', '实时排行榜')}
        </a>
      </div>
    </Window>
  )
}
