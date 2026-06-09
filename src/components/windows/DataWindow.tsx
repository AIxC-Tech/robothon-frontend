import Window from '../Window'
import { useLang } from '../../context/LangContext'
import { useWindows } from '../../context/WindowManager'

const FILES = [
  'mujoco_starter.zip   12.4M',
  'mjcf_examples/        ─',
  'sensor_logs.csv      804K',
  'reward_curve.npy     2.1M',
  'demo_template.mp4    18M',
  'README.md            6K',
]

export default function DataWindow() {
  const { t } = useLang()
  const wm = useWindows()
  return (
    <Window id="w-data" title="dl_data/manifest" bodyClassName="c ctext" bodyStyle={{ fontSize: '12.5px', lineHeight: 1.9 }}>
      <div className="winh">{t('DL Data', 'DL 数据')}</div>
      <div style={{ color: 'var(--ink)' }}>$ ls -la /root/dl_data</div>
      <div>
        {FILES.map((f, i) => (
          <div key={i}>{'drwxr-x  ' + f}</div>
        ))}
      </div>
      <div style={{ marginTop: 14 }}>
        <span className="actbtn" onClick={() => wm.open('w-register')}>
          {t('▸ Start Registration', '▸ 开始报名')}
        </span>
        <span className="actbtn" onClick={() => wm.open('w-leaderboard')}>
          {t('▸ Live Leaderboard', '▸ 实时排行榜')}
        </span>
      </div>
    </Window>
  )
}
