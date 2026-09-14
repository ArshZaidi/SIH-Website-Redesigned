'use client'

import { useState } from 'react'
import { GraduationCap, Users, Gavel, Check, ArrowRight } from 'lucide-react'
import Reveal from './ui/Reveal'

export default function ParticipateSection() {
  const [role, setRole] = useState('Student')

  const goToReviews = () => {
    const el = document.getElementById('reviews')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="section" id="participate">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="kicker mono">// Participate</span>
            <h2>Three ways to be part of SIH</h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="role-tabs">
            {[['Student', GraduationCap], ['Mentor', Users], ['Judge', Gavel]].map(([r, Icon]) => (
              <button key={r} className={`role-tab ${role === r ? 'on' : ''}`} onClick={() => setRole(r)}>
                <Icon size={16} /> {r}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="role-panel" key={role}>
            {role === 'Student' && (
              <>
                <h3>Build something that ships</h3>
                <p>Form a team of six, choose a problem statement, and prototype alongside mentors from the sponsoring ministry. Winners receive ₹1,00,000 and incubation support.</p>
                <ul className="role-list">
                  <li><Check size={15} /> Open to all UG, PG and PhD students</li>
                  <li><Check size={15} /> No registration fee</li>
                  <li><Check size={15} /> Travel &amp; stay covered for the finale</li>
                </ul>
              </>
            )}
            {role === 'Mentor' && (
              <>
                <h3>Guide the next generation</h3>
                <p>Mentors review submissions, run office hours during the finale, and help teams translate prototypes into deployable pilots.</p>
                <ul className="role-list">
                  <li><Check size={15} /> Industry or academic professionals</li>
                  <li><Check size={15} /> Commit ~6 hours across the finale weekend</li>
                  <li><Check size={15} /> Recognised on the national portal</li>
                </ul>
              </>
            )}
            {role === 'Judge' && (
              <>
                <h3>Decide what moves forward</h3>
                <p>Judges score prototypes on innovation, feasibility, impact and scalability, then defend their rankings to the national panel.</p>
                <ul className="role-list">
                  <li><Check size={15} /> Domain experts and ministry officials</li>
                  <li><Check size={15} /> Structured rubric-based evaluation</li>
                  <li><Check size={15} /> Confidentiality agreement required</li>
                </ul>
              </>
            )}
            <button className="btn btn-primary" onClick={goToReviews}>
              Share your experience <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}