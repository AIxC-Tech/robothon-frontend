import { useEffect, useRef } from 'react'
import Window from '../Window'

/** telemetry scatter plot, ported from the original canvas IIFE */
export default function PlotWindow() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const x = cv.getContext('2d')
    if (!x) return
    const W = cv.width, H = cv.height, cx = W * 0.42, cy = H * 0.5

    function gauss() {
      let u = 0, v = 0
      while (!u) u = Math.random()
      while (!v) v = Math.random()
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.28 * v)
    }

    function draw() {
      if (!x) return
      x.clearRect(0, 0, W, H)
      x.fillStyle = '#c98a7d'
      x.font = '11px monospace'
      x.fillText('Joint X / Joint Y', cx - 60, 18)
      x.fillStyle = '#ffe14d'
      x.fillText('Yellow = 1σ deviation', cx - 40, 34)
      x.fillStyle = '#ffd0d0'
      x.fillText('Red = raw rollout', cx - 40, 48)
      x.fillStyle = '#c98a7d'
      x.fillText('White = binned', cx - 40, 62)
      x.fillStyle = '#c98a7d'
      x.fillText('Bin size = 2048', cx - 150, 96)
      x.fillText('σx = 6.66', cx - 150, 112)
      x.fillText('σy = 10.78', cx - 150, 128)
      x.fillText('σr = 22.16', cx - 150, 144)
      x.strokeStyle = 'rgba(210,140,125,.5)'
      x.beginPath()
      x.moveTo(cx, 40)
      x.lineTo(cx, H - 30)
      x.moveTo(60, cy)
      x.lineTo(W - 90, cy)
      x.stroke()
      x.fillStyle = '#c98a7d'
      ;['-200m', '-100m', '0m', '100m', '200m'].forEach((t, i) =>
        x.fillText(t, 60 + i * (((W - 150) / 4) * 0.5), H - 12),
      )
      for (let i = 0; i < 2600; i++) {
        const a = Math.random() * 6.28
        const r = Math.abs(gauss()) * 70
        const px = cx + Math.cos(a) * r * 0.95
        const py = cy + Math.sin(a) * r * 1.15
        x.fillStyle = `rgba(255,150,150,${(0.3 + Math.random() * 0.45).toFixed(2)})`
        x.fillRect(px, py, 1.4, 1.4)
      }
      for (let i = 0; i < 40; i++) {
        const yy = cy - 130 + i * 6.5
        const len = Math.exp(-Math.pow((i - 20) / 9, 2)) * 150 * (0.7 + Math.random() * 0.3)
        x.fillStyle = 'rgba(210,140,125,.9)'
        x.fillRect(W - 95, yy, len * 0.5, 5)
        x.fillStyle = 'rgba(255,150,150,.55)'
        x.fillRect(W - 95, yy, len * 0.5 * 0.6, 5)
      }
      x.strokeStyle = '#ffe14d'
      x.lineWidth = 1.5
      x.beginPath()
      x.ellipse(cx, cy, 12, 20, 0, 0, 6.28)
      x.stroke()
      x.lineWidth = 1
    }
    draw()
    const iv = setInterval(draw, 900)
    return () => clearInterval(iv)
  }, [])

  return (
    <Window id="w-plot" title="mujoco_telemetry.plot">
      <canvas id="plot" ref={ref} width={548} height={430} />
    </Window>
  )
}
