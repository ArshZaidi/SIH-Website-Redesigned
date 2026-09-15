'use client'

import './TimelineSection.css'
import {
  Calendar, Flag, Lightbulb, Target, Cpu, Trophy, Award, Sparkles,
} from 'lucide-react'
import Reveal from './ui/Reveal'

const TIMELINE = [
  { date: 'Aug 01', phase: 'Open',      icon: Flag,      accent: 'saffron',
    title: 'Registrations Open',
    desc: 'Teams of 6 register on the portal with a nominated faculty mentor and lock their preferred problem statements.' },
  { date: 'Aug 20', phase: 'Ideation',  icon: Lightbulb, accent: 'green',
    title: 'Idea Submission',
    desc: 'Submit a five-slide idea deck against a chosen problem statement. Institute-level judges shortlist the strongest entries.' },
  { date: 'Sep 05', phase: 'Shortlist', icon: Target,    accent: 'saffron',
    title: 'Campus Evaluation',
    desc: 'The institutional SPOC and evaluation panel score every submission on innovation, feasibility and clarity.' },
  { date: 'Sep 25', phase: 'Build',     icon: Cpu,       accent: 'green',
    title: 'Grand Finale — Round 1',
    desc: '36-hour hackathon begins across nodal centres. Teams prototype non-stop with domain mentors on the floor.' },
  { date: 'Sep 27', phase: 'Pitch',     icon: Trophy,    accent: 'saffron',
    title: 'Grand Finale — Round 2',
    desc: 'Top teams pitch live to the national jury — eight minutes to demo, four minutes of Q&A.' },
  { date: 'Oct 10', phase: 'Rewards',   icon: Award,     accent: 'green',
    title: 'Winners Announced',
    desc: 'Each winning team receives ₹1,00,000 along with incubation support and fast-tracked ministry pilots.' },
]

/* duplicate the array so the marquee can loop seamlessly */
const LOOPED = [...TIMELINE, ...TIMELINE]

export default function TimelineSection() {
  return (
    <section className="section timeline-section" id="timeline">
      <div className="timeline-aura" aria-hidden="true" />

      <div className="container">
        <Reveal>
          <div className="section-head timeline-head">
            <span className="kicker mono">// Timeline</span>
            <h2>Key dates you cannot miss</h2>
            <p>Six milestones between registration and the winner&rsquo;s podium.</p>
          </div>
        </Reveal>
      </div>

      {/* live marquee */}
      <Reveal delay={80}>
        <div className="timeline-marquee">
          <div className="tm-edge tm-edge-left" aria-hidden="true" />
          <div className="tm-edge tm-edge-right" aria-hidden="true" />

          <div className="tm-track">
            {LOOPED.map((item, i) => {
              const Icon = item.icon
              return (
                <article
                  className={`tm-card tm-accent-${item.accent}`}
                  key={`${item.date}-${i}`}
                  style={{ '--delay': `${(i % TIMELINE.length) * 0.15}s` }}
                >
                  <div className="tm-glow" aria-hidden="true" />

                  <div className="tm-card-head">
                    <span className="mono tm-date">
                      <Calendar size={12} /> {item.date}
                    </span>
                    <span className="mono tm-phase">{item.phase}</span>
                  </div>

                  <div className="tm-icon-wrap">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>

                  <div className="tm-card-foot">
                    <Sparkles size={12} />
                    <span className="mono">
                      STEP {String((i % TIMELINE.length) + 1).padStart(2, '0')}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* status bar */}
      <div className="container">
        <div className="timeline-status">
          <span className="ts-dot" />
          <span className="mono">LIVE · Registrations open · 6 milestones</span>
        </div>
      </div>
    </section>
  )
}