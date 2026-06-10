import { useLang } from '../context/LangContext'
import { useWindows, type WinId } from '../context/WindowManager'
import FolderIcon from './FolderIcon'

const ITEMS: { en: string; zh: string; o: WinId }[] = [
  { en: 'Register', zh: '报名', o: 'w-register' },
  { en: 'Rules', zh: '规则', o: 'w-rules' },
  { en: 'Scoring', zh: '评分', o: 'w-scoring' },
  { en: 'Prizes', zh: '奖金', o: 'w-prizes' },
  { en: 'Timeline', zh: '日程', o: 'w-timeline' },
  { en: 'FAQ', zh: '常见问题', o: 'w-faq' },
  { en: 'Cases', zh: '案例', o: 'w-cases' },
  // Leaderboard 入口暂时隐藏（如需恢复，取消下一行注释）
  // { en: 'Leaderboard', zh: '排行榜', o: 'w-leaderboard' },
]

export default function Sidebar() {
  const { lang } = useLang()
  const wm = useWindows()
  return (
    <div id="side">
      {ITEMS.map((s) => (
        <div key={s.o} className="sfol" onClick={() => wm.open(s.o)}>
          <FolderIcon />
          <div>{lang === 'zh' ? s.zh : s.en}</div>
        </div>
      ))}
    </div>
  )
}
