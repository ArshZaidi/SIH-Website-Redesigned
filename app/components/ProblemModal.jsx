'use client'

import {
  X, Building2, Check, Plus, ExternalLink,
} from 'lucide-react'
import { useCompare } from '../contexts/CompareContext'
import { useToast } from '../contexts/ToastContext'

export default function ProblemModal({ problem, onClose }) {
  const { compare, toggle } = useCompare()
  const { notify } = useToast()
  const inCompare = compare.includes(problem.id)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="modal-body">
          <div className="modal-top">
            <span className={`pill pill-${problem.type.toLowerCase()}`}>{problem.type}</span>
            <span className={`pill diff diff-${problem.difficulty.toLowerCase()}`}>
              {problem.difficulty}
            </span>
            <span className="mono modal-code">{problem.code}</span>
          </div>

          <h2>{problem.title}</h2>

          <p className="modal-ministry">
            <Building2 size={14} /> {problem.ministry}
          </p>

          {problem.department && (
            <p className="modal-ministry">{problem.department}</p>
          )}

          <p className="modal-desc">{problem.description}</p>

          <div className="modal-grid">
            <div><span>Theme</span><strong>{problem.theme}</strong></div>
            <div><span>Ideas submitted</span><strong>{problem.ideas ?? '—'}</strong></div>
            <div><span>Prize</span><strong>{problem.prize ?? '—'}</strong></div>
            <div><span>Eligibility</span><strong>{problem.eligibility ?? '—'}</strong></div>
          </div>

          {problem.tags?.length > 0 && (
            <div className="modal-tags">
              {problem.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          )}

          {(problem.youtube || problem.dataset) && (
            <div className="modal-links">
              {problem.youtube && (
                <a href={problem.youtube} target="_blank" rel="noreferrer noopener" className="modal-link">
                  <ExternalLink size={14} /> Reference video
                </a>
              )}
              {problem.dataset && (
                <a href={problem.dataset} target="_blank" rel="noreferrer noopener" className="modal-link">
                  <ExternalLink size={14} /> Dataset / resource
                </a>
              )}
            </div>
          )}

          <div className="modal-actions">
            <button
              className={`btn btn-primary ${inCompare ? 'active' : ''}`}
              onClick={() => toggle(problem.id, notify)}
            >
              {inCompare ? <Check size={16} /> : <Plus size={16} />}
              {inCompare ? 'Added to compare' : 'Add to compare'}
            </button>
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}