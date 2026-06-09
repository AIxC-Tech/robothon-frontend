import { useEffect, useRef, useState } from 'react'
import Window from '../Window'

const HEX = '0123456789ABCDEF'
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const grp = () => HEX[Math.floor(Math.random() * 16)] + HEX[Math.floor(Math.random() * 16)]
const lines = (r: number) => {
  const o: string[] = []
  for (let i = 0; i < r; i++) {
    const c: string[] = []
    for (let j = 0; j < 8; j++) c.push(grp())
    o.push(c.join(' '))
  }
  return o.join('\n')
}
const phrase = () => {
  let s = ''
  for (let i = 0; i < 20; i++) s += B64[Math.floor(Math.random() * B64.length)]
  return s
}

export default function DecryptWindow() {
  const [mkey, setMkey] = useState('')
  const [tkey, setTkey] = useState('')
  const [ph, setPh] = useState('bgQf9vr1abfKeef6sNRb')
  const [keys, setKeys] = useState(39)
  const [clock, setClock] = useState('00:00:02')
  const n = useRef(39)
  const s = useRef(2)

  useEffect(() => {
    const iv = setInterval(() => {
      setMkey(lines(2))
      setTkey(lines(3))
      setPh(phrase())
      n.current += Math.floor(Math.random() * 7) + 1
      setKeys(n.current)
      s.current++
      setClock(
        '00:' +
          String(Math.floor(s.current / 60)).padStart(2, '0') +
          ':' +
          String(s.current % 60).padStart(2, '0'),
      )
    }, 550)
    return () => clearInterval(iv)
  }, [])

  return (
    <Window id="w-decrypt" title="password_decrypter.run" bodyClassName="c ctext">
      <div className="winh">Password Decrypter</div>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: 10 }}>Calculating Hashes</p>
      <p>
        [<span>{clock}</span>] <span>{keys}</span> keys tested
      </p>
      <p>
        Current passphrase: <span style={{ color: 'var(--ink)' }}>{ph}</span>
      </p>
      <p style={{ marginTop: 10 }}>Master key :</p>
      <p style={{ fontSize: 11, color: 'var(--ink)', whiteSpace: 'pre' }}>{mkey}</p>
      <p style={{ marginTop: 6 }}>Transient key :</p>
      <p style={{ fontSize: 11, color: 'var(--ink)', whiteSpace: 'pre' }}>{tkey}</p>
    </Window>
  )
}
