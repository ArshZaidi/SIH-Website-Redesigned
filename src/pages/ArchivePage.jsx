import { useEffect, useState, useMemo } from 'react'
import {
  ArrowLeft, Calendar, Users, FileText, Trophy, ChevronDown,
  Sparkles, TrendingUp,
} from 'lucide-react'
import { EDITIONS, ARCHIVE_STATS } from '../data/archiveData'

function AnimatedStat({ to, suffix = '' }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf, t0
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
  return <>{val.toLocaleString('en-IN')}{suffix}</>
}

export default function ArchivePage({ onBack }) {
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const ordered = useMemo(() => [...EDITIONS].sort((a, b) => b.year - a.year), [])

  return (
    <div className="archive-page">
      <div className="archive-topbar">
        <button className="pp-back" onClick={onBack}>
          <ArrowLeft size={18} /> Back to home
        </button>
        <h1>SIH Archive</h1>
        <span className="pp-count mono">{EDITIONS.length} editions</span>
      </div>

      <div className="container">
        <section className="archive-hero">
          <span className="kicker mono">// Editions Archive</span>
          <h1>Nine editions. One movement.</h1>
          <p>
            From a single-track hackathon in 2017 to the world&rsquo;s largest open
            innovation platform, here is how Smart India Hackathon grew year after
            year.
          </p>
        </section>

        {/* stats strip */}
        <section className="archive-stats">
          {ARCHIVE_STATS.map((s, i) => (
            <div className="archive-stat" key={s.label} style={{ animationDelay: `${i * 60}ms` }}>
              <strong className="mono"><AnimatedStat to={s.value} suffix={s.suffix || ''} /></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        {/* timeline of editions */}
        <section className="archive-timeline">
          <div className="archive-rail" aria-hidden="true">
            <div className="archive-rail-fill" />
          </div>

          {ordered.map((e, i) => {
            const isOpen = expanded === e.year
            return (
              <article
                className={`archive-item archive-item-${e.accent}`}
                key={e.year}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="archive-node">
                  <span className="mono">{e.year}</span>
                </div>

                <div className="archive-card">
                  <div className="archive-card-head">
                    <div>
                      <span className="mono archive-edition">Edition {e.edition}</span>
                      <h2>{e.title}</h2>
                      <p className="archive-tagline">{e.tagline}</p>
                    </div>
                    <button
                      className={`archive-expand ${isOpen ? 'on' : ''}`}
                      onClick={() => setExpanded(isOpen ? null : e.year)}
                      aria-label={isOpen ? 'Collapse' : 'Expand'}
                      aria-expanded={isOpen}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  <div className="archive-meta">
                    <span><Users size={13} /> {e.participants} participants</span>
                    <span><Calendar size={13} /> {e.theme}</span>
                    <span><FileText size={13} /> {e.problems} problem statements</span>
                    <span><Trophy size={13} /> {e.winners} winners</span>
                  </div>

                  <div className={`archive-body ${isOpen ? 'open' : ''}`}>
                    <h4>Highlights</h4>
                    <ul className="archive-highlights">
                      {e.highlights.map((h) => (
                        <li key={h}>
                          <Sparkles size={13} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="archive-institute-note">
                      <TrendingUp size={14} />
                      <span>{e.institutes}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        <div className="archive-cta">
          <h3>Ready to write the next chapter?</h3>
          <p>Registrations for SIH 2026 are open. Pick your problem and build.</p>
          <button className="btn btn-primary" onClick={onBack}>
            Explore SIH 2026 <ArrowLeft size={15} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </div>
    </div>
  )
}