'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import BrandLogo from './BrandLogo'
import { useCompare } from '../contexts/CompareContext'

export default function SiteFooter() {
  const pathname = usePathname()
  const router = useRouter()
  const { } = useCompare() // ensures compare context is available

  const goToSection = (id) => {
    if (pathname !== '/') {
      router.push(`/#${id}`)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <BrandLogo size={40} />
          <div>
            <strong>Smart India Hackathon</strong>
            <p className="mono">A student redesign concept · Not an official platform</p>
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <h5>Explore</h5>
            <Link href="/problems">Problem statements</Link>
            <button onClick={() => goToSection('journey')}>How it works</button>
            <button onClick={() => goToSection('timeline')}>Timeline</button>
            <button onClick={() => goToSection('themes')}>Themes</button>
            <Link href="/spoc">Know Your SPOC</Link>
          </div>
          <div>
            <h5>Resources</h5>
            <Link href="/archive">Editions archive</Link>
            <Link href="/implementation">Project Implementation</Link>
            <Link href="/idea-template">Idea template</Link>
            <Link href="/evaluation-rubric">Evaluation rubric</Link>
            <Link href="/prototype-kits">Prototype kits</Link>
            <Link href="/mentor-office-hours">Mentor office hours</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div>
            <h5>Engage</h5>
            <button onClick={() => goToSection('find-challenge')}>Find your challenge</button>
            <button onClick={() => goToSection('reviews')}>Read reviews</button>
            <button onClick={() => goToSection('participate')}>Participate</button>
            <button onClick={() => goToSection('committee')}>Organising team</button>
            <button onClick={() => goToSection('contact')}>Contact Us</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="mono">© 2026 Smart India Hackathon · Redesign concept</span>
        <span className="mono">Built with Next.js</span>
      </div>
    </footer>
  )
}