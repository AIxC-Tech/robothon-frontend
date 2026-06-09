import { useId } from 'react'

/** terracotta folder icon, ported from the original folderSVG() */
export default function FolderIcon() {
  const i = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 64 56" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`fb${i}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a3a31" />
          <stop offset="1" stopColor="#5e2c25" />
        </linearGradient>
        <linearGradient id={`ff${i}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8584a" />
          <stop offset="1" stopColor="#73443C" />
        </linearGradient>
      </defs>
      <path
        d="M8 18 V15 a4 4 0 0 1 4-4 h11 a3 3 0 0 1 2.1 .9 l2.8 2.8 a3 3 0 0 0 2.1 .9 H52 a4 4 0 0 1 4 4 v23 a4 4 0 0 1 -4 4 H12 a4 4 0 0 1 -4-4 Z"
        fill={`url(#fb${i})`}
      />
      <rect x="8" y="21" width="48" height="25" rx="5" fill={`url(#ff${i})`} />
    </svg>
  )
}
