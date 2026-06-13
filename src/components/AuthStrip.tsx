import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'

const CODE = `import mujoco, numpy as np
from robot import ik, pd, ee, dist, gait

m = mujoco.MjModel.from_xml("scene.xml")
d = mujoco.MjData(m)
mujoco.mj_resetData(m, d)

def reach(goal, tol=1e-2):
    while dist(ee(d), goal) > tol:
        q = ik(m, d, goal)
        d.ctrl[:7] = pd(q, d.qpos[:7])
        mujoco.mj_step(m, d)

# pick the cube
reach([0.42, 0.10, 0.18])
gripper.close()
reach([0.42, 0.10, 0.35])      # lift
print("[ok] cube grasped")

# carry & place
reach([0.05, -0.30, 0.35])
reach([0.05, -0.30, 0.16])
gripper.open()
print("[ok] cube placed")

# walk the quadruped home
for t in range(steps):
    phase = 2*np.pi*t/steps
    d.ctrl[7:] = gait(phase)
    mujoco.mj_step(m, d)
print("[done] task complete")`

export default function AuthStrip() {
  const { t } = useLang()
  const [text, setText] = useState('')

  useEffect(() => {
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const step = () => {
      setText(CODE.slice(0, i))
      if (i < CODE.length) {
        const ch = CODE[i]
        i++
        timer = setTimeout(step, ch === '\n' ? 190 : 26 + Math.random() * 46)
      } else {
        timer = setTimeout(() => {
          i = 0
          step()
        }, 1900)
      }
    }
    step()
    return () => clearTimeout(timer)
  }, [])

  return (
    <div id="auth">
      <div className="a-brand">
        FFAI Robothon <span className="a-yr">{t('Summer 2026', '2026 Summer')}</span>
      </div>
      <div className="a-row">
        <span className="a-dot" />
        <span className="a-status">{t('Registration Open', '报名进行中')}</span>
        <span className="a-pool">{t(' · 7,999 USDC Prize Pool', ' · 7,999 USDC 奖池')}</span>
      </div>
      <pre id="codetype">
        <code>{text}</code>
        <span className="ctcur">▋</span>
      </pre>
    </div>
  )
}
