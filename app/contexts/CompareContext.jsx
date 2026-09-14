'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  const [compare, setCompare] = useState([])
  const [showCompare, setShowCompare] = useState(false)

  const toggle = useCallback((id, notify) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) {
        notify?.('Compare limit reached', 'You can compare up to 3 problems at once.')
        return prev
      }
      return [...prev, id]
    })
  }, [])

  const clear = useCallback(() => setCompare([]), [])

  return (
    <CompareContext.Provider value={{ compare, toggle, clear, showCompare, setShowCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider')
  return ctx
}