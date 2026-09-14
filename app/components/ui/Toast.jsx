'use client'

import { useEffect } from 'react'
import { Check, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onClose, 3600)
    return () => clearTimeout(t)
  }, [toast, onClose])
  if (!toast) return null
  return (
    <div className="toast" role="status" aria-live="polite" key={toast.id}>
      <div className="toast-icon"><Check size={16} strokeWidth={2.4} /></div>
      <div className="toast-body">
        <strong>{toast.title}</strong>
        {toast.msg && <span>{toast.msg}</span>}
      </div>
      <button className="toast-x" onClick={onClose} aria-label="Dismiss"><X size={14} /></button>
    </div>
  )
}