'use client'

import {
  Sparkles, Cpu, TrendingUp, Rocket, Users, MessageSquare,
  Award, BarChart3, Check,
} from 'lucide-react'
import PageTopBar from '../components/ui/PageTopBar'

const CRITERIA = [
  { icon: Sparkles, weight: 20, title: 'Innovation & Originality',
    desc: 'How novel is the approach? Does it solve the problem in a way that existing solutions do not?',
    look: [
      'A genuinely new technical approach or a novel combination of existing ones',
      'Original insight into the problem, not just a repackaged existing app',
      'Evidence that the team explored alternatives before settling on this',
    ],
    band: [
      { score: '1–2', label: 'Repackages an existing public solution with no meaningful change' },
      { score: '3',   label: 'Standard approach applied competently but without distinct novelty' },
      { score: '4',   label: 'Clear novel angle — a new method, dataset, or use case' },
      { score: '5',   label: 'Genuinely original insight that would surprise domain experts' },
    ] },
  { icon: Cpu, weight: 20, title: 'Technical Feasibility',
    desc: 'Can this actually be built — and can the team build it?',
    look: [
      'A concrete tech stack that matches the problem constraints',
      'Realistic data sources and APIs, not vague "we will collect data"',
      'Understanding of edge cases and failure modes',
    ],
    band: [
      { score: '1–2', label: 'No clear stack, no data plan, unrealistic assumptions' },
      { score: '3',   label: 'Reasonable stack but gaps in data or deployment plan' },
      { score: '4',   label: 'Well-defined stack, credible data sources, clear constraints addressed' },
      { score: '5',   label: 'Production-grade architecture with fallbacks, offline paths, and security' },
    ] },
  { icon: TrendingUp, weight: 20, title: 'Impact & Relevance',
    desc: 'Does this meaningfully address the problem statement and affect real people?',
    look: [
      'Quantified benefit — how many people, how much cost saved, how much time reduced',
      'Alignment with the sponsoring ministry\u2019s actual mandate',
      'Equity considerations — does it serve rural, low-literacy or marginalised users',
    ],
    band: [
      { score: '1–2', label: 'Tangential to the problem, unclear who benefits' },
      { score: '3',   label: 'Directly relevant but impact not quantified' },
      { score: '4',   label: 'Clear quantified impact aligned with ministry priorities' },
      { score: '5',   label: 'Transformative impact — could reshape how the ministry operates' },
    ] },
  { icon: Rocket, weight: 15, title: 'Scalability',
    desc: 'Can this go from a 36-hour prototype to a nationwide deployment?',
    look: [
      'Architecture that handles 10x or 100x more users without rewrite',
      'Awareness of cost curves — what gets expensive at scale and how to avoid it',
      'Modularity — can new features or regions be added without rework',
    ],
    band: [
      { score: '1–2', label: 'Point solution, no path to scale' },
      { score: '3',   label: 'Scales for a pilot but architecture would need rework' },
      { score: '4',   label: 'Designed for scale from day one, cost-aware' },
      { score: '5',   label: 'National-scale architecture with clear unit economics' },
    ] },
  { icon: Users, weight: 15, title: 'Execution Quality',
    desc: 'How good is what you actually built in 36 hours?',
    look: [
      'Working prototype (not mockups) — judges will ask you to demo it',
      'Code quality if the repository is inspected',
      'Attention to UX, edge cases, and error states',
    ],
    band: [
      { score: '1–2', label: 'Slides only, no working code' },
      { score: '3',   label: 'Partially working demo with obvious gaps' },
      { score: '4',   label: 'Fully working demo of the core feature set' },
      { score: '5',   label: 'Polished, working end-to-end product with realistic polish' },
    ] },
  { icon: MessageSquare, weight: 10, title: 'Presentation & Clarity',
    desc: 'Can you explain what you built to a non-technical jury member?',
    look: [
      'Clear narrative — problem → solution → impact in that order',
      'Time discipline — pitching within the allotted minutes',
      'Confident Q&A, especially on trade-offs and limitations',
    ],
    band: [
      { score: '1–2', label: 'Confusing pitch, ran over time, weak answers' },
      { score: '3',   label: 'Understandable but not memorable' },
      { score: '4',   label: 'Clear, structured, well-rehearsed pitch' },
      { score: '5',   label: 'Compelling narrative that judges remember days later' },
    ] },
]

export default function RubricClient() {
  return (
    <div className="doc-page">
      <PageTopBar title="Evaluation Rubric" count="6 criteria" className="doc-topbar" />

      <div className="container">
        <section className="doc-hero">
          <span className="kicker mono">// Resource</span>
          <h1>How judges actually score your prototype</h1>
          <p>Every submission at SIH is scored against six weighted criteria. Understanding the weights is the single biggest lever you have for improving your final score — teams often spend 40% of their effort on criteria worth 15%.</p>
          <div className="doc-hero-meta">
            <span><BarChart3 size={14} /> 100 points total</span>
            <span><Award size={14} /> Applies to idea phase &amp; finale</span>
          </div>
        </section>

        <section className="doc-block">
          <h2 className="doc-block-title"><span className="kicker mono">01</span> Weightage at a glance</h2>
          <div className="rubric-weights">
            {CRITERIA.map((c) => {
              const Icon = c.icon
              return (
                <div className="rubric-weight" key={c.title}>
                  <div className="rw-head">
                    <Icon size={16} />
                    <span>{c.title}</span>
                    <strong className="mono">{c.weight}%</strong>
                  </div>
                  <div className="rw-bar"><div className="rw-bar-fill" style={{ width: `${c.weight * 5}%` }} /></div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="doc-block">
          <h2 className="doc-block-title"><span className="kicker mono">02</span> Criterion breakdown</h2>
          <div className="rubric-criteria">
            {CRITERIA.map((c, i) => {
              const Icon = c.icon
              return (
                <article className="rubric-card" key={c.title} style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="rubric-card-head">
                    <div className="rubric-card-icon"><Icon size={20} /></div>
                    <div className="rubric-card-title">
                      <h3>{c.title}</h3>
                      <span className="mono rubric-card-weight">{c.weight} points</span>
                    </div>
                  </div>
                  <p className="rubric-desc">{c.desc}</p>
                  <h4 className="doc-sub-title">What judges look for</h4>
                  <ul className="doc-checklist">
                    {c.look.map((x) => <li key={x}><Check size={15} /> <span>{x}</span></li>)}
                  </ul>
                  <h4 className="doc-sub-title">Score bands</h4>
                  <div className="rubric-bands">
                    {c.band.map((b) => (
                      <div className="rubric-band" key={b.score}>
                        <span className="mono rubric-band-score">{b.score}</span>
                        <span className="rubric-band-label">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="doc-block">
          <h2 className="doc-block-title"><span className="kicker mono">03</span> Idea phase vs grand finale</h2>
          <div className="rubric-compare">
            <div className="rubric-compare-card">
              <h4>Idea Phase</h4>
              <p>The five-slide deck is scored on <strong>Innovation</strong>, <strong>Feasibility</strong> and <strong>Relevance</strong>. Execution quality is not evaluated — you have not built anything yet.</p>
            </div>
            <div className="rubric-compare-card">
              <h4>Grand Finale</h4>
              <p>All six criteria apply. <strong>Execution Quality</strong> carries a meaningful weight — a strong idea with a broken demo will lose to a simpler idea with a working prototype.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}