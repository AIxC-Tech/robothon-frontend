import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useWindows, type WinId } from '../context/WindowManager'

interface WindowProps {
  id: WinId
  title: string
  children: ReactNode
  /** extra class names (e.g. "vidwin") */
  className?: string
  /** className applied to the inner content container; defaults to "c" */
  bodyClassName?: string
  /** extra inline style for the inner content container */
  bodyStyle?: CSSProperties
  /** when false the close button is greyed out and the window can't be closed */
  closable?: boolean
}

export default function Window({ id, title, children, className = '', bodyClassName = 'c', bodyStyle, closable = true }: WindowProps) {
  const wm = useWindows()
  const s = wm.state[id]
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null)

  const onBarMouseDown = (e: React.MouseEvent) => {
    // ignore clicks on the close / maximize controls
    const target = e.target as HTMLElement
    if (target.closest('[data-close]') || target.closest('[data-mx]')) return
    const el = document.getElementById(id)
    if (!el) return
    const r = el.getBoundingClientRect()
    dragRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: r.left + window.scrollX,
      oy: r.top + window.scrollY,
    }
    wm.focus(id)
    e.preventDefault()

    const onMove = (ev: MouseEvent) => {
      const d = dragRef.current
      if (!d) return
      wm.move(id, Math.max(0, d.oy + ev.clientY - d.sy), d.ox + ev.clientX - d.sx)
    }
    const onUp = () => {
      dragRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const style: CSSProperties = {
    display: s.open ? 'flex' : 'none',
    top: typeof s.top === 'number' ? `${s.top}px` : s.top,
    left: typeof s.left === 'number' ? `${s.left}px` : s.left,
    right: 'auto',
    zIndex: s.z,
  }
  if (s.width != null) style.width = `${s.width}px`
  if (s.height != null) style.height = `${s.height}px`

  return (
    <div
      id={id}
      className={`win${s.max ? ' max' : ''}${className ? ' ' + className : ''}`}
      style={style}
      onMouseDown={() => wm.focus(id)}
    >
      <div className="bar" onMouseDown={onBarMouseDown}>
        <span className="t">{title}</span>
        <span
          className="mx"
          data-mx="1"
          title="Maximize / Restore"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            wm.toggleMax(id)
          }}
        />
        <span
          className={`x${closable ? '' : ' disabled'}`}
          data-close
          title={closable ? 'Close' : undefined}
          onClick={(e) => {
            e.stopPropagation()
            if (closable) wm.close(id)
          }}
        >
          ×
        </span>
      </div>
      <div className={bodyClassName} style={bodyStyle}>{children}</div>
    </div>
  )
}
