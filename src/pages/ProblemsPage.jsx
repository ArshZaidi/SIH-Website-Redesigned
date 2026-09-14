import { useState, useMemo, useEffect } from 'react'
import {
  Search, Filter, X, ArrowLeft, Layers, Building2, Lightbulb,
  ArrowRight, Plus, Check, Award, ExternalLink,
} from 'lucide-react'
import { loadProblems } from '../data/loadProblems'
import ProblemModal from '../components/ProblemModal'
import CompareDock from '../components/CompareDock'

const DIFF_ORDER = { Easy: 1, Medium: 2, Hard: 3 }

export default function ProblemsPage({ onBack }) {
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [theme, setTheme] = useState('All')
  const [year, setYear] = useState('All')
  const [sort, setSort] = useState('code')

  const [selected, setSelected] = useState(null)
  const [compare, setCompare] = useState([])
  const [showCompare, setShowCompare] = useState(false)

  /* load CSV once */
  useEffect(() => {
    let alive = true
    loadProblems()
      .then((list) => {
        if (alive) { setAll(list); setLoading(false) }
      })
      .catch((e) => {
        if (alive) { setError(e.message); setLoading(false) }
      })
    return () => { alive = false }
  }, [])

  /* scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0) }, [])

  /* lock body when overlay open */
  const anyOverlay = !!selected || showCompare
  useEffect(() => {
    document.body.classList.toggle('no-scroll', anyOverlay)
    return () => document.body.classList.remove('no-scroll')
  }, [anyOverlay])

  /* esc */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setSelected(null); setShowCompare(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* derived option lists */
  const themes = useMemo(
    () => ['All', ...Array.from(new Set(all.map((p) => p.theme))).sort()],
    [all],
  )
  const years = useMemo(
    () => ['All', ...Array.from(new Set(all.map((p) => p.year))).filter(Boolean).sort().reverse()],
    [all],
  )

  /* filter + sort */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = all.filter((p) => {
      if (type !== 'All' && p.type !== type) return false
      if (theme !== 'All' && p.theme !== theme) return false
      if (year !== 'All' && String(p.year) !== String(year)) return false
      if (!q) return true
      return [p.title, p.ministry, p.department, p.theme, p.code, p.type, p.description]
        .join(' ').toLowerCase().includes(q)
    })
    list = [...list].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'theme') return a.theme.localeCompare(b.theme)
      if (sort === 'ministry') return a.ministry.localeCompare(b.ministry)
      return String(a.code).localeCompare(String(b.code))
    })
    return list
  }, [all, query, type, theme, year, sort])

  const activeFilterCount =
    (type !== 'All') + (theme !== 'All') + (year !== 'All') + (query.trim() ? 1 : 0)

  const resetFilters = () => {
    setQuery(''); setType('All'); setTheme('All'); setYear('All'); setSort('code')
  }

  const toggleCompare = (id) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }
  const compareItems = useMemo(
    () => compare.map((id) => all.find((p) => p.id === id)).filter(Boolean),
    [compare, all],
  )

  return (
    <div className="problems-page">
      {/* ── top bar ── */}
      <div className="pp-topbar">
        <button className="pp-back" onClick={onBack}>
          <ArrowLeft size={18} /> Back to home
        </button>
        <h1>All Problem Statements</h1>
        <span className="pp-count mono">
          {loading ? '…' : `${filtered.length} / ${all.length}`}
        </span>
      </div>

      <div className="container">
        {/* ── filter bar ── */}
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
                <button key={t} className={`chip ${type === t ? 'on' : ''}`} onClick={() => setType(t)}>
                  {t}
                </button>
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
            <span>
              Showing <strong>{loading ? '…' : filtered.length}</strong> of {all.length} problem statements
            </span>
          </div>
        </div>

        {/* ── states ── */}
        {loading && (
          <div className="pp-skeleton-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="pp-skeleton" />
            ))}
          </div>
        )}

        {error && (
          <div className="empty">
            <X size={32} />
            <h3>Could not load problem statements</h3>
            <p>{error}</p>
            <p className="pp-hint mono">
              Make sure <code>src/data/sih-problems.csv</code> exists.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty">
            <Search size={32} />
            <h3>No matches found</h3>
            <p>Try a different keyword or clear the filters.</p>
            <button className="btn btn-primary" onClick={resetFilters}>Reset filters</button>
          </div>
        )}

        {/* ── grid ── */}
        {!loading && !error && filtered.length > 0 && (
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
                  <p className="pc-desc">{p.description}</p>
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
                      onClick={() => toggleCompare(p.id)}
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

      {/* ── modals ── */}
      {selected && (
        <ProblemModal
          problem={selected}
          onClose={() => setSelected(null)}
          inCompare={compare.includes(selected.id)}
          onToggleCompare={() => toggleCompare(selected.id)}
        />
      )}

      {showCompare && compareItems.length >= 2 && (
        <CompareDock
          items={compareItems}
          onClose={() => setShowCompare(false)}
        />
      )}

      {compare.length > 0 && (
        <div className="compare-dock">
          <div className="dock-inner">
            <span className="dock-label mono"><Layers size={14} /> Compare ({compare.length}/3)</span>
            <div className="dock-items">
              {compareItems.map((p) => (
                <div key={p.id} className="dock-chip">
                  <span>{p.code}</span>
                  <button onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.code}`}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="dock-actions">
              <button className="btn btn-sm btn-ghost" onClick={() => setCompare([])}>Clear</button>
              <button
                className="btn btn-sm btn-primary"
                disabled={compare.length < 2}
                onClick={() => setShowCompare(true)}
              >
                Compare now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}