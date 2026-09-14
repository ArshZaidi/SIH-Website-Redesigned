'use client'

import { useState } from 'react'
import { Building2, Lightbulb, ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import ProblemModal from './ProblemModal'

export default function FeaturedSection({ problems }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="kicker mono">// Featured</span>
            <h2>This week&rsquo;s highlighted challenges</h2>
            <p>Hand-picked problem statements across ministries that need fresh thinking.</p>
          </div>
        </Reveal>

        <div className="featured-grid">
          {problems.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <article className="featured-card" onClick={() => setSelected(p)}>
                <div className="fc-top">
                  <span className={`pill pill-${p.type.toLowerCase()}`}>{p.type}</span>
                  <span className="mono fc-code">{p.code}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="fc-desc">{p.description.slice(0, 118)}…</p>
                <div className="fc-meta">
                  <span><Building2 size={13} /> {p.ministry.replace('Ministry of ', '')}</span>
                  <span><Lightbulb size={13} /> {p.ideas} ideas</span>
                </div>
                <div className="fc-cta">View details <ArrowUpRight size={15} /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && <ProblemModal problem={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}