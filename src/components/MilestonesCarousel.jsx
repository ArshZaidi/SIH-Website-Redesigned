import { useState, useEffect, useCallback } from 'react'
import { Users, GraduationCap, Building2, FileText, Rocket, ChevronLeft, ChevronRight } from 'lucide-react'

const MILESTONES = [
  { icon: Users,         value: 1804218, label: 'Participating Students', suffix: '+',  accent: 'saffron' },
  { icon: GraduationCap, value: 12800,   label: 'SIH Alumni Network',      suffix: '+',  accent: 'green'   },
  { icon: Building2,     value: 9406,    label: 'Participating Institutes', suffix: '',   accent: 'saffron' },
  { icon: FileText,      value: 3158,    label: 'Total Problem Statements', suffix: '',   accent: 'green'   },
  { icon: Rocket,        value: 150,     label: 'Startups Details Submitted', suffix: '+', accent: 'saffron' },
]

function AnimatedNumber({ to, suffix = '' }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf
    let t0
    const duration = 1400
    const step = (t) => {
      if (!t0) t0 = t
      const p = Math.min((t - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
      else setVal(to)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to])
  return (
    <>
      {val.toLocaleString('en-IN')}
      {suffix}
    </>
  )
}

export default function MilestonesCarousel() {
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(true)

  const next = useCallback(() => setIndex((i) => (i + 1) % MILESTONES.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + MILESTONES.length) % MILESTONES.length), [])

  useEffect(() => {
    if (!auto) return
    const t = setInterval(next, 4200)
    return () => clearInterval(t)
  }, [auto, next])

  const handleMouseEnter = () => setAuto(false)
  const handleMouseLeave = () => setAuto(true)

  return (
    <section className="section milestones-section" id="milestones">
      <div className="container">
        <div className="section-head milestones-head">
          <span className="kicker mono">// SIH Milestones</span>
          <h2>Numbers that tell the story</h2>
          <p>What began in 2017 as a single hackathon has become the world&rsquo;s largest open innovation platform.</p>
        </div>

        <div
          className="milestones-viewport"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="milestones-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {MILESTONES.map((m) => {
              const Icon = m.icon
              return (
                <div className="milestone-slide" key={m.label}>
                  <div className={`ms-card ms-accent-${m.accent}`}>
                    <div className="ms-icon-wrap">
                      <Icon size={24} strokeWidth={1.6} />
                    </div>
                    <strong className="ms-value mono">
                      <AnimatedNumber to={m.value} suffix={m.suffix} />
                    </strong>
                    <span className="ms-label">{m.label}</span>
                    <div className="ms-bar">
                      <div className="ms-bar-fill" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="milestones-controls">
          <button className="ms-nav" onClick={prev} aria-label="Previous milestone">
            <ChevronLeft size={18} />
          </button>
          <div className="ms-dots">
            {MILESTONES.map((_, i) => (
              <button
                key={i}
                className={`ms-dot ${i === index ? 'on' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to milestone ${i + 1}`}
              />
            ))}
          </div>
          <button className="ms-nav" onClick={next} aria-label="Next milestone">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}