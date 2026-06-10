# FFAI Robothon 文案审阅清单

> 这是面向产品经理的**文案审阅清单**。请直接在表格的 **English** / **中文** 两列上修改文字；改完把本文件发回，开发会把改动回填到代码里。
>
> **修改时请注意：**
> - 不要改动 `${...}` 占位符（如 `${n}`、`${id}`、`${v}`），它们是运行时会被替换的变量。
> - 不要改 USDC 金额数字（如 `8,000`、`3,000`、`/100`）、名额数字、日期时间（如 `6.16`、`24:00`）。
> - 保留 emoji（如 `✓`、`🔒`）、特殊符号（如 `·`、`▸`、`★`、`▶`、`−` / `+`）和前后空格——它们影响排版。
> - 表格单元格内如果本身含有 `|`，已用 `\|` 转义；含换行用 `<br>` 表示。
> - 一处文案若 English / 中文 都要改，请两列一起改，保持对应。

---

## 左上角品牌栏 (AuthStrip)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| AuthStrip.tsx:63 | Summer 2026 | 2026 夏季 |
| AuthStrip.tsx:67 | Registration Open | 报名进行中 |
| AuthStrip.tsx:68 |  · 8,000 USDC pool |  · 8,000 USDC 奖池 |

固定品牌名（无需翻译，仅供参考）：`FFAI Robothon`（AuthStrip.tsx:62）

## 右上角倒计时 (Countdown)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| Countdown.tsx:24 | d / h / m / s（时间单位：天/时/分/秒） | 天 / 时 / 分 / 秒 |
| Countdown.tsx:32 | Registration opens in | 距离报名开始 |
| Countdown.tsx:36 | Registration closes in | 距离报名截止 |
| Countdown.tsx:39 | Registration closed | 报名已截止 |

## 欢迎窗口 Hero (HeroWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| HeroWindow.tsx:9 | welcome.exe（窗口标题栏） | welcome.exe |
| HeroWindow.tsx:10 | FFAI ROBOTHON SUMMER 2026 | FFAI ROBOTHON SUMMER 2026 |
| HeroWindow.tsx:11 | AI + EAI? | AI + EAI? |
| HeroWindow.tsx:14 | Train smarter robots in MuJoCo with AI agents — ranked by an AI judging panel, competing for the  | 用 AI agent 在 MuJoCo 里训练更聪明的机器人，AI 评审团评分后排名，赢取  |
| HeroWindow.tsx:17 | 8,000 USDC | 8,000 USDC |
| HeroWindow.tsx:18 |  prize pool. |  奖池。 |
| HeroWindow.tsx:23 | Developer Community | 开发者社群 |
| HeroWindow.tsx:25 | Live Leaderboard | 实时排行榜 |

## 项目简介横幅 Banner (BannerWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| BannerWindow.tsx:7 | project_brief.exe（窗口标题栏） | project_brief.exe |
| BannerWindow.tsx:11 | FFAI ROBOTHON | FFAI ROBOTHON |
| BannerWindow.tsx:12 | SUMMER 2026 · MuJoCo Embodied-AI Program | 2026 夏季 · MuJoCo 具身智能计划 |
| BannerWindow.tsx:14 | Total pool | 总奖池 |
| BannerWindow.tsx:14 | 8,000 USDC | 8,000 USDC |
| BannerWindow.tsx:14 | · 11 slots · 3×AI judges | · 11 名额 · 3×AI 评审 |

## 规则 Rules (RulesWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| RulesWindow.tsx:34 | rules.md（窗口标题栏） | rules.md |
| RulesWindow.tsx:35 | Robothon Rules | Robothon 规则 |
| RulesWindow.tsx:6 | Theme | 主题 |
| RulesWindow.tsx:6 | Build a MuJoCo-based robot simulator, task scenario or data-collection system; submit a runnable simulation task, interactive system or data-collection environment. | 基于 MuJoCo 构建机器人仿真模拟器、任务场景或数据采集系统；提交一个可运行的模拟任务、交互系统或数据采集环境。 |
| RulesWindow.tsx:10 | Embodiment | 本体 |
| RulesWindow.tsx:10 | Any embodiment: robotic arms, mobile robots, quadrupeds, humanoids, grippers, autonomous vehicles, dexterous / multi-finger hands, and more. | 任意本体：机械臂、移动机器人、四足、人形、夹爪、无人车、灵巧手 / 多指机械手等。 |
| RulesWindow.tsx:14 | Eligibility | 参赛资格 |
| RulesWindow.tsx:14 | Any agent is allowed (Claude Code / Codex / Gemini CLI / Cursor / Kimi / your own, etc.); note the tools used on submission. | 任何 agent 均可（Claude Code / Codex / Gemini CLI / Cursor / Kimi / 自研等），提交时标注所用工具。 |
| RulesWindow.tsx:18 | Tech Stack | 技术栈 |
| RulesWindow.tsx:18 | MuJoCo as the primary physics engine; make full use of MJCF, collisions, joints, sensors and actuators (one-line pip install, all platforms, no GPU). | 以 MuJoCo 为主要物理仿真引擎，鼓励充分使用 MJCF、碰撞、关节、传感器、执行器（pip 一行安装、全平台、免 GPU）。 |
| RulesWindow.tsx:22 | Deliverables | 提交物 |
| RulesWindow.tsx:22 | Code repo + run instructions (dependencies / install / launch / controls) + MuJoCo scene & robot model + demo video (1–3 min, produced by running the submitted code) + project writeup. | 代码仓库 + 运行说明（依赖 / 安装 / 启动 / 操作方式）+ MuJoCo 场景与模型 + Demo 视频（1–3 分钟，由提交代码运行产生）+ 项目说明。 |
| RulesWindow.tsx:26 | Results | 成绩 |
| RulesWindow.tsx:26 | A project's latest score counts (not its all-time best); anonymous submission allowed. | 同一作品取最新成绩（非历史最高），可匿名提交。 |

## 评分 Scoring (ScoringWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| ScoringWindow.tsx:18 | scoring.cfg（窗口标题栏） | scoring.cfg |
| ScoringWindow.tsx:19 | Scoring Rubric | 评分标准 |
| ScoringWindow.tsx:5 | Runnability | 可运行性 |
| ScoringWindow.tsx:5 | Whether the code runs smoothly and is easy to reproduce. | 代码能否顺利运行、是否容易复现。 |
| ScoringWindow.tsx:6 | MuJoCo Usage Depth | MuJoCo 使用深度 |
| ScoringWindow.tsx:6 | How thoroughly MJCF, physics simulation, collisions, joints, sensors and actuators are used. | 是否充分利用 MJCF、物理仿真、碰撞、关节、传感器、执行器。 |
| ScoringWindow.tsx:7 | Task Design | 任务设计 |
| ScoringWindow.tsx:7 | Whether the task is clear, challenging and meaningful. | 是否清晰、有挑战性、有现实意义。 |
| ScoringWindow.tsx:8 | Control | 控制能力 |
| ScoringWindow.tsx:8 | Teleoperation, autonomous control, policy control, task planning or data-collection capability. | 遥操、自动控制、策略控制、任务规划或数据采集能力。 |
| ScoringWindow.tsx:9 | Dexterous Manipulation | 灵巧操作 |
| ScoringWindow.tsx:9 | If using a dexterous hand: multi-finger coordination, fine manipulation, high-DOF control. | 若使用灵巧手，是否体现多指协调、精细操作、高自由度控制。 |
| ScoringWindow.tsx:10 | Engineering Quality | 工程质量 |
| ScoringWindow.tsx:10 | Code structure, docs, configuration and asset management clarity. | 代码结构、文档、配置与资源管理是否清晰。 |
| ScoringWindow.tsx:11 | Presentation | 展示效果 |
| ScoringWindow.tsx:11 | Whether the demo video is intuitive and convincing. | demo 视频是否直观、有说服力。 |
| ScoringWindow.tsx:12 | Innovation | 创新性 |
| ScoringWindow.tsx:12 | Novelty of the scenario, embodiment, task or application direction. | 场景、本体、任务或应用方向是否有新意。 |
| ScoringWindow.tsx:33 | All three AI judges (Claude / GPT / Gemini) receive an identical review package (demo video + code + README / writeup). Anchored absolute scoring, each judge called 3 times and the median taken, then averaged across the three for the leaderboard. Fixed temperature, latest score only, daily rate limit — no gaming the system. | 三家 AI 评审（Claude / GPT / Gemini）收到完全相同的评审包（Demo 视频 + 代码 + README / 项目说明）。锚定式绝对评分，每家独立调用 3 次取中位数，三家平均后上榜。温度固定、取最新成绩、每日限频——刷无可刷。 |

注：ScoringWindow.tsx:31 有一行技术装饰文本 `$ judges --anchor --median --avg`（伪命令，一般无需改）。

## 奖金 Prizes (PrizesWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| PrizesWindow.tsx:17 | prizes.json（窗口标题栏） | prizes.json |
| PrizesWindow.tsx:18 | Prize Breakdown | 奖金分配 |
| PrizesWindow.tsx:20 | Total pool  | 总奖池  |
| PrizesWindow.tsx:22 |  · 11 winning slots in total. Ranking prizes are by total score; special prizes are decided independently by the judges. |  · 共 11 名额。名次奖按总分产生；特别奖由评审团独立评出。 |
| PrizesWindow.tsx:30 | Award | 奖项 |
| PrizesWindow.tsx:31 | Slots | 名额 |
| PrizesWindow.tsx:32 | Amount | 金额 |
| PrizesWindow.tsx:33 | Subtotal | 小计 |
| PrizesWindow.tsx:5 | 1st Place | 冠军 |
| PrizesWindow.tsx:6 | 2nd Place | 亚军 |
| PrizesWindow.tsx:7 | 3rd Place | 季军 |
| PrizesWindow.tsx:8 | Excellence Award (4th–8th) | 优秀作品奖（第4–8名） |
| PrizesWindow.tsx:9 | Best Beginner Project | 最佳零基础作品 |
| PrizesWindow.tsx:10 | Best Human-AI Collaboration Log | 最佳人机共创记录 |
| PrizesWindow.tsx:11 | Judges' Most-Impressed Award | 评审团最惊叹奖 |
| PrizesWindow.tsx:46 | Total | 合计 |

注：奖金金额列（3,000 / 1,500 / 800 / 300 / 400 等）与名额数字、合计 8,000 不在此清单，请勿改动。

## 日程 Timeline (TimelineWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| TimelineWindow.tsx:34 | timeline.sched（窗口标题栏） | timeline.sched |
| TimelineWindow.tsx:35 | Timeline | 日程 |
| TimelineWindow.tsx:36 | // All times are UTC+8 | // 所有时间均为 UTC+8 |
| TimelineWindow.tsx:6 | 6.10（Wed) | 6.10（周三） |
| TimelineWindow.tsx:7 | Announcement; landing page opens for registration; code repo goes public. | 官宣，落地页开放注册，代码仓库公开。 |
| TimelineWindow.tsx:11 | 6.10 – 6.15 | 6.10 – 6.15 |
| TimelineWindow.tsx:11 | Community and social channels open; warm-up events run; participants can start preparing. | 社群、社媒开放并举办预热活动，可提前准备。 |
| TimelineWindow.tsx:14 | 6.16（Tue) | 6.16（周二） |
| TimelineWindow.tsx:15 | Contest officially begins; submission channel opens; hackathon launch event. | 正式开赛，提交通道开启，黑客松发布会。 |
| TimelineWindow.tsx:18 | 6.16 – 6.21 | 6.16 – 6.21 |
| TimelineWindow.tsx:19 | Live leaderboard, daily picks, ranking broadcasts. | 实时排行榜、每日精选、榜单播报。 |
| TimelineWindow.tsx:22 | 6.21 24:00 | 6.21 24:00 |
| TimelineWindow.tsx:23 | Submission deadline; leaderboard locked. | 提交截止、封榜。 |
| TimelineWindow.tsx:26 | 6.22 20:00 | 6.22 20:00 |
| TimelineWindow.tsx:27 | Final judging complete; awards ceremony; monthly-series plans announced. | 终审完成，颁奖发布会，月赛计划公布。 |

## FAQ (FaqWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| FaqWindow.tsx:53 | help/faq.txt（窗口标题栏） | help/faq.txt |
| FaqWindow.tsx:54 | FAQ | 常见问题 |
| FaqWindow.tsx:7 | What is this contest? | 这是什么比赛？ |
| FaqWindow.tsx:7 | A MuJoCo-based robot-simulation hackathon: build a simulator, task scenario or data-collection system with MuJoCo, get scored by three AI judges against the official rubric, and climb the live leaderboard. | 基于 MuJoCo 的机器人仿真黑客松：用 MuJoCo 构建仿真器、任务场景或数据采集系统，由三家 AI 评审按官方标准打分并登上实时排行榜。 |
| FaqWindow.tsx:10 | Who can take part? | 谁可以参加？ |
| FaqWindow.tsx:10 | Anyone — developers, researchers and enthusiasts all welcome. | 任何人都可以，欢迎开发者、研究者与爱好者。 |
| FaqWindow.tsx:11 | Is there a fee? | 收费吗？ |
| FaqWindow.tsx:11 | Completely free. | 完全免费。 |
| FaqWindow.tsx:12 | Can I participate remotely? | 可以远程参加吗？ |
| FaqWindow.tsx:12 | Fully online — submit remotely, no need to attend in person. | 全程线上，远程提交即可，无需到场。 |
| FaqWindow.tsx:13 | What environment do I need? | 需要什么环境？ |
| FaqWindow.tsx:13 | MuJoCo is the primary physics engine — one-line pip install, all platforms, no GPU required. | 以 MuJoCo 为主要物理仿真引擎——一行 pip 安装、全平台、免 GPU。 |
| FaqWindow.tsx:15 | What directions can I work on? | 可以做哪些方向？ |
| FaqWindow.tsx:15 | Recommended directions: complex teleop (keyboard / gamepad / VR / motion capture), long-horizon tasks (navigation / grasping / transport / assembly / door-opening / tidying), data collection, dexterous-hand manipulation, and real-world scenarios (K-12 / security / home service / warehouse logistics / industrial inspection) — plus any creative MuJoCo robot-simulation project. Dexterous-hand work is especially encouraged. | 推荐方向：复杂遥操（键盘 / 手柄 / VR / 动捕）、长程任务（导航 / 抓取 / 搬运 / 装配 / 开门 / 整理）、数据采集、灵巧手操作、实际场景（K12 / 安防 / 家庭服务 / 仓储物流 / 工业巡检），也欢迎任意有创意的 MuJoCo 机器人仿真项目。特别鼓励灵巧手方向。 |
| FaqWindow.tsx:19 | What robots can I use? | 可以用哪些机器人？ |
| FaqWindow.tsx:19 | Any embodiment: robotic arms, mobile robots, quadrupeds, humanoids, grippers, autonomous vehicles, dexterous / multi-finger hands, and more. | 任意本体：机械臂、移动机器人、四足、人形、夹爪、无人车、灵巧手 / 多指机械手等。 |
| FaqWindow.tsx:23 | How do I submit? | 怎么提交作品？ |
| FaqWindow.tsx:23 | Submit: code repo + run instructions (dependencies / install / launch / controls) + MuJoCo scene & robot model + a 1–3 min demo video (produced by running the submitted code) + a project writeup (name / embodiment / task goal / approach / core features / highlights / limitations & future work). The latest submission of a project is the one that counts. | 提交：代码仓库 + 运行说明（依赖 / 安装 / 启动 / 操作方式）+ MuJoCo 场景与机器人模型 + 1–3 分钟 Demo 视频（由提交代码运行产生）+ 项目说明（项目名 / 机器人本体 / 任务目标 / 技术方案 / 核心功能 / 亮点 / 限制与未来改进）。同一作品以最新提交为准。 |
| FaqWindow.tsx:27 | What tools can I use? | 可以用哪些工具？ |
| FaqWindow.tsx:27 | Any agent (Claude Code / Codex / Gemini CLI / Cursor / Kimi / your own…), note them on submission; anonymous submission allowed. | 任意 agent（Claude Code / Codex / Gemini CLI / Cursor / Kimi / 自研…），提交时标注；可匿名提交。 |
| FaqWindow.tsx:31 | How is it scored? | 怎么评分？ |
| FaqWindow.tsx:31 | Three AI judges (Claude / GPT / Gemini) give anchored scores across 8 dimensions: runnability, MuJoCo usage depth, task design, control, dexterous manipulation, engineering quality, presentation and innovation; each judge's median is taken, then averaged across the three for the total. | 三家 AI 评审（Claude / GPT / Gemini）按 8 个维度锚定式打分：可运行性、MuJoCo 使用深度、任务设计、控制能力、灵巧操作、工程质量、展示效果、创新性；每家取中位数后三家平均得出总分。 |
| FaqWindow.tsx:35 | How do I register? | 怎么报名？ |
| FaqWindow.tsx:35 | No form to fill in — just chat in the “AI Registration Assistant” window to finish registering. | 不用填表——直接在「AI 报名助手」窗口对话即可完成。 |

## 排行榜 Leaderboard (LeaderboardWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| LeaderboardWindow.tsx:411 | live_leaderboard.feed（窗口标题栏） | live_leaderboard.feed |
| LeaderboardWindow.tsx:412 | Live Leaderboard | 实时排行榜 |
| LeaderboardWindow.tsx:415 |  · top submissions · scored /100 |  · 热门提交 · 总分 /100 |
| LeaderboardWindow.tsx:429 | You | 你 |
| LeaderboardWindow.tsx:443 |  /100（每行分数后缀） |  /100 |
| LeaderboardWindow.tsx:455 | ▸ Open full leaderboard | ▸ 展开完整排行榜 |
| LeaderboardWindow.tsx:470 | Share on X | 分享到 X |
| LeaderboardWindow.tsx:486 | Download image | 下载图片 |

### 排行榜示例数据（FALLBACK_ROWS，后端不可用时的占位数据）

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| LeaderboardWindow.tsx:23 | Team Tendon（队名） | Team Tendon |
| LeaderboardWindow.tsx:24 | Improvised dance choreography for a quadruped, driven by language commands | 用语言指令让四足机器人即兴编排舞蹈 |
| LeaderboardWindow.tsx:24 | Champion · 3,000 USDC | 冠军 · 3,000 USDC |
| LeaderboardWindow.tsx:28 | soft-gripper（队名） | soft-gripper |
| LeaderboardWindow.tsx:29 | Adaptive grasping — infers object fragility from a sentence and tunes grip force | 自适应抓取：从一句话推断物体易碎度并调整夹爪力度 |
| LeaderboardWindow.tsx:31 | Runner-up · 1,500 USDC | 亚军 · 1,500 USDC |
| LeaderboardWindow.tsx:35 | Anonymous 🔒（队名） | 匿名选手 🔒 |
| LeaderboardWindow.tsx:36 | Multi-agent transport: three robotic arms self-negotiate the division of labor | 多智能体协作搬运：三台机械臂自协商分工 |
| LeaderboardWindow.tsx:38 | 3rd · 800 USDC | 季军 · 800 USDC |
| LeaderboardWindow.tsx:42 | GraspGPT（队名） | GraspGPT |
| LeaderboardWindow.tsx:43 | Desktop-tidying robot that understands “put away the red ones” and executes it | 桌面整理机器人：听懂‘把红色的收起来’并执行 |
| LeaderboardWindow.tsx:45 | Excellence · 300 USDC | 优秀作品奖 · 300 USDC |
| LeaderboardWindow.tsx:49 | BalanceBot（队名） | BalanceBot |
| LeaderboardWindow.tsx:50 | Inverted-pendulum robot switches its balance strategy in real time from audience shouts | 倒立摆机器人根据观众喊话实时切换平衡策略 |
| LeaderboardWindow.tsx:52 | Excellence · 300 USDC | 优秀作品奖 · 300 USDC |
| LeaderboardWindow.tsx:56 | Hexapod Buddy（队名） | 六足同学 |
| LeaderboardWindow.tsx:57 | Hexapod re-plans its gait after injury (language-triggered fault injection) | 六足机器人受伤后自我重规划步态（语言触发故障注入） |
| LeaderboardWindow.tsx:60 | Excellence · 300 USDC | 优秀作品奖 · 300 USDC |
| LeaderboardWindow.tsx:61 | ★ Best Human-AI Log · 400 USDC | ★ 最佳人机共创记录 · 400 USDC |

### 分享卡片 / 分享文案 (drawCard + shareText)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| LeaderboardWindow.tsx:79 | （仅中文分享文案）#${r.rank} ${r.name} — ${r.score.toFixed(1)}/100 on the FFAI Robothon Summer 2026 leaderboard, built with ${r.tool}. #FFAIRobothon #MuJoCo #EmbodiedAI | FFAI Robothon 2026 排行榜 #${r.rank} ${r.nameZh} — ${r.score.toFixed(1)}/100，由 ${r.tool} 构建。#FFAIRobothon #MuJoCo |
| LeaderboardWindow.tsx:225 | AI × Embodied | AI × 具身智能 |
| LeaderboardWindow.tsx:231 | LIVE RANKING | 实时排名 |
| LeaderboardWindow.tsx:282 | AI JUDGES' TAKE | AI 评审锐评 |
| LeaderboardWindow.tsx:317 | Generated ${fmtTs(generatedAt)} · prizes track the live ranking; final review prevails | 生成于 ${fmtTs(generatedAt)} · 奖励按当前实时排名，最终以终审为准 |
| LeaderboardWindow.tsx:324 | Presented by | 联合呈现 |
| LeaderboardWindow.tsx:344 | Scan to join | 扫码报名 |

注：分享卡片上的固定文本 `FFAI ROBOTHON`、`FFAI`、`AIXC`、`#FFAIRobothon · #MuJoCo · #EmbodiedAI`、各评审名 `Claude / GPT / Gemini` 为品牌/标签，一般无需翻译。

## 报名助手 Register (RegisterWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| RegisterWindow.tsx:177 | register@ffai-robothon — AI Registration Assistant（窗口标题栏） | register@ffai-robothon — AI Registration Assistant |
| RegisterWindow.tsx:22 / 32 | Hi, welcome to FFAI Robothon — I'm the registration assistant. What nickname would you like to compete under? | 你好，欢迎报名 FFAI Robothon。我是 AI 报名助手。请问你想使用的参赛昵称是？ |
| RegisterWindow.tsx:23 / 33 | Got it — “${n}”. Which AI agent / tools will you use? (Claude Code / Codex / Gemini CLI / Cursor / Kimi / your own) | 收到，昵称「${n}」。这次你计划使用哪个 AI agent / 工具？(Claude Code / Codex / Gemini CLI / Cursor / Kimi / 自研) |
| RegisterWindow.tsx:24 / 34 | Which direction do you want to tackle? (teleop / long-horizon tasks / data collection / dexterous hand / real-world scenarios, or freestyle) | 你想挑战的方向是？(遥操 / 长程任务 / 数据采集 / 灵巧手 / 实际场景，或自由发挥) |
| RegisterWindow.tsx:25 / 35 | Last one — what email should we send your score notifications to? | 最后留一个邮箱地址吧，方便我们通知你成绩。 |
| RegisterWindow.tsx:26 / 36 | “${v}” doesn't look like a valid email. Please enter a valid email address (e.g. you@example.com). | 「${v}」不是有效的邮箱地址，请重新输入一个有效邮箱（如 you@example.com）。 |
| RegisterWindow.tsx:27 / 37 | Registration complete ✓ Your participant ID is ${id}. The contest kicks off June 16 — keep an eye on the live leaderboard! | 报名成功 ✓ 你的参赛 ID 是：${id}。比赛将于 6 月 16 日开赛，记得关注实时排行榜！ |
| RegisterWindow.tsx:28 / 38 | You're already registered ✓ Your participant ID is ${id}. See you on the live leaderboard! | 你已经报名过了 ✓ 你的参赛 ID 是：${id}。记得关注实时排行榜！ |
| RegisterWindow.tsx:29 / 39 | Sorry, something went wrong saving your registration. Please try again in a moment. | 抱歉，保存报名时出错了，请稍后再试。 |
| RegisterWindow.tsx:44 / 45 | Type and press Enter…（输入框占位符 idle） | 输入后回车… |
| RegisterWindow.tsx:44 / 45 | Submitting…（输入框占位符 busy） | 提交中… |
| RegisterWindow.tsx:44 / 45 | Registration complete ✓（输入框占位符 done） | 报名已完成 ✓ |

## 案例 Cases (CasesWindow)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| CasesWindow.tsx:9 | cases（窗口标题栏） | cases |
| CasesWindow.tsx:10 | Demo Cases | 演示案例 |
| CasesWindow.tsx:14 | Dexterous Hand | 灵巧手 |
| CasesWindow.tsx:15 | dexterous_hand_demo.mp4（文件名，无需翻译） | dexterous_hand_demo.mp4 |

## 底部页脚 (Footer)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| App.tsx:31 | © 2026 FFAI Robothon · MuJoCo Embodied-AI Hackathon | © 2026 FFAI Robothon · MuJoCo 具身智能黑客松 |

## 语言切换 / 访问授权动效 (LangToggle / App)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| LangToggle.tsx:11 | EN / 中（语言切换按钮，当前 EN） | EN / 中 |
| LangToggle.tsx:15 | 中 / EN（语言切换按钮，当前中文） | 中 / EN |
| App.tsx:79-81 | ACCESS GRANTED（访问授权动效，无中文版） | ACCESS GRANTED |

## 侧边栏快捷入口 (Sidebar)

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| Sidebar.tsx:6 | Register | 报名 |
| Sidebar.tsx:7 | Rules | 规则 |
| Sidebar.tsx:8 | Scoring | 评分 |
| Sidebar.tsx:9 | Prizes | 奖金 |
| Sidebar.tsx:10 | Timeline | 日程 |
| Sidebar.tsx:11 | FAQ | 常见问题 |
| Sidebar.tsx:12 | Leaderboard | 排行榜 |
| Sidebar.tsx:13 | Cases | 案例 |

## 桌面脚本入口 (ScriptsWindow)

注：这是一个“桌面文件夹”装饰窗口，标题栏为 `/root/bash/scripts`（ScriptsWindow.tsx:33）。下列为各文件夹图标的可见文字。

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| ScriptsWindow.tsx:7 | DL Data | DL 数据 |
| ScriptsWindow.tsx:8 | Hash | 哈希 |
| ScriptsWindow.tsx:9 | Terminal | 终端 |
| ScriptsWindow.tsx:10 | Decryptor | 解密器 |
| ScriptsWindow.tsx:11 | Map | 地图 |
| ScriptsWindow.tsx:12 | Rules | 规则 |
| ScriptsWindow.tsx:13 | Scoring | 评分 |
| ScriptsWindow.tsx:14 | Prizes | 奖金 |
| ScriptsWindow.tsx:15 | Timeline | 日程 |
| ScriptsWindow.tsx:16 | FAQ | 常见问题 |
| ScriptsWindow.tsx:17 | Register | 报名 |
| ScriptsWindow.tsx:18 | Project | 项目 |
| ScriptsWindow.tsx:19 | Trace | 追踪 |
| ScriptsWindow.tsx:20 | Leaderboard | 排行榜 |
| ScriptsWindow.tsx:21 | MuJoCo | MuJoCo |
| ScriptsWindow.tsx:22 | Dexterous | 灵巧手 |
| ScriptsWindow.tsx:23 | Teleop | 遥操 |
| ScriptsWindow.tsx:24 | Data Capture | 数据采集 |
| ScriptsWindow.tsx:25 | Deploy | 部署 |
| ScriptsWindow.tsx:26 | Random | 随机 |

## 数据下载 (DataWindow)

注：这是“终端文件列表”风格窗口，标题栏为 `dl_data/manifest`（DataWindow.tsx:18）。文件名/命令为技术装饰，下列仅含真正面向用户的文字。

| 来源 (file:line) | English | 中文 |
| --- | --- | --- |
| DataWindow.tsx:19 | DL Data | DL 数据 |
| DataWindow.tsx:28 | ▸ Start Registration | ▸ 开始报名 |
| DataWindow.tsx:31 | ▸ Live Leaderboard | ▸ 实时排行榜 |

---

## 装饰性文本（一般无需修改）

下列为科技感氛围用的伪代码 / 终端 / 随机串等装饰文本，**没有中英对照**，通常不进入文案审阅范围，仅在此标注来源备查：

- **AuthStrip.tsx:4-34** —— 左上角持续“打字机”滚动的 Python 仿真示例代码（`import mujoco …`、`reach(...)`、`print("[ok] cube grasped")` 等），纯装饰。
- **TerminalWindow.tsx:3-14（SNIP）** —— 模拟终端输出（`$ pip install mujoco`、`[mjcf] 248 bodies · 96 joints …`、`>> deploy --leaderboard --anon` 等）。
- **TraceWindow.tsx** —— “追踪 agent”面板：`TRACING ───`、`AGENT/NODE/LAT/LONG/PING`、`▸ TARGET LOCKED`（49 行）等标签与随机经纬度/延迟/节点号；AGENTS 列表（第 4 行）为工具名 `Claude Code / Codex / Gemini CLI / Cursor / Kimi / Custom Agent`。
- **DecryptWindow.tsx** —— “密码破解器”窗口：标题 `password_decrypter.run`、`Password Decrypter`、`Calculating Hashes`、`[clock] N keys tested`、`Current passphrase:`、`Master key :`、`Transient key :` 以及随机 HEX / Base64 串，纯装饰。
- **PlotWindow.tsx:27-49** —— 遥测散点图画布内的轴标签/图例：`Joint X / Joint Y`、`Yellow = 1σ deviation`、`Red = raw rollout`、`White = binned`、`Bin size = 2048`、`σx/σy/σr`、`-200m … 200m` 等。
- **DataWindow.tsx:5-12, 20** —— 文件清单装饰：`mujoco_starter.zip 12.4M` 等文件名与 `$ ls -la /root/dl_data`、`drwxr-x` 前缀。
- **ScoringWindow.tsx:31** —— 伪命令行 `$ judges --anchor --median --avg`。
</content>
</invoke>
