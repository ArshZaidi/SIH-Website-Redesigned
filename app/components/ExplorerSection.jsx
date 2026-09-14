'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search, X, Filter, Building2, Lightbulb, Award, Plus, Check,
} from 'lucide-react'
import Reveal from './ui/Reveal'
import ProblemModal from './ProblemModal'
import { useCompare } from '../contexts/CompareContext'
import { useToast } from '../contexts/ToastContext'

const DIFF_ORDER = { Easy: 1, Medium: 2, Hard: 3 }

const THEME_LIST = [
  'MedTech', 'AgriTech', 'Smart Automation', 'CleanTech', 'Mobility',
  'EdTech', 'FinTech', 'Disaster Mgmt', 'Tourism', 'Space', 'Robotics', 'Blockchain',
]

export default function ExplorerSection({ problems }) {
  const router = useRouter()
  const { notify } = useToast()
  const { compare, toggle } = useCompare()

  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [theme, setTheme] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [sort, setSort] = useState('popular')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = problems.filter((p) => {
      if (type !== 'All' && p.type !== type) return false
      if (theme !== 'All' && p.theme !== theme) return false
      if (difficulty !== 'All' && p.difficulty !== difficulty) return false
      if (!q) return true
      return [p.title, p.ministry, p.theme, p.code, p.type, p.difficulty, p.description, ...(p.tags || [])]
        .join(' ').toLowerCase().includes(q)
    })
    list = [...list].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'difficulty') return DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]
      return b.ideas - a.ideas
    })
    return list
  }, [problems, query, type, theme, difficulty, sort])

  const activeFilterCount =
    (type !== 'All') + (theme !== 'All') + (difficulty !== 'All') + (query.trim() ? 1 : 0)

  const reset = () => {
    setQuery(''); setType('All'); setTheme('All'); setDifficulty('All'); setSort('popular')
  }

  return (
    <section className="section" id="explorer">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="kicker mono">// Explorer</span>
            <h2>Find the problem you were built for</h2>
            <p>Search, filter and compare every problem statement in one place.</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="filter-bar">
            <div className="search-wrap">
              <Search size={17} className="search-icon" />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, ministry, tag, code…" aria-label="Search problem statements" />
              {query && (
                <button className="clear-btn" onClick={() => setQuery('')} aria-label="Clear search"><X size={14} /></button>
              )}
            </div>

            <div className="filter-row">
              <div className="chip-group" role="group">
                {['All', 'Software', 'Hardware'].map((t) => (
                  <button key={t} className={`chip ${type === t ? 'on' : ''}`} onClick={() => setType(t)}>{t}</button>
                ))}
              </div>
              <div className="chip-group" role="group">
                {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                  <button key={d} className={`chip ${difficulty === d ? 'on' : ''}`} onClick={() => setDifficulty(d)}>{d}</button>
                ))}
              </div>
              <select className="select" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="All">All themes</option>
                {THEME_LIST.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="popular">Most ideas</option>
                <option value="ideas">Fewest ideas</option>
                <option value="title">A → Z</option>
                <option value="difficulty">Easiest first</option>
              </select>
              {activeFilterCount > 0 && (
                <button className="btn-reset" onClick={reset}><X size={14} /> Clear ({activeFilterCount})</button>
              )}
            </div>

            <div className="results-line">
              <Filter size={14} />
              <span>
                Showing <strong>{filtered.length}</strong> of {problems.length} problem statements
                {' · '}
                <button className="link-inline" onClick={() => router.push('/problems')}>View all →</button>
              </span>
            </div>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <Reveal>
            <div className="empty">
              <Search size={32} /><h3>No matches found</h3>
              <p>Try a different keyword or clear the filters to see everything.</p>
              <button className="btn btn-primary" onClick={reset}>Reset filters</button>
            </div>
          </Reveal>
        ) : (
          <div className="problems-grid">
            {filtered.slice(0, 6).map((p, i) => {
              const inCompare = compare.includes(p.id)
              return (
                <Reveal key={p.id} delay={Math.min(i * 50, 300)}>
                  <article className="problem-card">
                    <div className="pc-top">
                      <span className={`pill pill-${p.type.toLowerCase()}`}>{p.type}</span>
                      <span className={`pill diff diff-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                    </div>
                    <span className="mono pc-code">{p.code} · {p.theme}</span>
                    <h3>{p.title}</h3>
                    <p className="pc-desc">{p.description}</p>
                    <div className="pc-tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                    <div className="pc-meta">
                      <span><Building2 size={13} /> {p.ministry.replace('Ministry of ', '')}</span>
                      <span><Lightbulb size={13} /> {p.ideas}</span>
                      <span><Award size={13} /> {p.prize}</span>
                    </div>
                    <div className="pc-actions">
                      <button className="btn btn-sm btn-primary" onClick={() => setSelected(p)}>View details</button>
                      <button className={`btn btn-sm btn-ghost ${inCompare ? 'active' : ''}`} onClick={() => toggle(p.id, notify)}>
                        {inCompare ? <Check size={14} /> : <Plus size={14} />}
                        {inCompare ? 'Added' : 'Compare'}
                      </button>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        )}

        {filtered.length > 6 && (
          <Reveal>
            <div className="preview-cta">
              <button className="btn btn-primary" onClick={() => router.push('/problems')}>
                View all {filtered.length} problem statements
              </button>
            </div>
          </Reveal>
        )}
      </div>

      {selected && <ProblemModal problem={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}