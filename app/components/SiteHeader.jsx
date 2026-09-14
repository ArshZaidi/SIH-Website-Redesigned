'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Menu, X, ArrowRight, Archive, Rocket, UserCheck, Presentation,
} from 'lucide-react'
import BrandLogo from './BrandLogo'
import PresentationModal from './PresentationModal'

export default function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showDeck, setShowDeck] = useState(false)

  const goToSection = (id) => {
    setMenuOpen(false)
    if (pathname !== '/') {
      router.push(`/#${id}`)
      // slight delay to let navigation complete, then scroll
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goTop = () => {
    setMenuOpen(false)
    if (pathname !== '/') router.push('/')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className={`header ${menuOpen ? 'open' : ''}`}>
        <div className="header-inner">
          <button className="brand" onClick={goTop} aria-label="Go to top">
            <BrandLogo size={44} />
            <span className="brand-text">
              <strong>Smart India</strong>
              <em>Hackathon</em>
            </span>
          </button>

          <nav className={`nav ${menuOpen ? 'show' : ''}`}>
            <Link href="/problems" className="nav-link" onClick={() => setMenuOpen(false)}>Problems</Link>

            {[
              ['Journey', 'journey'],
              ['Timeline', 'timeline'],
              ['Themes', 'themes'],
              ['Milestones', 'milestones'],
            ].map(([label, id]) => (
              <button key={id} onClick={() => goToSection(id)} className="nav-link">{label}</button>
            ))}

            <Link href="/archive" className="nav-link" onClick={() => setMenuOpen(false)}>
              <Archive size={15} /> Archive
            </Link>

            <Link href="/implementation" className="nav-link" onClick={() => setMenuOpen(false)}>
              <Rocket size={15} /> Implementation
            </Link>

            <Link href="/spoc" className="nav-link nav-link-spoc" onClick={() => setMenuOpen(false)}>
              <UserCheck size={15} /> SPOC
            </Link>

            <Link href="/faq" className="nav-link" onClick={() => setMenuOpen(false)}>FAQ</Link>

            <button className="nav-link" onClick={() => { setMenuOpen(false); setShowDeck(true) }}>
              <Presentation size={15} /> Deck
            </button>

            <button className="nav-cta" onClick={() => goToSection('contact')}>
              Contact <ArrowRight size={15} />
            </button>
          </nav>

          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className="header-glow" />
      </header>

      <PresentationModal
        open={showDeck}
        onClose={() => setShowDeck(false)}
        title="Smart India Hackathon — Official Deck"
        embedUrl="/sih-2026-deck.pdf"
        downloadUrl="/sih-2026-deck.pdf"
      />
    </>
  )
}