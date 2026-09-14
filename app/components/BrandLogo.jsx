'use client'

import { useState } from 'react'

export default function BrandLogo({ size = 44, alt = 'Smart India Hackathon' }) {
  const [status, setStatus] = useState('loading')
  return (
    <span className="brand-logo-wrap" style={{ width: size, height: size }}>
      {status !== 'failed' && (
        <img src="/logos/sih-logo.svg" alt={alt} className="brand-logo"
          onLoad={() => setStatus('ok')}
          onError={() => { console.warn('[BrandLogo] /logos/sih-logo.svg not found — using fallback mark'); setStatus('failed') }} />
      )}
      {status === 'failed' && (
        <span className="brand-mark" aria-hidden="true">
          <span className="bm-saffron" /><span className="bm-green" />
        </span>
      )}
    </span>
  )
}