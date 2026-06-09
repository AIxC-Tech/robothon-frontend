/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend base URL (defaults to http://localhost:8787). */
  readonly VITE_API_BASE?: string
  /** URL encoded into the share-card QR code (defaults to https://robothon.ff.com). */
  readonly VITE_SHARE_URL?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
