# FFAI Robothon — Frontend

Landing page for **FFAI Robothon Summer 2026** (MuJoCo Embodied-AI Hackathon),
rebuilt as a React app from the designer's static HTML prototype
(original kept at [docs/robothon-terracotta_6.html](docs/robothon-terracotta_6.html)).

Reference deploy of the prototype: https://hackathon-three-lovat-40.vercel.app

## Stack

- React 18 + TypeScript
- Vite

## Run

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
```

## Architecture

A "hacker desktop" UI: draggable / maximizable / closable windows on an animated
radar background, with EN / 中 bilingual content.

```
src/
  App.tsx                     app shell: providers + layout + all windows
  context/
    LangContext.tsx           EN/中 language state + t(en, zh) helper
    WindowManager.tsx         open/close/focus/maximize/drag + page-stack layout
  components/
    Window.tsx                generic draggable window shell
    RadarBackground.tsx       canvas radar sweep
    AuthStrip.tsx             top-left brand + live-typing MuJoCo code
    Countdown.tsx             submission countdown (deadline 6.21 24:00 UTC+8)
    Sidebar.tsx, BottomBar.tsx, FolderIcon.tsx
    windows/                  one component per window (hero, rules, scoring,
                              prizes, timeline, faq, leaderboard, cases, register
                              chat, banner, plot, terminal, trace, dexhand video,
                              scripts, decryptor, dl-data)
  styles/global.css           ported design styles (terracotta theme)
public/
  dexhand_demo.mp4            demo video (extracted from the prototype)
```

### Adding / editing content

Most copy lives co-located in each window component as `t('English', '中文')`
or as bilingual data arrays — edit those directly. To register a new window,
add its id to `WinId` and (if it should join the centered scroll page) to the
`PAGE` array in `WindowManager.tsx`.
