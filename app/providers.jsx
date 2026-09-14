'use client'

import { ToastProvider } from './contexts/ToastContext'
import { CompareProvider } from './contexts/CompareContext'

export default function Providers({ children }) {
  return (
    <ToastProvider>
      <CompareProvider>{children}</CompareProvider>
    </ToastProvider>
  )
}