import { X, Layers, ArrowRight } from 'lucide-react'

/**
 * CompareDock — two possible uses:
 *
 * 1. As a MODAL  → pass `variant="modal"` and `onClose`
 *    (renders the full side-by-side table)
 *
 * 2. As the bottom DOCK → pass `variant="dock"` plus:
 *      - items: array of problem objects currently in compare
 *      - onRemove(id)
 *      - onClear()
 *      - onOpen()   → opens the modal
 *
 * The default export is a smart component that renders either mode.
 */
export default function CompareDock({
  items = [],
  onClose,
  onRemove,
  onClear,
  onOpen,
  variant = 'modal',
}) {
  /* =====================================================
     MODAL MODE — full comparison table
     ===================================================== */
  if (variant === 'modal') {
    if (!items || items.length < 2) return null

    const rows = [
      ['Title', (p) => p.title],
      ['PS Code', (p) => p.code],
      ['Type', (p) => p.type],
      ['Theme', (p) => p.theme],
      ['Year', (p) => p.year ?? '—'],
      ['Ministry', (p) => p.ministry],
      ['Department', (p) => p.department || '—'],
      ['Difficulty', (p) => p.difficulty || '—'],
      ['Ideas', (p) => p.ideas ?? '—'],
      ['Prize', (p) => p.prize || '—'],
      ['Eligibility', (p) => p.eligibility || '—'],
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
            className="modal-x"
            onClick={onClose}
            aria-label="Close comparison"
          >
            <X size={20} />
          </button>

          <div className="modal-body">
            <h2 id="compare-modal-title">Side-by-side comparison</h2>
            <p className="form-sub">
              Comparing {items.length} problem statements.
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

              {rows.map(([label, fn]) => (
                <div className="ct-row" key={label}>
                  <div className="ct-label">{label}</div>
                  {items.map((p) => (
                    <div key={p.id}>{fn(p)}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* =====================================================
     DOCK MODE — floating bottom bar
     ===================================================== */
  if (!items.length) return null

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
              <button
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
            className="btn btn-sm btn-ghost"
            onClick={onClear}
            disabled={!items.length}
          >
            Clear
          </button>
          <button
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