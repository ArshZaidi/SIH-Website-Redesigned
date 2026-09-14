'use client'

import { Layers, X } from 'lucide-react'
import { useCompare } from '../contexts/CompareContext'

export default function CompareDock({ problems }) {
  const { compare, toggle, clear, setShowCompare } = useCompare()
  const items = compare.map((id) => problems.find((p) => p.id === id)).filter(Boolean)

  if (items.length === 0) return null

  return (
    <div className="compare-dock">
      <div className="dock-inner">
        <span className="dock-label mono">
          <Layers size={14} /> Compare ({items.length}/3)
        </span>

        <div className="dock-items">
          {items.map((p) => (
            <div key={p.id} className="dock-chip">
              <span>{p.code}</span>
              <button onClick={() => toggle(p.id)} aria-label={`Remove ${p.code}`}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="dock-actions">
          <button className="btn btn-sm btn-ghost" onClick={clear}>Clear</button>
          <button
            className="btn btn-sm btn-primary"
            disabled={items.length < 2}
            onClick={() => setShowCompare(true)}
          >
            Compare now
          </button>
        </div>
      </div>
    </div>
  )
}