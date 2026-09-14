'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/ui/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const notify = useCallback((title, msg) => {
    setToast({ id: Date.now(), title, msg })
  }, [])
  const clear = useCallback(() => setToast(null), [])

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <Toast toast={toast} onClose={clear} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}