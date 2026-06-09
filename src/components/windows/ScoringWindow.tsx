import Window from '../Window'
import { useLang } from '../../context/LangContext'

const ROWS: { en: [string, string]; zh: [string, string] }[] = [
  { en: ['Runnability', 'Whether the code runs smoothly and is easy to reproduce.'], zh: ['可运行性', '代码能否顺利运行、是否容易复现。'] },
  { en: ['MuJoCo Usage Depth', 'How thoroughly MJCF, physics simulation, collisions, joints, sensors and actuators are used.'], zh: ['MuJoCo 使用深度', '是否充分利用 MJCF、物理仿真、碰撞、关节、传感器、执行器。'] },
  { en: ['Task Design', 'Whether the task is clear, challenging and meaningful.'], zh: ['任务设计', '是否清晰、有挑战性、有现实意义。'] },
  { en: ['Control', 'Teleoperation, autonomous control, policy control, task planning or data-collection capability.'], zh: ['控制能力', '遥操、自动控制、策略控制、任务规划或数据采集能力。'] },
  { en: ['Dexterous Manipulation', 'If using a dexterous hand: multi-finger coordination, fine manipulation, high-DOF control.'], zh: ['灵巧操作', '若使用灵巧手，是否体现多指协调、精细操作、高自由度控制。'] },
  { en: ['Engineering Quality', 'Code structure, docs, configuration and asset management clarity.'], zh: ['工程质量', '代码结构、文档、配置与资源管理是否清晰。'] },
  { en: ['Presentation', 'Whether the demo video is intuitive and convincing.'], zh: ['展示效果', 'demo 视频是否直观、有说服力。'] },
  { en: ['Innovation', 'Novelty of the scenario, embodiment, task or application direction.'], zh: ['创新性', '场景、本体、任务或应用方向是否有新意。'] },
]

export default function ScoringWindow() {
  const { lang, t } = useLang()
  return (
    <Window id="w-scoring" title="scoring.cfg" bodyClassName="c ctext">
      <div className="winh">{t('Scoring Rubric', '评分标准')}</div>
      {ROWS.map((r, i) => {
        const [name, body] = r[lang]
        return (
          <div className="row" key={i}>
            <span className="k">{String(i + 1).padStart(2, '0')}</span>
            <span className="body">
              <b>{name}</b> — {body}
            </span>
          </div>
        )
      })}
      <p style={{ marginTop: 14, color: 'var(--ink)' }}>$ judges --anchor --median --avg</p>
      <p>
        {t(
          'All three AI judges (Claude / GPT / Gemini) receive an identical review package (demo video + code + README / writeup). Anchored absolute scoring, each judge called 3 times and the median taken, then averaged across the three for the leaderboard. Fixed temperature, latest score only, daily rate limit — no gaming the system.',
          '三家 AI 评审（Claude / GPT / Gemini）收到完全相同的评审包（Demo 视频 + 代码 + README / 项目说明）。锚定式绝对评分，每家独立调用 3 次取中位数，三家平均后上榜。温度固定、取最新成绩、每日限频——刷无可刷。',
        )}
      </p>
    </Window>
  )
}
