'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { THEMES_DATA } from '@/data/themesData'

export default function ThemesCarousel({ activeTheme, onPick }) {
  const [page, setPage] = useState(0)
  const [auto, setAuto] = useState(true)
  const viewportRef = useRef(null)
  const [perView, setPerView] = useState(4)

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w < 520) setPerView(1)
      else if (w < 800) setPerView(2)
      else if (w < 1100) setPerView(3)
      else setPerView(4)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const pageCount = Math.ceil(THEMES_DATA.length / perView)

  const next = useCallback(() => setPage((p) => (p + 1) % pageCount), [pageCount])
  const prev = useCallback(() => setPage((p) => (p - 1 + pageCount) % pageCount), [pageCount])

  useEffect(() => {
    if (page >= pageCount) setPage(0)
  }, [pageCount, page])

  useEffect(() => {
    if (!auto) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [auto, next])

  return (
    <div
      className="themes-carousel"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      <div className="tc-viewport" ref={viewportRef}>
        <div
          className="tc-track"
          style={{ transform: `translateX(-${page * 100}%)`, '--per-view': perView }}
        >
          {THEMES_DATA.map((t) => {
            const Icon = t.icon
            const isOn = activeTheme === t.name
            return (
              <div className="tc-slide" key={t.name}>
                <button
                  className={`tc-card tc-accent-${t.accent} ${isOn ? 'on' : ''}`}
                  onClick={() => onPick?.(isOn ? 'All' : t.name)}
                  aria-pressed={isOn}
                >
                  <span className="tc-glow" />
                  <span className="tc-icon"><Icon size={22} strokeWidth={1.7} /></span>
                  <span className="tc-label">{t.short}</span>
                  <span className="tc-full">{t.name}</span>
                  <span className="tc-check">{isOn ? 'Active' : 'Select'}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="tc-controls">
        <button className="tc-nav" onClick={prev} aria-label="Previous themes"><ChevronLeft size={18} /></button>
        <div className="tc-dots">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button key={i} className={`tc-dot ${i === page ? 'on' : ''}`}
              onClick={() => setPage(i)} aria-label={`Go to page ${i + 1}`} />
          ))}
        </div>
        <button className="tc-nav" onClick={next} aria-label="Next themes"><ChevronRight size={18} /></button>
      </div>
    </div>
  )
}