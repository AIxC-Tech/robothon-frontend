import Window from '../Window'
import { useLang } from '../../context/LangContext'

const ITEMS: { d: { en: string; zh: string }; p: { en: string; zh: string } }[] = [
  {
    d: { en: '6.10（Wed)', zh: '6.10（周三）' },
    p: { en: 'Announcement; landing page opens for registration; code repo goes public.', zh: '官宣，落地页开放注册，代码仓库公开。' },
  },
  {
    d: { en: '6.10 – 6.15', zh: '6.10 – 6.15' },
    p: { en: 'Community and social channels open; warm-up events run; participants can start preparing.', zh: '社群、社媒开放并举办预热活动，可提前准备。' },
  },
  {
    d: { en: '6.16（Tue)', zh: '6.16（周二）' },
    p: { en: 'Contest officially begins; submission channel opens; hackathon launch event.', zh: '正式开赛，提交通道开启，黑客松发布会。' },
  },
  {
    d: { en: '6.16 – 6.21', zh: '6.16 – 6.21' },
    p: { en: 'Live leaderboard, daily picks, ranking broadcasts.', zh: '实时排行榜、每日精选、榜单播报。' },
  },
  {
    d: { en: '6.21 24:00', zh: '6.21 24:00' },
    p: { en: 'Submission deadline; leaderboard locked.', zh: '提交截止、封榜。' },
  },
  {
    d: { en: '6.22 20:00', zh: '6.22 20:00' },
    p: { en: 'Final judging complete; awards ceremony; monthly-series plans announced.', zh: '终审完成，颁奖发布会，月赛计划公布。' },
  },
]

export default function TimelineWindow() {
  const { lang, t } = useLang()
  return (
    <Window id="w-timeline" title="timeline.sched" bodyClassName="c ctext">
      <div className="winh">{t('Timeline', '日程')}</div>
      <p style={{ opacity: 0.7, marginBottom: 16 }}>{t('// All times are UTC+8', '// 所有时间均为 UTC+8')}</p>
      <div className="tl">
        {ITEMS.map((it, i) => (
          <div className="it" key={i}>
            <div className="d">{lang === 'zh' ? it.d.zh : it.d.en}</div>
            <p>{lang === 'zh' ? it.p.zh : it.p.en}</p>
          </div>
        ))}
      </div>
    </Window>
  )
}
