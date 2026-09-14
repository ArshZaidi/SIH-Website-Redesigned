'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import PageTopBar from '../components/ui/PageTopBar'
import { FAQ_ITEMS, FAQ_CATEGORIES } from '@/data/faqData'

export default function FAQClient() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [open, setOpen] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQ_ITEMS.filter((f) => {
      if (category !== 'All' && f.category !== category) return false
      if (!q) return true
      return (f.q + ' ' + f.a).toLowerCase().includes(q)
    })
  }, [query, category])

  const grouped = useMemo(() => {
    const map = new Map()
    for (const item of filtered) {
      if (!map.has(item.category)) map.set(item.category, [])
      map.get(item.category).push(item)
    }
    return Array.from(map.entries())
  }, [filtered])

  const activeFilterCount = (query.trim() ? 1 : 0) + (category !== 'All' ? 1 : 0)
  const reset = () => { setQuery(''); setCategory('All') }
  const labelFor = (id) => FAQ_CATEGORIES.find((c) => c.id === id)?.label || id

  return (
    <div className="faq-page">
      <PageTopBar
        title="Frequently Asked Questions"
        count={`${filtered.length} / ${FAQ_ITEMS.length}`}
        className="faq-topbar"
      />

      <div className="container">
        <section className="faq-hero">
          <span className="kicker mono">// Help Centre</span>
          <h1>Everything you wanted to ask</h1>
          <p>Search across {FAQ_ITEMS.length} questions or browse by category.</p>
        </section>

        <div className="filter-bar faq-filter">
          <div className="search-wrap">
            <Search size={17} className="search-icon" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs…" aria-label="Search FAQs" />
            {query && (
              <button className="clear-btn" onClick={() => setQuery('')} aria-label="Clear"><X size={14} /></button>
            )}
          </div>

          <div className="filter-row">
            <button className={`chip ${category === 'All' ? 'on' : ''}`} onClick={() => setCategory('All')}>All</button>
            {FAQ_CATEGORIES.map((c) => (
              <button key={c.id} className={`chip ${category === c.id ? 'on' : ''}`} onClick={() => setCategory(c.id)}>
                {c.label}
              </button>
            ))}
            {activeFilterCount > 0 && (
              <button className="btn-reset" onClick={reset}><X size={14} /> Clear ({activeFilterCount})</button>
            )}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="empty">
            <Search size={32} />
            <h3>No matching questions</h3>
            <p>Try a different keyword, or clear the filters to see everything.</p>
            <button className="btn btn-primary" onClick={reset}>Reset filters</button>
          </div>
        )}

        {grouped.map(([catId, items]) => (
          <section className="faq-group" key={catId}>
            <h2 className="faq-group-title">
              <span className="mono">{labelFor(catId)}</span>
              <span className="faq-group-count">{items.length}</span>
            </h2>
            <div className="faq">
              {items.map((f) => (
                <div key={f.id} className={`faq-item ${open === f.id ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpen(open === f.id ? null : f.id)} aria-expanded={open === f.id}>
                    <span>{f.q}</span>
                    <ChevronDown size={18} className="faq-chev" />
                  </button>
                  <div className="faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="faq-cta">
          <h3>Still have questions?</h3>
          <p>Reach out to the SIH secretariat and we&rsquo;ll get back to you.</p>
          <a className="btn btn-primary" href="mailto:sih@aicte-india.org">Write to sih@aicte-india.org</a>
        </div>
      </div>
    </div>
  )
}