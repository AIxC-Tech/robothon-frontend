import Window from '../Window'
import { useLang } from '../../context/LangContext'

const RULES: { en: [string, string]; zh: [string, string] }[] = [
  {
    en: ['Theme', 'Build a MuJoCo-based robot simulator, task scenario or data-collection system; submit a runnable simulation task, interactive system or data-collection environment.'],
    zh: ['主题', '基于 MuJoCo 构建机器人仿真模拟器、任务场景或数据采集系统；提交一个可运行的模拟任务、交互系统或数据采集环境。'],
  },
  {
    en: ['Embodiment', 'Any embodiment: robotic arms, mobile robots, quadrupeds, humanoids, grippers, autonomous vehicles, dexterous / multi-finger hands, and more.'],
    zh: ['本体', '任意本体：机械臂、移动机器人、四足、人形、夹爪、无人车、灵巧手 / 多指机械手等。'],
  },
  {
    en: ['Eligibility', 'Any agent is allowed (Claude Code / Codex / Gemini CLI / Cursor / Kimi / your own, etc.); note the tools used on submission.'],
    zh: ['参赛资格', '任何 agent 均可（Claude Code / Codex / Gemini CLI / Cursor / Kimi / 自研等），提交时标注所用工具。'],
  },
  {
    en: ['Tech Stack', 'MuJoCo as the primary physics engine; make full use of MJCF, collisions, joints, sensors and actuators (one-line pip install, all platforms, no GPU).'],
    zh: ['技术栈', '以 MuJoCo 为主要物理仿真引擎，鼓励充分使用 MJCF、碰撞、关节、传感器、执行器（pip 一行安装、全平台、免 GPU）。'],
  },
  {
    en: ['Deliverables', 'Code repo + run instructions (dependencies / install / launch / controls) + MuJoCo scene & robot model + demo video (1–3 min, produced by running the submitted code) + project writeup.'],
    zh: ['提交物', '代码仓库 + 运行说明（依赖 / 安装 / 启动 / 操作方式）+ MuJoCo 场景与模型 + Demo 视频（1–3 分钟，由提交代码运行产生）+ 项目说明。'],
  },
  {
    en: ['Results', "A project's latest score counts (not its all-time best); anonymous submission allowed."],
    zh: ['成绩', '同一作品取最新成绩（非历史最高），可匿名提交。'],
  },
]

export default function RulesWindow() {
  const { lang, t } = useLang()
  return (
    <Window id="w-rules" title="rules.md" bodyClassName="c ctext">
      <div className="winh">{t('Robothon Rules', 'Robothon 规则')}</div>
      {RULES.map((r, i) => {
        const [h, body] = r[lang]
        return (
          <div key={i}>
            <h4>▸ {h}</h4>
            <p>{body}</p>
          </div>
        )
      })}
    </Window>
  )
}
