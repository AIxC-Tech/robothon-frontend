import { useEffect, useRef } from 'react'

/** animated radar sweep + blips, ported from the original canvas IIFE */
export default function RadarBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const G = '198,108,92'
    const T = Math.PI * 2
    let W = 0, H = 0, cx = 0, cy = 0, R = 0, dpr = 1

    function resize() {
      if (!cv || !ctx) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = cv.clientWidth
      H = cv.clientHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = W / 2
      cy = H / 2
      R = (Math.hypot(W, H) / 2) * 1.04
    }
    window.addEventListener('resize', resize)
    resize()

    const blips = Array.from({ length: 15 }, () => ({
      a: Math.random() * T,
      r: 0.16 + Math.random() * 0.82,
      b: Math.random(),
      s: 1.2 + Math.random() * 2.4,
    }))

    const SPEED = T / 4.2
    let sweep = 0, prev = 0, last = performance.now()
    let raf = 0

    const passed = (p: number, c: number, a: number) => {
      p = ((p % T) + T) % T
      c = ((c % T) + T) % T
      a = ((a % T) + T) % T
      return p <= c ? a > p && a <= c : a > p || a <= c
    }

    function frame(now: number) {
      if (!ctx) return
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      prev = sweep
      sweep = (sweep + SPEED * dt) % T
      ctx.clearRect(0, 0, W, H)

      ctx.lineWidth = 1
      for (let k = 1; k <= 4; k++) {
        ctx.beginPath()
        ctx.arc(cx, cy, (R * k) / 4, 0, T)
        ctx.strokeStyle = `rgba(${G},.10)`
        ctx.stroke()
      }
      ctx.strokeStyle = `rgba(${G},.07)`
      ctx.beginPath()
      ctx.moveTo(cx - R, cy)
      ctx.lineTo(cx + R, cy)
      ctx.moveTo(cx, cy - R)
      ctx.lineTo(cx, cy + R)
      const d = R * 0.7071
      ctx.moveTo(cx - d, cy - d)
      ctx.lineTo(cx + d, cy + d)
      ctx.moveTo(cx - d, cy + d)
      ctx.lineTo(cx + d, cy - d)
      ctx.stroke()

      const trail = 1.15, steps = 36
      for (let s = 0; s < steps; s++) {
        const f = s / steps
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, R, sweep - (f + 1 / steps) * trail, sweep - f * trail)
        ctx.closePath()
        ctx.fillStyle = `rgba(${G},${0.17 * (1 - f)})`
        ctx.fill()
      }
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R)
      ctx.strokeStyle = `rgba(${G},.5)`
      ctx.lineWidth = 1.5
      ctx.stroke()

      const decay = Math.pow(0.5, dt / 0.85)
      blips.forEach((p) => {
        if (passed(prev, sweep, p.a)) p.b = 1
        else p.b *= decay
        if (p.b > 0.02) {
          const x = cx + Math.cos(p.a) * R * p.r
          const y = cy + Math.sin(p.a) * R * p.r
          ctx.beginPath()
          ctx.arc(x, y, p.s, 0, T)
          ctx.shadowColor = `rgba(${G},${p.b})`
          ctx.shadowBlur = 9
          ctx.fillStyle = `rgba(${G},${p.b})`
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <div id="grid" />
      {/* 全屏雷达扫描动画已隐藏。如需恢复，取消下面这行的注释：
          <div id="map"><canvas id="radar" ref={ref} /></div> */}
    </>
  )
}
