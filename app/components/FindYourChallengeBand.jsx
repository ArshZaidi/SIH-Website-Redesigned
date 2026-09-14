'use client'

import { useState } from 'react'
import { Compass } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Reveal from './ui/Reveal'
import FindYourChallenge from './FindYourChallenge'
import ProblemModal from './ProblemModal'

export default function FindYourChallengeBand({ problems }) {
  const router = useRouter()
  const [showWizard, setShowWizard] = useState(false)
  const [selected, setSelected] = useState(null)

  return (
    <section className="section fyc-band-section" id="find-challenge">
      <div className="container">
        <Reveal>
          <div className="fyc-band">
            <div className="fyc-band-orb o1" aria-hidden="true" />
            <div className="fyc-band-orb o2" aria-hidden="true" />

            <div className="fyc-band-left">
              <span className="kicker mono">// Not sure where to start?</span>
              <h2>Find your challenge in 30 seconds</h2>
              <p>Answer three quick questions about what excites you and we&rsquo;ll surface the three problem statements that fit your team best.</p>
              <div className="fyc-band-actions">
                <button className="btn btn-primary" onClick={() => setShowWizard(true)}>
                  <Compass size={16} /> Start the quiz
                </button>
                <button className="btn btn-ghost" onClick={() => router.push('/problems')}>Browse all problems</button>
              </div>
            </div>

            <div className="fyc-band-right">
              {[
                { n: '01', label: 'Interest',   desc: 'Pick a theme' },
                { n: '02', label: 'Type',       desc: 'Software / Hardware' },
                { n: '03', label: 'Difficulty', desc: 'Challenge level' },
                { n: '04', label: 'Matches',    desc: 'Top 3 ranked' },
              ].map((s) => (
                <div className="fyc-mini-step" key={s.n}>
                  <span className="mono fyc-mini-num">{s.n}</span>
                  <div><strong>{s.label}</strong><span>{s.desc}</span></div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <FindYourChallenge
        open={showWizard}
        onClose={() => setShowWizard(false)}
        problems={problems}
        onSelectProblem={(p) => { setShowWizard(false); setSelected(p) }}
      />
      {selected && <ProblemModal problem={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}