'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

export default function StarRating({ value, onChange, size = 22, readOnly = false }) {
  const [hover, setHover] = useState(0)
  return (
    <div className={`stars ${readOnly ? 'readonly' : ''}`} role={readOnly ? undefined : 'radiogroup'}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover || value) >= n
        return (
          <button key={n} type="button" className={`star-btn ${active ? 'on' : ''}`} disabled={readOnly}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            onMouseEnter={() => !readOnly && setHover(n)} onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => !readOnly && onChange?.(n)}>
            <Star size={size} strokeWidth={1.6} fill={active ? 'currentColor' : 'none'} />
          </button>
        )
      })}
    </div>
  )
}