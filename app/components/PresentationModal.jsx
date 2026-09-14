'use client'

import { X, Download, ExternalLink } from 'lucide-react'

export default function PresentationModal({
  open,
  onClose,
  title = 'Presentation',
  embedUrl,
  downloadUrl,
}) {
  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal modal-wide presentation-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="presentation-title"
      >
        <button className="modal-x" onClick={onClose} aria-label="Close"><X size={20} /></button>

        <div className="pm-header">
          <h2 id="presentation-title">{title}</h2>
          {downloadUrl && (
            <a className="btn btn-sm btn-ghost" href={downloadUrl} download rel="noreferrer noopener">
              <Download size={14} /> Download
            </a>
          )}
        </div>

        <div className="pm-embed">
          {embedUrl ? (
            <iframe src={embedUrl} title={title} frameBorder="0" allowFullScreen />
          ) : (
            <div className="pm-fallback">
              <ExternalLink size={28} />
              <p>No presentation source configured.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}