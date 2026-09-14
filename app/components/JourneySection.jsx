'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Users, Cpu, Lightbulb, Trophy, Target, Award,
} from 'lucide-react'
import Reveal from './ui/Reveal'

const JOURNEY = [
  { step: '01', phase: 'Registration', date: 'Aug 01 — Aug 20',
    title: 'Register your team',
    desc: 'Form a team of six with at least one female member, nominate a faculty mentor, and lock your preferred problem statements on the portal.',
    icon: Users, tags: ['Team of 6', 'Faculty mentor', 'Free entry'], status: 'open' },
  { step: '02', phase: 'Ideation', date: 'Aug 20 — Sep 05',
    title: 'Submit your idea',
    desc: 'Pitch a five-slide deck covering problem understanding, proposed solution, tech stack, feasibility and expected impact. Institute-level judges shortlist.',
    icon: Lightbulb, tags: ['5-slide deck', 'Institute round', 'Mentor review'], status: 'open' },
  { step: '03', phase: 'Shortlist', date: 'Sep 05 — Sep 20',
    title: 'Campus evaluation',
    desc: 'The institutional SPOC and evaluation panel score every submission on innovation, feasibility and clarity. Top teams per college advance to the finale.',
    icon: Target, tags: ['Scoring rubric', 'SPOC review', 'Shortlist'], status: 'upcoming' },
  { step: '04', phase: 'Build', date: 'Sep 25 — Sep 27',
    title: '36-hour grand finale',
    desc: 'Two rounds of non-stop prototyping with domain mentors on the floor. Ship a working demo — repository, walkthrough video and live demo.',
    icon: Cpu, tags: ['36 hours', 'Working demo', 'Live mentors'], status: 'upcoming' },
  { step: '05', phase: 'Pitch', date: 'Sep 27',
    title: 'National jury pitch',
    desc: 'Finalists present live to the national jury — eight minutes to demo, four minutes of Q&A. Judged on impact, scalability and execution quality.',
    icon: Trophy, tags: ['Live pitch', 'Q&A', 'National jury'], status: 'upcoming' },
  { step: '06', phase: 'Rewards', date: 'Oct 10',
    title: 'Winners announced',
    desc: 'Each winning team receives ₹1,00,000 along with incubation support, dedicated mentorship and fast-tracked ministry pilot opportunities.',
    icon: Award, tags: ['₹1,00,000', 'Incubation', 'Pilot support'], status: 'upcoming' },
]

export default function JourneySection() {
  const journeyRef = useRef(null)
  const [journeyProgress, setJourneyProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = journeyRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const anchor = vh * 0.75
      const total = rect.height + (anchor - vh)
      const scrolled = anchor - rect.top
      const p = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)))
      setJourneyProgress(p * 100)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="section section-alt journey-section" id="journey">
      <div className="container">
        <Reveal>
          <div className="section-head journey-head">
            <span className="kicker mono">// Journey</span>
            <h2>From idea to national finale</h2>
            <p>Six milestones between registration and the winner&rsquo;s podium.</p>
          </div>
        </Reveal>

        <div className="journey-timeline" ref={journeyRef}>
          <div className="jt-rail" aria-hidden="true">
            <div className="jt-rail-fill" style={{ height: `${journeyProgress}%` }} />
          </div>
          {JOURNEY.map((j, i) => {
            const Icon = j.icon
            return (
              <Reveal key={j.step} delay={i * 60} className={`jt-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="jt-node"><Icon size={20} strokeWidth={1.8} /></div>
                <div className="jt-card">
                  <div className="jt-card-top">
                    <span className="mono jt-step">STEP {j.step}</span>
                    <span className={`jt-status jt-status-${j.status}`}>
                      {j.status === 'open' ? 'Open now' : 'Upcoming'}
                    </span>
                  </div>
                  <span className="mono jt-date">{j.date}</span>
                  <span className="jt-phase">{j.phase}</span>
                  <h3>{j.title}</h3>
                  <p>{j.desc}</p>
                  <div className="jt-tags">
                    {j.tags.map((t) => <span key={t} className="jt-tag">{t}</span>)}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}