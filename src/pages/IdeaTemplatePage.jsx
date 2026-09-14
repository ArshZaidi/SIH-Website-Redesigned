import { useEffect } from 'react'
import {
  ArrowLeft, BookOpen, Target, Cpu, TrendingUp, Users, Check,
  AlertCircle, Lightbulb, FileText, Layout,
} from 'lucide-react'

const SLIDES = [
  {
    n: '01',
    icon: Target,
    title: 'Problem Understanding',
    purpose: 'Prove you actually understood the problem before jumping to a solution.',
    include: [
      'Restate the problem statement in your own words — no copy-paste from the SIH portal',
      'Identify the primary stakeholders (citizens, officials, field workers, etc.)',
      'Quantify the pain — how many people are affected, how often, at what cost',
      'List the top 2–3 gaps in existing solutions',
    ],
    tip: 'Judges can tell within 30 seconds whether a team has read the problem statement carefully. Quote actual data — Ministry reports, DGCA/IMD statistics, NFHS survey numbers.',
  },
  {
    n: '02',
    icon: Lightbulb,
    title: 'Proposed Solution',
    purpose: 'Show a clear, specific solution — not a vague idea.',
    include: [
      'A one-sentence solution statement',
      'A workflow diagram or system architecture (hand-drawn is fine if it is clear)',
      'Key user journeys — how does a citizen / official interact with the system?',
      'What is genuinely new about your approach',
    ],
    tip: 'Avoid buzzword soup. "AI-powered blockchain-enabled IoT platform" tells a judge nothing. "A mobile app that reads a photo of a soil sample and returns an NPK reading in under 10 seconds" tells them everything.',
  },
  {
    n: '03',
    icon: Cpu,
    title: 'Technical Approach',
    purpose: 'Show you know what it takes to actually build this.',
    include: [
      'Tech stack — languages, frameworks, cloud services, hardware',
      'Data sources — where will training data or live data come from',
      'APIs you plan to integrate (IMD, Aadhaar, UPI, Bhashini, etc.)',
      'Constraints you are working within (offline, low-bandwidth, privacy)',
    ],
    tip: 'Name specific libraries and services. "We will use React + Node.js + PostgreSQL on AWS" beats "we will use a modern tech stack". If you plan to use a pretrained model, name it — YOLOv8, Whisper, IndicBERT.',
  },
  {
    n: '04',
    icon: TrendingUp,
    title: 'Feasibility & Impact',
    purpose: 'Show this can actually ship and will actually matter.',
    include: [
      'What can you realistically build in 36 hours vs in 6 months post-SIH',
      'Expected impact — quantifiable outcomes, not adjectives',
      'Cost estimate for a basic deployment',
      'Risks and how you will mitigate them',
    ],
    tip: 'The best submissions separate "finale prototype" from "deployable product". Judges know you cannot build a production system in 36 hours — what they want to see is that you know the difference.',
  },
  {
    n: '05',
    icon: Users,
    title: 'Team & Execution Plan',
    purpose: 'Show the team can actually execute.',
    include: [
      'Team composition — who does what (design, backend, ML, hardware, presentation)',
      'Faculty mentor details and relevant expertise',
      'A rough 36-hour timeline for the grand finale',
      'Any prior work, hackathon wins, or relevant projects',
    ],
    tip: 'Do not list all six members as "full-stack developers". Show role clarity. A team with one designer, two backend devs, one ML engineer, one hardware person and one presenter beats six generalists.',
  },
]

const MISTAKES = [
  { title: 'Copy-pasting the problem statement', desc: 'Instantly disqualifying. It signals you did not read past the title.' },
  { title: 'Too many slides', desc: 'Five slides means five slides. Six slides means you cannot prioritise.' },
  { title: 'No visuals', desc: 'A wall of text on a slide is a wall of text. Include at least one diagram, wireframe or flowchart.' },
  { title: 'Buzzword-driven pitch', desc: 'AI, blockchain, IoT and metaverse in the same sentence tells judges you do not understand any of them.' },
  { title: 'Undefined scope', desc: '"Build a platform for all farmers in India" is not a scope — it is a wish. Define your MVP.' },
  { title: 'No team roles', desc: 'The jury needs to believe six people can actually divide work and ship.' },
]

export default function IdeaTemplatePage({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="doc-page">
      <div className="doc-topbar">
        <button className="pp-back" onClick={onBack}>
          <ArrowLeft size={18} /> Back to home
        </button>
        <h1>Idea Submission Template</h1>
        <span className="pp-count mono">5 slides</span>
      </div>

      <div className="container">
        <section className="doc-hero">
          <span className="kicker mono">// Resource</span>
          <h1>The five-slide deck the jury expects</h1>
          <p>
            Every idea submission at SIH is judged on a five-slide deck. This is
            the exact structure that has worked across nine editions — what each
            slide should contain, and what to leave out.
          </p>
          <div className="doc-hero-meta">
            <span><FileText size={14} /> 5 slides</span>
            <span><Layout size={14} /> PDF or PPTX</span>
            <span><BookOpen size={14} /> Read time ~6 min</span>
          </div>
        </section>

        <section className="doc-block">
          <h2 className="doc-block-title">
            <span className="kicker mono">01</span>
            Slide-by-slide breakdown
          </h2>
          <div className="doc-slide-list">
            {SLIDES.map((s, i) => {
              const Icon = s.icon
              return (
                <article className="doc-slide" key={s.n} style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="doc-slide-head">
                    <div className="doc-slide-icon"><Icon size={22} /></div>
                    <div className="doc-slide-title">
                      <span className="mono doc-slide-num">SLIDE {s.n}</span>
                      <h3>{s.title}</h3>
                    </div>
                  </div>
                  <p className="doc-slide-purpose">{s.purpose}</p>
                  <h4 className="doc-sub-title">What to include</h4>
                  <ul className="doc-checklist">
                    {s.include.map((x) => (
                      <li key={x}><Check size={15} /> <span>{x}</span></li>
                    ))}
                  </ul>
                  <div className="doc-tip">
                    <Lightbulb size={15} />
                    <p>{s.tip}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="doc-block">
          <h2 className="doc-block-title">
            <span className="kicker mono">02</span>
            Common mistakes to avoid
          </h2>
          <div className="doc-mistakes">
            {MISTAKES.map((m) => (
              <div className="doc-mistake" key={m.title}>
                <AlertCircle size={17} />
                <div>
                  <strong>{m.title}</strong>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="doc-block">
          <h2 className="doc-block-title">
            <span className="kicker mono">03</span>
            Pre-submission checklist
          </h2>
          <div className="doc-checklist-grid">
            {[
              'All six team members listed with roles',
              'Faculty mentor name and designation included',
              'Problem statement ID and title on the first slide',
              'At least one architecture or workflow diagram',
              'No more than five content slides',
              'Font size readable at 720p (no less than 18pt)',
              'No broken images or placeholder text',
              'File exported as a single PDF under 10 MB',
            ].map((x) => (
              <label className="doc-check-item" key={x}>
                <input type="checkbox" />
                <span>{x}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="doc-cta">
          <h3>Ready to build your deck?</h3>
          <p>Use these slides as your blueprint. Download a starter template or start from scratch.</p>
          <div className="doc-cta-actions">
            <a
              className="btn btn-primary"
              href="/resources/idea-template.pdf"
              download
            >
              Download starter template
            </a>
            <button className="btn btn-ghost" onClick={onBack}>
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}