import { useEffect, useRef, useState } from 'react'
import Window from '../Window'

const AGENTS = ['Claude Code', 'Codex', 'Gemini CLI', 'Cursor', 'Kimi', 'Custom Agent']

export default function TraceWindow() {
  const [lat, setLat] = useState('39.678622')
  const [lng, setLng] = useState('116.297496')
  const [ping, setPing] = useState('12 ms')
  const [node, setNode] = useState('0xA3F1')
  const [agent, setAgent] = useState('Claude Code')
  const [status, setStatus] = useState('TRACING ───────')
  const [lock, setLock] = useState(0)
  const dots = useRef(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setLat((39 + Math.random()).toFixed(6))
      setLng((116 + Math.random()).toFixed(6))
      setPing(8 + Math.floor(Math.random() * 40) + ' ms')
      setNode('0x' + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0'))
      dots.current = (dots.current + 1) % 8
      setStatus('TRACING ' + '─'.repeat(dots.current))
      if (Math.random() > 0.8) setAgent(AGENTS[Math.floor(Math.random() * AGENTS.length)])
      setLock(Math.random() > 0.6 ? 1 : 0)
    }, 700)
    return () => clearInterval(iv)
  }, [])

  return (
    <Window id="w-trace" title="tracing_agent.log">
      <div className="ok">{status}</div>
      <div>
        <span className="lbl">AGENT&nbsp;:</span> <span className="val">{agent}</span>
      </div>
      <div>
        <span className="lbl">NODE&nbsp;&nbsp;:</span> <span className="val">{node}</span>
      </div>
      <div>
        <span className="lbl">LAT&nbsp;&nbsp;&nbsp;:</span> <span className="val">{lat}</span>
      </div>
      <div>
        <span className="lbl">LONG&nbsp;&nbsp;:</span> <span className="val">{lng}</span>
      </div>
      <div>
        <span className="lbl">PING&nbsp;&nbsp;:</span> <span className="val">{ping}</span>
      </div>
      <div className="ok" style={{ marginTop: 8, opacity: lock }}>
        ▸ TARGET LOCKED
      </div>
    </Window>
  )
}
