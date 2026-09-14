'use client'

import { useState } from 'react'
import {
  Calendar, Clock, Users, Check, BookOpen, Video, MessageSquare,
  Award, AlertCircle,
} from 'lucide-react'
import PageTopBar from '../components/ui/PageTopBar'

const SLOTS = [
  { day: 'Monday',    time: '10:00 – 12:00', theme: 'AgriTech · CleanTech',    mentor: 'Dr. R. K. Verma', full: false },
  { day: 'Monday',    time: '14:00 – 16:00', theme: 'MedTech · HealthTech',    mentor: 'Dr. S. Iyer',     full: true  },
  { day: 'Tuesday',   time: '11:00 – 13:00', theme: 'EdTech · Mobility',       mentor: 'Prof. A. Nair',   full: false },
  { day: 'Wednesday', time: '15:00 – 17:00', theme: 'FinTech · Blockchain',   mentor: 'Mr. V. Sharma',   full: false },
  { day: 'Thursday',  time: '10:00 – 12:00', theme: 'Disaster Mgmt · GIS',    mentor: 'Dr. M. Reddy',    full: true  },
  { day: 'Friday',    time: '16:00 – 18:00', theme: 'Robotics · Drones',      mentor: 'Prof. K. Menon',  full: false },
]

const PREP = [
  'A one-paragraph summary of your problem statement and proposed approach',
  'A working draft of your five-slide deck (even if incomplete)',
  'A list of 2–3 specific blockers or questions you want help with',
  'Any code repository or prototype link if you have started building',
  'Your team roster and time commitments',
]

export default function MentorClient() {
  const [picked, setPicked] = useState(null)

  return (
    <div className="doc-page">
      <PageTopBar
        title="Mentor Office Hours"
        count={`${SLOTS.filter((s) => !s.full).length} slots open`}
        className="doc-topbar"
      />

      <div className="container">
        <section className="doc-hero">
          <span className="kicker mono">// Resource</span>
          <h1>Book time with a ministry-appointed mentor</h1>
          <p>Every shortlisted team gets access to domain experts appointed by the sponsoring ministry. Sessions run twice a week during the idea phase and daily during the grand finale.</p>
          <div className="doc-hero-meta">
            <span><Clock size={14} /> 30-minute sessions</span>
            <span><Video size={14} /> Google Meet</span>
            <span><Users size={14} /> Max 4 teams per slot</span>
          </div>
        </section>

        <section className="doc-block">
          <h2 className="doc-block-title"><span className="kicker mono">01</span> This week&rsquo;s slots</h2>
          <div className="slots-grid">
            {SLOTS.map((s) => {
              const disabled = s.full
              const isPicked = picked === `${s.day}-${s.time}`
              return (
                <button
                  key={`${s.day}-${s.time}`}
                  className={`slot-card ${disabled ? 'full' : ''} ${isPicked ? 'on' : ''}`}
                  onClick={() => !disabled && setPicked(`${s.day}-${s.time}`)}
                  disabled={disabled}
                >
                  <div className="slot-head">
                    <Calendar size={15} />
                    <span className="mono slot-day">{s.day}</span>
                    {disabled && <span className="slot-badge">Full</span>}
                  </div>
                  <strong className="slot-time">{s.time}</strong>
                  <span className="slot-theme">{s.theme}</span>
                  <span className="slot-mentor">{s.mentor}</span>
                  <span className="slot-action">
                    {disabled ? 'No seats left' : isPicked ? 'Selected ✓' : 'Select slot'}
                  </span>
                </button>
              )
            })}
          </div>

          {picked && (
            <div className="slot-confirm">
              <Check size={16} />
              <span>You picked <strong>{picked}</strong>. In the live SIH portal, confirming would now send a Google Calendar invite and the meeting link.</span>
            </div>
          )}
        </section>

        <section className="doc-block">
          <h2 className="doc-block-title"><span className="kicker mono">02</span> How to get the most out of a session</h2>
          <div className="prep-layout">
            <div className="prep-list">
              <h4>Come prepared with</h4>
              <ul className="doc-checklist">
                {PREP.map((p) => <li key={p}><Check size={15} /> <span>{p}</span></li>)}
              </ul>
            </div>
            <div className="prep-aside">
              <div className="prep-note"><AlertCircle size={16} /><div><strong>No-shows are tracked</strong><p>Teams that miss two booked sessions without notice lose priority booking for the rest of the phase.</p></div></div>
              <div className="prep-note"><MessageSquare size={16} /><div><strong>Ask specific questions</strong><p>"Should we use ML or rules?" gets a useful answer. "Is our idea good?" does not.</p></div></div>
              <div className="prep-note"><BookOpen size={16} /><div><strong>Record with permission</strong><p>Mentors usually allow recording — ask at the start. Written notes work too.</p></div></div>
              <div className="prep-note"><Award size={16} /><div><strong>Mentors can champion you</strong><p>Mentors do not judge, but they do brief the jury. Strong sessions matter.</p></div></div>
            </div>
          </div>
        </section>

        <div className="doc-cta">
          <h3>Booking opens with the idea phase</h3>
          <p>Only teams that have submitted their idea deck can book slots.</p>
          <div className="doc-cta-actions">
            <a className="btn btn-primary" href="https://forms.gle/placeholder" target="_blank" rel="noreferrer noopener">
              Open booking form
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}