'use client'

import { Sparkles, ArrowRight, Compass } from 'lucide-react'
import Reveal from './ui/Reveal'
import Counter from './ui/Counter'
import { useRouter } from 'next/navigation'

export default function HeroSection({ problems }) {
  const router = useRouter()

  const goToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orbit">
          <span className="orbit-ring r1" /><span className="orbit-ring r2" /><span className="orbit-ring r3" />
          <span className="orbit-dot d1" /><span className="orbit-dot d2" /><span className="orbit-dot d3" />
        </div>
      </div>

      <div className="hero-inner">
        <Reveal><span className="eyebrow mono"><Sparkles size={13} /> 10th Edition · 2026</span></Reveal>
        <Reveal delay={80}>
          <h1 className="hero-title">
            Where India&rsquo;s sharpest
            <span className="grad"> student minds </span>
            build for the nation.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="hero-sub">
            Smart India Hackathon is the world&rsquo;s largest open innovation
            movement. Pick a real problem from a ministry, build a working
            prototype in 36 hours, and pitch it to a national jury.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => router.push('/problems')}>
              Explore problem statements <ArrowRight size={17} />
            </button>
            <button className="btn btn-hero-accent" onClick={() => goToSection('find-challenge')}>
              <Compass size={17} /> Find your challenge
            </button>
            <button className="btn btn-ghost" onClick={() => goToSection('journey')}>How it works</button>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="hero-strip">
            {[['Problems', 250, '+'], ['Institutions', 5000, '+'], ['Prize / team', 1, 'L'], ['States', 36, '']].map(([label, n, suf]) => (
              <div key={label} className="hero-stat">
                <strong className="mono"><Counter to={n} suffix={suf} /></strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}