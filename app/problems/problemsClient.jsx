'use client'

import { useState, useMemo } from 'react'
import {
  Search, Filter, X, Layers, Building2, ArrowRight, Plus, Check,
} from 'lucide-react'
import PageTopBar from '../components/ui/PageTopBar'
import ProblemModal from '../components/ProblemModal'
import CompareModal from '../components/CompareModal'
import CompareDock from '../components/CompareDock'
import { useCompare } from '../contexts/CompareContext'
import { useToast } from '../contexts/ToastContext'

export default function ProblemsClient({ problems }) {
  const { notify } = useToast()
  const { compare, toggle } = useCompare()

  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [theme, setTheme] = useState('All')
  const [year, setYear] = useState('All')
  const [sort, setSort] = useState('code')
  const [selected, setSelected] = useState(null)

  const themes = useMemo(
    () => ['All', ...Array.from(new Set(problems.map((p) => p.theme))).sort()],
    [problems],
  )
  const years = useMemo(
    () => ['All', ...Array.from(new Set(problems.map((p) => p.year))).filter(Boolean).sort().reverse()],
    [problems],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = problems.filter((p) => {
      if (type !== 'All' && p.type !== type) return false
      if (theme !== 'All' && p.theme !== theme) return false
      if (year !== 'All' && String(p.year) !== String(year)) return false
      if (!q) return true
      return [
        p.title, p.ministry, p.department, p.theme, p.code,
        p.type, p.description,
      ].join(' ').toLowerCase().includes(q)
    })
    list = [...list].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'theme') return a.theme.localeCompare(b.theme)
      if (sort === 'ministry') return a.ministry.localeCompare(b.ministry)
      return String(a.code).localeCompare(String(b.code))
    })
    return list
  }, [problems, query, type, theme, year, sort])

  const activeFilterCount =
    (type !== 'All') + (theme !== 'All') + (year !== 'All') + (query.trim() ? 1 : 0)

  const resetFilters = () => {
    setQuery(''); setType('All'); setTheme('All'); setYear('All'); setSort('code')
  }

  return (
    <div className="problems-page">
      <PageTopBar
        title="All Problem Statements"
        count={`${filtered.length} / ${problems.length}`}
        className="pp-topbar"
      />

      <div className="container">
        <div className="filter-bar pp-filter">
          <div className="search-wrap">
            <Search size={17} className="search-icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, ministry, theme, PS code…"
              aria-label="Search problem statements"
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery('')} aria-label="Clear">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="filter-row">
            <div className="chip-group" role="group" aria-label="Type filter">
              {['All', 'Software', 'Hardware'].map((t) => (
                <button key={t} className={`chip ${type === t ? 'on' : ''}`} onClick={() => setType(t)}>{t}</button>
              ))}
            </div>

            <select className="select" value={theme} onChange={(e) => setTheme(e.target.value)} aria-label="Theme filter">
              {themes.map((t) => <option key={t} value={t}>{t === 'All' ? 'All themes' : t}</option>)}
            </select>

            <select className="select" value={year} onChange={(e) => setYear(e.target.value)} aria-label="Year filter">
              {years.map((y) => <option key={y} value={y}>{y === 'All' ? 'All years' : y}</option>)}
            </select>

            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
              <option value="code">PS code</option>
              <option value="title">A → Z</option>
              <option value="theme">Theme</option>
              <option value="ministry">Ministry</option>
            </select>

            {activeFilterCount > 0 && (
              <button className="btn-reset" onClick={resetFilters}>
                <X size={14} /> Clear ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="results-line">
            <Filter size={14} />
            <span>Showing <strong>{filtered.length}</strong> of {problems.length} problem statements</span>
          </div>
        </div>

        {problems.length === 0 && (
          <div className="empty">
            <X size={32} />
            <h3>No problem statements loaded</h3>
            <p>Check that <code>data/sih-2026-ps.csv</code> exists.</p>
          </div>
        )}

        {problems.length > 0 && filtered.length === 0 && (
          <div className="empty">
            <Search size={32} />
            <h3>No matches found</h3>
            <p>Try a different keyword or clear the filters.</p>
            <button className="btn btn-primary" onClick={resetFilters}>Reset filters</button>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="problems-grid pp-grid">
            {filtered.map((p) => {
              const inCompare = compare.includes(p.id)
              return (
                <article className="problem-card" key={p.id}>
                  <div className="pc-top">
                    <span className={`pill pill-${p.type.toLowerCase()}`}>{p.type}</span>
                    {p.year && <span className="pill diff diff-medium">{p.year}</span>}
                  </div>
                  <span className="mono pc-code">{p.code} · {p.theme}</span>
                  <h3>{p.title}</h3>
                  <p className="pc-desc">{p.shortDescription || p.description}</p>
                  <div className="pc-meta">
                    <span><Building2 size={13} /> {p.ministry}</span>
                    {p.department && <span><Layers size={13} /> {p.department}</span>}
                  </div>
                  <div className="pc-actions">
                    <button className="btn btn-sm btn-primary" onClick={() => setSelected(p)}>
                      View details
                    </button>
                    <button
                      className={`btn btn-sm btn-ghost ${inCompare ? 'active' : ''}`}
                      onClick={() => toggle(p.id, notify)}
                    >
                      {inCompare ? <Check size={14} /> : <Plus size={14} />}
                      {inCompare ? 'Added' : 'Compare'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {selected && <ProblemModal problem={selected} onClose={() => setSelected(null)} />}
      <CompareModal problems={problems} />
      <CompareDock problems={problems} />
    </div>
  )
}