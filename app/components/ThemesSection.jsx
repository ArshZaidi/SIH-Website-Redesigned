'use client'

import { useState } from 'react'
import Reveal from './ui/Reveal'
import ThemesCarousel from './ThemesCarousel'

export default function ThemesSection() {
  const [activeTheme, setActiveTheme] = useState('All')

  const goToExplorer = () => {
    const el = document.getElementById('explorer')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="section section-alt" id="themes">
      <div className="container">
        <Reveal>
          <div className="section-head themes-head">
            <span className="kicker mono">// Themes</span>
            <h2>Eighteen tracks. Infinite problems.</h2>
            <p>Swipe through the thematic areas and pick the one that fits you best.</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ThemesCarousel
            activeTheme={activeTheme}
            onPick={(t) => {
              setActiveTheme(t)
              setTimeout(goToExplorer, 80)
            }}
          />
        </Reveal>
      </div>
    </section>
  )
}