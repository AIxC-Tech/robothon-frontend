import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'

// 微信 logo（两个气泡），同 X/TG/DC/GH 一样用 24×24 viewBox
function WeChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.81-.05-.171-.583-.263-1.196-.263-1.829 0-3.842 3.504-6.96 7.826-6.96.276 0 .543.027.81.052C18.318 5.21 13.978 2.188 8.69 2.188zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zM24 14.665c0-3.405-3.404-6.176-7.218-6.176-4.03 0-7.221 2.771-7.221 6.176 0 3.405 3.19 6.177 7.221 6.177.834 0 1.674-.211 2.509-.423a.733.733 0 0 1 .609.084l1.976 1.142a.342.342 0 0 0 .173.057c.166 0 .301-.137.301-.305 0-.075-.03-.15-.048-.221l-.405-1.535a.613.613 0 0 1 .221-.69C22.787 17.866 24 16.39 24 14.665zm-9.566-1.378c-.426 0-.772-.35-.772-.783 0-.434.346-.784.772-.784s.772.35.772.784c0 .433-.346.783-.772.783zm4.703 0c-.426 0-.772-.35-.772-.783 0-.434.346-.784.772-.784s.772.35.772.784c0 .433-.346.783-.772.783z" />
    </svg>
  )
}

export default function WeChatPopover() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // close on outside click (re-click the icon / × handle their own toggling)
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [open])

  return (
    <div ref={rootRef} className="wechat-wrap">
      <button
        type="button"
        className="soc-btn"
        aria-label="WeChat"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
      >
        <WeChatIcon />
      </button>

      {open && (
        <div className="wechat-pop" role="dialog" aria-label="WeChat QR">
          <div className="wb">
            <span className="t">wechat.qr</span>
            <span className="x" onClick={() => setOpen(false)}>
              ×
            </span>
          </div>
          <div className="wc">
            {/* 微信群二维码图片：放在 public/wx.png */}
            <img src="/wx.png" alt={t('Scan on WeChat', '微信扫码加入')} />
            <div className="cap">{t('Scan on WeChat', '微信扫码加入')}</div>
          </div>
        </div>
      )}
    </div>
  )
}
