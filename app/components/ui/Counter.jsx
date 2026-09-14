'use client'

import { useRef, useState, useEffect } from 'react'

export default function Counter({ to, duration = 1600, suffix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf, started = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true
          let t0
          const step = (t) => {
            if (!t0) t0 = t
            const p = Math.min((t - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.floor(eased * to))
            if (p < 1) raf = requestAnimationFrame(step)
            else setVal(to)
          }
          raf = requestAnimationFrame(step)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration])
  return <span ref={ref}>{val.toLocaleString('en-IN')}{suffix}</span>
}