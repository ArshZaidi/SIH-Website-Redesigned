'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Search, X, Building2, Mail, Phone, MapPin, User, Loader2,
  CheckCircle2, AlertCircle,
} from 'lucide-react'
import PageTopBar from '../components/ui/PageTopBar'
import { fetchSPOCs, searchSPOCs } from '@/data/spocData'

export default function SpocClient() {
  const [spocs, setSpocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [stateFilter, setStateFilter] = useState('All')

  useEffect(() => {
    let alive = true
    fetchSPOCs()
      .then((data) => { if (alive) { setSpocs(data); setLoading(false) } })
      .catch((e) => { if (alive) { setError(e.message); setLoading(false) } })
    return () => { alive = false }
  }, [])

  const states = useMemo(
    () => ['All', ...Array.from(new Set(spocs.map((s) => s.state))).sort()],
    [spocs],
  )

  const filtered = useMemo(() => {
    let list = searchSPOCs(spocs, query)
    if (stateFilter !== 'All') list = list.filter((s) => s.state === stateFilter)
    return list
  }, [spocs, query, stateFilter])

  const activeFilterCount = (query.trim() ? 1 : 0) + (stateFilter !== 'All' ? 1 : 0)
  const reset = () => { setQuery(''); setStateFilter('All') }

  return (
    <div className="spoc-page">
      <PageTopBar
        title="Know Your SPOC"
        count={loading ? '…' : `${filtered.length} / ${spocs.length}`}
        className="spoc-topbar"
      />

      <div className="container">
        <div className="spoc-intro">
          <div className="spoc-intro-icon"><User size={22} /></div>
          <div>
            <h2>Find your institute&rsquo;s Single Point of Contact</h2>
            <p>Every participating institute appoints at least one SPOC — a faculty member responsible for verifying team registrations, coordinating with the SIH secretariat, and guiding teams through the competition lifecycle.</p>
          </div>
        </div>

        <div className="filter-bar spoc-filter">
          <div className="search-wrap">
            <Search size={17} className="search-icon" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by institute name, code, state, SPOC name or email…" aria-label="Search SPOCs" />
            {query && (
              <button className="clear-btn" onClick={() => setQuery('')} aria-label="Clear"><X size={14} /></button>
            )}
          </div>
          <div className="filter-row">
            <select className="select" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} aria-label="State filter">
              {states.map((s) => <option key={s} value={s}>{s === 'All' ? 'All states' : s}</option>)}
            </select>
            {activeFilterCount > 0 && (
              <button className="btn-reset" onClick={reset}><X size={14} /> Clear ({activeFilterCount})</button>
            )}
          </div>
          <div className="results-line">
            <CheckCircle2 size={14} />
            <span>
              Showing <strong>{filtered.length}</strong> of {spocs.length} institutes
              {loading && <Loader2 size={14} className="spin" style={{ marginLeft: 8 }} />}
            </span>
          </div>
        </div>

        {loading && (
          <div className="spoc-skeleton-grid">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="spoc-skeleton" />)}
          </div>
        )}

        {error && !loading && (
          <div className="empty">
            <AlertCircle size={32} />
            <h3>Could not load SPOC data</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty">
            <Search size={32} />
            <h3>No matching institutes</h3>
            <p>Try a different name, code or state.</p>
            <button className="btn btn-primary" onClick={reset}>Reset filters</button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="spoc-grid">
            {filtered.map((s) => (
              <article className="spoc-card" key={s.id}>
                <div className="spoc-card-top">
                  <div className="spoc-avatar" aria-hidden="true">{s.code.slice(0, 3)}</div>
                  <span className={`spoc-status spoc-status-${s.status}`}>
                    {s.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </div>
                <h3>{s.institute}</h3>
                <span className="mono spoc-code">{s.code}</span>
                <div className="spoc-fields">
                  <span><User size={13} /> {s.spocName}</span>
                  <span><Mail size={13} /> {s.email}</span>
                  <span><Phone size={13} /> {s.phone}</span>
                  <span><MapPin size={13} /> {s.state}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}