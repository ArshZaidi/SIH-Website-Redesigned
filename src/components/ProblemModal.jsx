import { X, Layers, ArrowRight } from 'lucide-react'

export function CompareModal({ items = [], onClose }) {
  if (items.length < 2) return null

  const rows = [
    ['Title',        (p) => p.title],
    ['PS Code',      (p) => p.code],
    ['Type',         (p) => p.type],
    ['Theme',        (p) => p.theme],
    ['Year',         (p) => p.year ?? '—'],
    ['Ministry',     (p) => p.ministry || '—'],
    ['Department',   (p) => p.department || '—'],
    ['Difficulty',   (p) => p.difficulty || '—'],
    ['Ideas',        (p) => p.ideas ?? '—'],
    ['Prize',        (p) => p.prize || '—'],
    ['Eligibility',  (p) => p.eligibility || '—'],
  ]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal modal-wide"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
      >
        <button
          type="button"
          className="modal-x"
          onClick={onClose}
          aria-label="Close comparison"
        >
          <X size={20} />
        </button>

        <div className="modal-body">
          <h2 id="compare-modal-title">Side-by-side comparison</h2>
          <p className="form-sub">
            Comparing {items.length} problem statement{items.length !== 1 ? 's' : ''}.
          </p>

          <div className="compare-table">
            <div className="ct-row ct-head">
              <div className="ct-label">Attribute</div>
              {items.map((p) => (
                <div key={p.id} className="ct-col-head">
                  {p.code}
                </div>
              ))}
            </div>

            {rows.map(([label, render]) => (
              <div className="ct-row" key={label}>
                <div className="ct-label">{label}</div>
                {items.map((p) => (
                  <div key={p.id}>{render(p)}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   CompareDock — floating bottom bar
   ========================================================= */
export function CompareDock({
  items = [],
  onRemove,
  onClear,
  onOpen,
}) {
  if (items.length === 0) return null

  return (
    <div className="compare-dock" role="region" aria-label="Comparison tray">
      <div className="dock-inner">
        <span className="dock-label mono">
          <Layers size={14} /> Compare ({items.length}/3)
        </span>

        <div className="dock-items">
          {items.map((p) => (
            <div key={p.id} className="dock-chip">
              <span>{p.code}</span>
              <button
                type="button"
                onClick={() => onRemove?.(p.id)}
                aria-label={`Remove ${p.code} from comparison`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="dock-actions">
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={onClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            disabled={items.length < 2}
            onClick={onOpen}
          >
            Compare now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   Default export — keeps backward compatibility with the
   old single-component API (variant prop)
   ========================================================= */
export default function CompareDockSwitcher(props) {
  const { variant = 'modal' } = props
  if (variant === 'dock') return <CompareDock {...props} />
  return <CompareModal {...props} />
}