# Robothon 2026 — 把《Official Rules》接进官网（实施方案）

> 给技术：这是"在 https://robothon.ff.com/ 增加 Contest Rules"的落地说明。
> 源文件：`Robothon 2026 -- Contest Rules.docx`（正式法律版《Official Rules》）。
> 任务带优先级：`必做` / `应做` / `需确认`（最后一类是主办方/法务拍板，不是技术活，但会**阻塞上线**）。

---

## 0. 先分清两个"规则"，别混
- 站上已有的「**规则 / Robothon Rules**」= 玩法概览（主题/本体/技术栈/提交物），保留不动。
- 这份 docx = **法律版《Official Rules》**（资格、奖金税务、IP 授权、CCPA、仲裁、责任限制…）。
- 两者并存，不互相替换。本方案只负责把**法律版**接进站点。

---

## 1. 技术改动

### R-1 ｜必做｜新增独立页面 `/official-rules`
- SPA 加一条路由 `/official-rules`。
- 页面内容：
  - **英文全文**（正文以 docx 为准，**占位符填好后**导入，见 C-5）。
  - **顶部锚点目录**（章节见下）。
  - **PDF 下载**按钮（同一份规则的 PDF）。
  - **中文摘要区**（折叠或页首）：非逐条翻译，结尾必须有声明 →
    `本中文摘要仅供参考，完整条款以英文版《Official Rules》为准。`
- 章节锚点（按 docx 顺序）：Sponsor / Eligibility / Contest Period / How to Enter / Judging / Prizes / Winner Selection & Notification / Tax Obligations & Reporting / Intellectual Property / General Conditions / Privacy / Securities Law Disclosure / Dispute Resolution / Limitation of Liability / Official Rules Availability / Miscellaneous。
- ⚠️ **法律要求**：此页须在**赛期内 + 赛后 1 年**持续可访问（稳定 URL，赛后别删）。文档原文：*"available at [URL] throughout the Contest Period and for one (1) year thereafter."*
- 展示形式：长文可读页（移动端友好）；要贴合站点"窗口"风格可做成 `official-rules.txt` 窗口，但**不要塞进小卡片**。

### R-2 ｜必做｜页脚加链接
在页脚（`© 2026 FFAI Robothon …` 那块）增加两个链接，i18n 用现有 `t("EN","ZH")`：

| 英文 | 中文 | 指向 |
|---|---|---|
| Official Rules | 官方规则 | `/official-rules` |
| Privacy Policy | 隐私政策 | 隐私政策页（docx 里 `[PRIVACY POLICY URL]` 要填，见 C-5） |

### R-3 ｜必做·合规关键｜报名流程加"同意条款"步骤
文档把 *"Affirmative acceptance of these Official Rules"* 列为参赛**硬性要求**，所以 AI 报名助手要在**发参赛 ID 之前**加一步确认：
- 新增一步消息：
  - 中：`报名前最后一步：请阅读并同意《官方规则》（含参赛资格、奖金与税务、知识产权等）。点「同意并完成报名」即代表你已阅读并接受全部条款。`
  - 英：`One last step — please read and accept the Official Rules (eligibility, prizes & taxes, IP, and more). Tap "Agree & finish" to confirm you've read and accept them.`
- 交互：一个可点按钮 `同意并完成报名 / Agree & finish` + 一个《官方规则》链接（新标签打开 `/official-rules`）。**未点同意不发 ID。**
- **存证（重要）**：`POST /api/register` 的 payload 增加 `rulesAcceptedAt`（ISO 时间戳）与 `rulesVersion`（规则版本号或生效日期），后端落库。法律上需要可追溯的同意记录。

### R-4 ｜应做｜友好"规则"版块加指引
在「规则 / Robothon Rules」窗口底部加一行（链接到 `/official-rules`）：
- 中：`以上为玩法概览；完整法律条款见《官方规则》。`
- 英：`This is a quick overview — see the full Official Rules for the binding terms.`

### R-5 ｜必做｜更新奖金表（按新版奖金表图）
**新表**（替换站上「奖金分配 / Prize Breakdown」数据，对应 bundle 里的 `Up` 数组）：

| Award / 奖项 | Slots / 名额 | Amount / 单项 | Subtotal / 小计 |
|---|---|---|---|
| 1st Place / 冠军 | 1 | $1,500 | $1,500 |
| 2nd Place / 亚军 | 1 | $599 | $599 |
| 3rd Place / 季军 | 1 | $550 | $550 |
| Excellence Award (4th–11th) / 优秀作品奖（第 4–11 名） | 8 | $500 | $4,000 |
| Best Beginner Project / 最佳新手作品 | 1 | $450 | $450 |
| Best Human-AI Collaboration / 最佳人机协作 | 1 | $450 | $450 |
| Judges' Choice Award / 评审团之选 | 1 | $450 | $450 |
| **Total / 合计** | **14** | — | **$7,999** |

**连带要改的（这些地方还引用着旧数字 11 / 8,000 / 4th–8th）：**
- 名额 **11 → 14**：hero 角标「· 11 名额 · 3×AI 评审 / · 11 slots · 3×AI judges」、奖金说明行「共 11 个名额 / 11 … in total」。
- 优秀奖区间 **(4th–8th) → (4th–11th)** / 「（第4–8名）→（第 4–11 名）」。
- 奖项名（按图，部分或已改）：`Best Human-AI Collaboration`（去掉 Log）/「最佳人机协作」；`Judges' Choice Award`/「评审团之选」；`Best Beginner Project`/「最佳新手作品」。
- 排行榜**示例徽章金额**（demo mock）：冠军 3,000→1,500、亚军 1,500→599、季军 800→550、优秀 300→500，否则榜单金额和奖金表对不上。

**⚠️ 需拍板（并入 C-2）：**
- **币种**：新图用 `$`（美元），站上 hero/角标是 `USDC`。二选一、全站统一；若改美元，hero「瓜分 8,000 USDC 奖池」要随之改。
- **总额**：新表合计 **$7,999**，站上宣传 **8,000**。别一边宣传 8,000、一边只发 7,999——要么写「≈$8,000」，要么直接写 $7,999。
- **别动 $599**：2nd 的 $599 是**故意卡在 $600 的 1099 报税线以下**（只有 1st $1,500 会触发 1099）。不要为凑整改成 ≥$600，否则更多获奖者需报税。

---

## 2. 发布前必须确认（需确认 · 主办方/法务拍板，会阻塞上线）
放置位置再对，这几条不解决、按现宣传口径上线仍有合规风险：

| # | 冲突 | 站点现状 ↔ 文档 | 需要的决定 |
|---|---|---|---|
| C-1 | **参赛资格** | 站点中英双语、面向中国/全球、Discord、"人人可参加" ↔ 文档限 **美国 50 州+DC、满 18 岁、仅限个人**，且排除主办方员工 | 到底面向谁？要么放开资格，要么收紧宣传（双语站却只许美国人参赛=误导）。**最高优先级冲突。** |
| C-2 | **奖金：币种 + 总额** | hero **8,000 USDC** ↔ 新奖金表 **$7,999 美元（R-5）** ↔ 文档 **"Cash prizes" + 1099 + 24% 预扣** | 统一币种（$ 还是 USDC）和总额（8,000 还是 7,999）；加密奖励税务需法务确认。$599 卡在 1099 线下，**勿动** |
| C-3 | **报名要素** | 聊天只收 昵称/邮箱/工具/方向 ↔ 文档要求 **法定姓名 + 居住州 + 18+ + 原创声明 + 同意条款** | 若资格保持美国 only，报名需补这些字段（与"匿名提交"选项也冲突）→ 影响 R-3 与报名表单设计 |
| C-4 | **报名次数** | 之前去掉了"每日限制" ↔ 文档 **每人每天限 1 次** | 两边对齐（站点文案 + 后端限频） |
| C-5 | **模板未填** | docx 内 `[DATE] [TIME] [CONTEST URL] [PRIVACY POLICY URL] [NUMBER]` 均为占位符；另有笔误 *"Three will be three AI judges"* | 公开前补全 + 改正 |

> ✅ 一致、无需改的：文档的 **8 项评分标准**与站上"评分"版块完全一致。

---

## 3. 验收清单
- [ ] `/official-rules` 可访问：英文全文 + 锚点目录 + PDF 下载 + 中文摘要（含"以英文为准"声明）
- [ ] 页脚有 `官方规则 / Official Rules`、`隐私政策 / Privacy Policy`（中英）
- [ ] 报名流程含"同意"步骤；未同意不发 ID；后端记录 `rulesAcceptedAt` + `rulesVersion`
- [ ] 友好"规则"版块有指向 `/official-rules` 的指引
- [ ] 赛后 1 年内 `/official-rules` 保持可访问（部署/运维注意）
- [ ] C-1 ~ C-5 已由主办方/法务确认并处理
- [ ] docx 占位符全部填好、笔误改正后再导入页面
- [ ] 奖金表按 R-5 更新（金额/名额/奖项名/区间）；名额 11→14、币种与总额已统一
- [ ] 排行榜示例徽章金额与新奖金表一致

---

## 摘要：最少要做的两件"法律必需"
1. **`/official-rules` 常驻页 + 页脚链接**（赛后留 1 年）。
2. **报名流程取得"同意"并存证**。
其余（中文摘要、友好版指引）是体验优化；C-1~C-5 是上线前的硬门槛。
