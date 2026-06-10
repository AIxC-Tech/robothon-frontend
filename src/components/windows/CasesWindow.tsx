import Window from '../Window'
import { useLang } from '../../context/LangContext'
import { useWindows } from '../../context/WindowManager'

export default function CasesWindow() {
  const { t } = useLang()
  const wm = useWindows()
  return (
    <Window id="w-cases" title="cases">
      <div className="winh">{t('Showcase', '演示案例')}</div>
      <div className="caserow" onClick={() => wm.open('w-dexhand')}>
        <span className="caseic">▶</span>
        <div>
          <div className="casename">{t('Dexterous Hand', '灵巧手')}</div>
          <div className="casedesc">dexterous_hand_demo.mp4</div>
        </div>
      </div>
    </Window>
  )
}
