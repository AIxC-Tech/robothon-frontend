import { useState } from 'react'
import Window from '../Window'
import { useLang } from '../../context/LangContext'

const FAQS: { en: [string, string]; zh: [string, string] }[] = [
  {
    en: ['What is this contest?', 'A MuJoCo-based robot-simulation hackathon: build a simulator, task scenario or data-collection system with MuJoCo, get scored by three AI judges against the official rubric, and climb the live leaderboard.'],
    zh: ['这是什么比赛？', '基于 MuJoCo 的机器人仿真黑客松：用 MuJoCo 构建仿真器、任务场景或数据采集系统，由三家 AI 评审按官方标准打分并登上实时排行榜。'],
  },
  { en: ['Who can take part?', 'Anyone — developers, researchers and enthusiasts all welcome.'], zh: ['谁可以参加？', '任何人都可以，欢迎开发者、研究者与爱好者。'] },
  { en: ['Is there a fee?', 'Completely free.'], zh: ['收费吗？', '完全免费。'] },
  { en: ['Can I participate remotely?', 'Fully online — submit remotely, no need to attend in person.'], zh: ['可以远程参加吗？', '全程线上，远程提交即可，无需到场。'] },
  { en: ['What environment do I need?', 'MuJoCo is the primary physics engine — one-line pip install, all platforms, no GPU required.'], zh: ['需要什么环境？', '以 MuJoCo 为主要物理仿真引擎——一行 pip 安装、全平台、免 GPU。'] },
  {
    en: ['What directions can I work on?', 'Recommended directions: complex teleop (keyboard / gamepad / VR / motion capture), long-horizon tasks (navigation / grasping / transport / assembly / door-opening / tidying), data collection, dexterous-hand manipulation, and real-world scenarios (K-12 / security / home service / warehouse logistics / industrial inspection) — plus any creative MuJoCo robot-simulation project. Dexterous-hand work is especially encouraged.'],
    zh: ['可以做哪些方向？', '推荐方向：复杂遥操（键盘 / 手柄 / VR / 动捕）、长程任务（导航 / 抓取 / 搬运 / 装配 / 开门 / 整理）、数据采集、灵巧手操作、实际场景（K12 / 安防 / 家庭服务 / 仓储物流 / 工业巡检），也欢迎任意有创意的 MuJoCo 机器人仿真项目。特别鼓励灵巧手方向。'],
  },
  {
    en: ['What robots can I use?', 'Any embodiment: robotic arms, mobile robots, quadrupeds, humanoids, grippers, autonomous vehicles, dexterous / multi-finger hands, and more.'],
    zh: ['可以用哪些机器人？', '任意本体：机械臂、移动机器人、四足、人形、夹爪、无人车、灵巧手 / 多指机械手等。'],
  },
  {
    en: ['How do I submit?', 'Submit: code repo + run instructions (dependencies / install / launch / controls) + MuJoCo scene & robot model + a 1–3 min demo video (produced by running the submitted code) + a project writeup (name / embodiment / task goal / approach / core features / highlights / limitations & future work). The latest submission of a project is the one that counts.'],
    zh: ['怎么提交作品？', '提交：代码仓库 + 运行说明（依赖 / 安装 / 启动 / 操作方式）+ MuJoCo 场景与机器人模型 + 1–3 分钟 Demo 视频（由提交代码运行产生）+ 项目说明（项目名 / 机器人本体 / 任务目标 / 技术方案 / 核心功能 / 亮点 / 限制与未来改进）。同一作品以最新提交为准。'],
  },
  {
    en: ['What tools can I use?', 'Any agent (Claude Code / Codex / Gemini CLI / Cursor / Kimi / your own…), note them on submission; anonymous submission allowed.'],
    zh: ['可以用哪些工具？', '任意 agent（Claude Code / Codex / Gemini CLI / Cursor / Kimi / 自研…），提交时标注；可匿名提交。'],
  },
  {
    en: ['How is it scored?', "Three AI judges (Claude / GPT / Gemini) give anchored scores across 8 dimensions: runnability, MuJoCo usage depth, task design, control, dexterous manipulation, engineering quality, presentation and innovation; each judge's median is taken, then averaged across the three for the total."],
    zh: ['怎么评分？', '三家 AI 评审（Claude / GPT / Gemini）按 8 个维度锚定式打分：可运行性、MuJoCo 使用深度、任务设计、控制能力、灵巧操作、工程质量、展示效果、创新性；每家取中位数后三家平均得出总分。'],
  },
  {
    en: ['How do I register?', 'No form to fill in — just chat in the “AI Registration Assistant” window to finish registering.'],
    zh: ['怎么报名？', '不用填表——直接在「AI 报名助手」窗口对话即可完成。'],
  },
]

export default function FaqWindow() {
  const { lang, t } = useLang()
  const [open, setOpen] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <Window id="w-faq" title="help/faq.txt" bodyClassName="c ctext">
      <div className="winh">{t('FAQ', '常见问题')}</div>
      {FAQS.map((item, i) => {
        const [q, a] = item[lang]
        const isOpen = open.has(i)
        return (
          <div key={i}>
            <div className="q" onClick={() => toggle(i)}>
              {q}
              <span className="pl">{isOpen ? '−' : '+'}</span>
            </div>
            <div className={`a-txt${isOpen ? ' show' : ''}`}>{a}</div>
          </div>
        )
      })}
    </Window>
  )
}
