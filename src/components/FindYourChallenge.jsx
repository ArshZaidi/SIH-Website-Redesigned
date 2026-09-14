import { useState, useMemo, useEffect } from 'react'
import {
  X, ArrowLeft, ArrowRight, Check, Sparkles, Cpu, Lightbulb,
  Building2, Award, Plus, RotateCcw, Trophy, Target,
} from 'lucide-react'
import { THEMES_DATA } from '../data/themesData'

/* Question definitions */
const TYPE_OPTIONS = [
  { value: 'Software', label: 'Software', desc: 'Apps, platforms, AI/ML, data science' },
  { value: 'Hardware', label: 'Hardware', desc: 'Devices, sensors, drones, embedded systems' },
  { value: 'Either',   label: 'Either',   desc: 'Show me the best of both' },
]

const DIFFICULTY_OPTIONS = [
  { value: 'Easy',   label: 'Easy',   desc: 'Low risk, high polish' },
  { value: 'Medium', label: 'Medium', desc: 'Balanced challenge' },
  { value: 'Hard',   label: 'Hard',   desc: 'Deep tech, ambitious scope' },
  { value: 'Any',    label: 'Any',    desc: 'I\'m flexible' },
]

const STEP_LABELS = ['Interest', 'Type', 'Difficulty', 'Results']

/* Scoring */
function scoreProblem(p, answers) {
  let s = 0
  if (answers.theme && p.theme === answers.theme) s += 50
  if (answers.type && answers.type !== 'Either' && p.type === answers.type) s += 30
  if (answers.difficulty && answers.difficulty !== 'Any' && p.difficulty === answers.difficulty) s += 20
  s += Math.min((p.ideas || 0) / 30, 15)
  return s
}

export default function FindYourChallenge({
  open,
  onClose,
  problems,
  onSelectProblem,
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ theme: null, type: null, difficulty: null })

  /* reset on open */
  useEffect(() => {
    if (open) {
      setStep(0)
      setAnswers({ theme: null, type: null, difficulty: null })
    }
  }, [open])

  /* esc closes */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const matched = useMemo(() => {
    if (!problems || problems.length === 0) return []
    return [...problems]
      .map((p) => ({ p, score: scoreProblem(p, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ p, score }) => ({
        problem: p,
        match: Math.min(100, Math.round((score / 100) * 100)),
      }))
  }, [problems, answers])

  if (!open) return null

  const canAdvance = (() => {
    if (step === 0) return !!answers.theme
    if (step === 1) return !!answers.type
    if (step === 2) return !!answers.difficulty
    return true
  })()

  const next = () => { if (canAdvance && step < 3) setStep(step + 1) }
  const back = () => { if (step > 0) setStep(step - 1) }
  const reset = () => {
    setStep(0)
    setAnswers({ theme: null, type: null, difficulty: null })
  }

  return (
    <div className="fycm-backdrop" onClick={onClose}>
      <div
        className="fycm-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fycm-title"
      >
        <button className="fycm-x" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* progress bar */}
        <div className="fycm-progress">
          {STEP_LABELS.map((label, i) => (
            <div
              key={label}
              className={`fycm-step-pip ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`}
            >
              <span className="fycm-pip-dot">
                {i < step ? <Check size={11} strokeWidth={3} /> : i + 1}
              </span>
              <span className="fycm-pip-label mono">{label}</span>
            </div>
          ))}
        </div>

        <div className="fycm-body">
          {/* ── STEP 0: THEME ── */}
          {step === 0 && (
            <div className="fycm-panel">
              <span className="kicker mono">// Step 01</span>
              <h2 id="fycm-title">What kind of problem excites you?</h2>
              <p className="fycm-sub">Pick the theme that feels closest to what you&rsquo;d build.</p>

              <div className="fycm-theme-grid">
                {THEMES_DATA.map((t) => {
                  const Icon = t.icon
                  const on = answers.theme === t.short
                  return (
                    <button
                      key={t.short}
                      className={`fycm-theme-card ${on ? 'on' : ''} tc-accent-${t.accent}`}
                      onClick={() => setAnswers((a) => ({ ...a, theme: t.short }))}
                    >
                      <span className="fycm-theme-icon"><Icon size={20} /></span>
                      <span className="fycm-theme-label">{t.short}</span>
                      {on && <span className="fycm-theme-check"><Check size={14} strokeWidth={3} /></span>}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── STEP 1: TYPE ── */}
          {step === 1 && (
            <div className="fycm-panel">
              <span className="kicker mono">// Step 02</span>
              <h2>Software, hardware, or both?</h2>
              <p className="fycm-sub">This narrows down which problem statements fit your team best.</p>

              <div className="fycm-option-list">
                {TYPE_OPTIONS.map((o) => {
                  const on = answers.type === o.value
                  return (
                    <button
                      key={o.value}
                      className={`fycm-option ${on ? 'on' : ''}`}
                      onClick={() => setAnswers((a) => ({ ...a, type: o.value }))}
                    >
                      <span className="fycm-option-icon">
                        {o.value === 'Software' ? <Cpu size={20} /> :
                         o.value === 'Hardware' ? <Target size={20} /> :
                         <Sparkles size={20} />}
                      </span>
                      <span className="fycm-option-body">
                        <strong>{o.label}</strong>
                        <span>{o.desc}</span>
                      </span>
                      {on && <span className="fycm-option-check"><Check size={16} strokeWidth={3} /></span>}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── STEP 2: DIFFICULTY ── */}
          {step === 2 && (
            <div className="fycm-panel">
              <span className="kicker mono">// Step 03</span>
              <h2>How much challenge do you want?</h2>
              <p className="fycm-sub">Be honest — you&rsquo;ll spend the next 36 hours on this.</p>

              <div className="fycm-option-list">
                {DIFFICULTY_OPTIONS.map((o) => {
                  const on = answers.difficulty === o.value
                  return (
                    <button
                      key={o.value}
                      className={`fycm-option ${on ? 'on' : ''}`}
                      onClick={() => setAnswers((a) => ({ ...a, difficulty: o.value }))}
                    >
                      <span className={`fycm-diff-dot fycm-diff-${o.value.toLowerCase()}`} />
                      <span className="fycm-option-body">
                        <strong>{o.label}</strong>
                        <span>{o.desc}</span>
                      </span>
                      {on && <span className="fycm-option-check"><Check size={16} strokeWidth={3} /></span>}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── STEP 3: RESULTS ── */}
          {step === 3 && (
            <div className="fycm-panel">
              <span className="kicker mono">// Your matches</span>
              <h2>Here&rsquo;s what fits you best</h2>
              <p className="fycm-sub">
                Top 3 of {problems.length} problem statements, ranked by your answers.
              </p>

              <div className="fycm-results">
                {matched.map(({ problem: p, match }, i) => (
                  <article className="fycm-result" key={p.id} style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="fycm-result-rank mono">#{i + 1}</div>
                    <div className="fycm-result-main">
                      <div className="fycm-result-top">
                        <span className={`pill pill-${p.type.toLowerCase()}`}>{p.type}</span>
                        <span className={`pill diff diff-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                        <span className="fycm-match-badge mono">{match}% match</span>
                      </div>
                      <span className="mono fycm-result-code">{p.code} · {p.theme}</span>
                      <h3>{p.title}</h3>
                      <p className="fycm-result-desc">{p.description.slice(0, 140)}…</p>
                      <div className="fycm-result-meta">
                        <span><Building2 size={12} /> {p.ministry.replace('Ministry of ', '')}</span>
                        <span><Lightbulb size={12} /> {p.ideas} ideas</span>
                        <span><Award size={12} /> {p.prize}</span>
                      </div>
                      <div className="fycm-result-actions">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            onClose()
                            onSelectProblem?.(p)
                          }}
                        >
                          View details <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="fycm-results-foot">
                <button className="btn btn-ghost" onClick={reset}>
                  <RotateCcw size={14} /> Try different answers
                </button>
              </div>
            </div>
          )}
        </div>

        {/* footer nav */}
        {step < 3 && (
          <div className="fycm-nav">
            <button
              className="btn btn-ghost"
              onClick={back}
              disabled={step === 0}
            >
              <ArrowLeft size={15} /> Back
            </button>
            <span className="fycm-nav-hint mono">
              {step + 1} / {STEP_LABELS.length - 1}
            </span>
            <button
              className="btn btn-primary"
              onClick={next}
              disabled={!canAdvance}
            >
              {step === 2 ? 'See matches' : 'Next'} <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}