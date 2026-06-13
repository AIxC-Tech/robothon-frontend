# Claude Code — project context

## 部署（用户说"部署"时直接执行）

运行 `./deploy.sh` 即可：本地 `npm run build` + `rsync --delete dist/` 到服务器。
完整说明见 `DEPLOY.md`。关键信息：

- 服务器：`root@16.59.196.254`（**用户是 root，不是 ubuntu**），端口 22
- SSH key：`~/.ssh/robothon_ed25519`
- Web root：`/var/www/robothon`，Nginx + Let's Encrypt 已配好
- 线上：https://robothon.aixc.info
- 部署后用 `curl -sI https://robothon.aixc.info/` 验证返回 200

<!-- cloude-code-toolbox:mcp-skills-awareness-begin -->

### MCP & Skills awareness (Cloude Code ToolBox)

_Last synced: 2026-06-13T01:14:05.332Z._

- **Full report:** `.claude/cloude-code-toolbox-mcp-skills-awareness.md` in this workspace (auto-overwritten on each scan). Use it as ground truth for configured servers and skill folders.
- **MCP:** For **live tools** in Claude Code, enable the matching server via `/mcp`. Servers are configured in `~/.claude.json` (user) and `.mcp.json` (project).
- **When the user’s task matches a server** (e.g. Confluence work and a **Confluence** / **Atlassian** MCP is listed), **prefer that server id** and plan on tool use—not only file search.
- **Skills:** Folders below contain `SKILL.md`; attach or cite paths in chat when relevant.

#### Workspace MCP

- `/Users/yoh/work/aixc/robothon-frontend/.mcp.json` _(workspace: robothon-frontend)_ — _file missing_

_No active workspace servers in mcp.json._

#### User MCP

- `/Users/yoh/.claude.json` — _servers defined_

| Server id | Kind | Detail |
|-----------|------|--------|
| figma | stdio | npx -y figma-developer-mcp --figma-api-key=<FIGMA_API_KEY> --stdio |

#### Project skills

_None found (or no workspace open)._

#### User skills

_None found._

<!-- cloude-code-toolbox:mcp-skills-awareness-end -->
