'use client'

import { X } from 'lucide-react'
import { useCompare } from '../contexts/CompareContext'

export default function CompareModal({ problems }) {
  const { compare, showCompare, setShowCompare } = useCompare()
  const items = compare.map((id) => problems.find((p) => p.id === id)).filter(Boolean)

  if (!showCompare || items.length < 2) return null

  return (
    <div className="modal-backdrop" onClick={() => setShowCompare(false)}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={() => setShowCompare(false)} aria-label="Close"><X size={20} /></button>
        <div className="modal-body">
          <h2>Side-by-side comparison</h2>
          <div className="compare-table">
            <div className="ct-row ct-head">
              <div className="ct-label">Attribute</div>
              {items.map((p) => <div key={p.id}>{p.code}</div>)}
            </div>
            {[
              ['Title', (p) => p.title], ['Type', (p) => p.type], ['Theme', (p) => p.theme],
              ['Difficulty', (p) => p.difficulty], ['Ministry', (p) => p.ministry.replace('Ministry of ', '')],
              ['Ideas', (p) => p.ideas ?? '—'], ['Prize', (p) => p.prize ?? '—'], ['Eligibility', (p) => p.eligibility ?? '—'],
            ].map(([label, fn]) => (
              <div className="ct-row" key={label}>
                <div className="ct-label">{label}</div>
                {items.map((p) => <div key={p.id}>{fn(p)}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}