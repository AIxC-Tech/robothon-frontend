import Window from '../Window'
import FolderIcon from '../FolderIcon'
import { useLang } from '../../context/LangContext'
import { useWindows, type WinId } from '../../context/WindowManager'

const SCRIPTS: { en: string; zh: string; o: WinId }[] = [
  { en: 'DL Data', zh: 'DL 数据', o: 'w-data' },
  { en: 'Hash', zh: '哈希', o: 'w-decrypt' },
  { en: 'Terminal', zh: '终端', o: 'w-term' },
  { en: 'Decryptor', zh: '解密器', o: 'w-decrypt' },
  { en: 'Map', zh: '地图', o: 'w-plot' },
  { en: 'Rules', zh: '规则', o: 'w-rules' },
  { en: 'Scoring', zh: '评分', o: 'w-scoring' },
  { en: 'Prizes', zh: '奖金', o: 'w-prizes' },
  { en: 'Timeline', zh: '日程', o: 'w-timeline' },
  { en: 'FAQ', zh: '常见问题', o: 'w-faq' },
  { en: 'Register', zh: '报名', o: 'w-register' },
  { en: 'Project', zh: '项目', o: 'w-banner' },
  { en: 'Trace', zh: '追踪', o: 'w-trace' },
  { en: 'Leaderboard', zh: '排行榜', o: 'w-leaderboard' },
  { en: 'MuJoCo', zh: 'MuJoCo', o: 'w-rules' },
  { en: 'Dexterous', zh: '灵巧手', o: 'w-scoring' },
  { en: 'Teleop', zh: '遥操', o: 'w-rules' },
  { en: 'Data Capture', zh: '数据采集', o: 'w-rules' },
  { en: 'Deploy', zh: '部署', o: 'w-term' },
  { en: 'Random', zh: '随机', o: 'w-term' },
]

export default function ScriptsWindow() {
  const { lang } = useLang()
  const wm = useWindows()
  return (
    <Window id="w-scripts" title="/root/bash/scripts">
      <div className="grid">
        {SCRIPTS.map((s, i) => (
          <div className="fol" key={i} onClick={() => wm.open(s.o)}>
            <FolderIcon />
            <span>{lang === 'zh' ? s.zh : s.en}</span>
          </div>
        ))}
      </div>
    </Window>
  )
}
