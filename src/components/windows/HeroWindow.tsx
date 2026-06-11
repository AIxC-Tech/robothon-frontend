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
          'You bring the idea, an AI agent builds you a working robot in MuJoCo. An AI judging panel scores and ranks them, and the winners split the ',
          '你出想法，AI agent 帮你在 MuJoCo 里搭出一个能动的机器人。AI 评审团评分排名，优胜者瓜分 ',
        )}
        <span className="amt">8,000 USDC</span>
        {t(' prize pool.', ' 奖池。')}
      </div>
      <div className="hb">
        <a className="hbtn primary" onClick={() => wm.open('w-register')}>
          {t('Register', '报名')}
        </a>
        <a className="hbtn ghost" href="https://discord.gg/77FudM2XwM" target="_blank" rel="noreferrer">
          {t('Developer Community', '开发者社群')}
        </a>
      </div>
    </Window>
  )
}
