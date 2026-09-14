'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PageTopBar({ title, count, className = 'pp-topbar' }) {
  return (
    <div className={className}>
      <Link href="/" className="pp-back">
        <ArrowLeft size={18} /> Back to home
      </Link>
      <h1>{title}</h1>
      {count != null && <span className="pp-count mono">{count}</span>}
    </div>
  )
}