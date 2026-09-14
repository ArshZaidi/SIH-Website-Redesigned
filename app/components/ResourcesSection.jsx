'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen, Target, Rocket, Zap, ArrowUpRight, ChevronDown,
} from 'lucide-react'
import Reveal from './ui/Reveal'

const FAQS = [
  { q: 'Who can participate in Smart India Hackathon?',
    a: 'Any full-time student enrolled in a recognised Indian institution (UG, PG, or PhD) can participate. Teams must have 6 members with at least one female member and a nominated mentor.' },
  { q: 'Is there a registration fee?',
    a: 'No. Participation in SIH is completely free for students. Travel and stay for the grand finale are supported by the organising ministry.' },
  { q: 'Can a team submit ideas for more than one problem statement?',
    a: 'Yes — a team may submit ideas for multiple problem statements during the idea phase, but can only compete with one at the grand finale.' },
  { q: 'What is the prize for the winning team?',
    a: 'Each winning team receives ₹1,00,000 in prize money along with incubation and mentorship support from partner organisations.' },
]

const RESOURCES = [
  { icon: BookOpen, title: 'Idea Submission Template', desc: 'The exact deck structure the jury expects.', href: '/idea-template' },
  { icon: Target, title: 'Evaluation Rubric', desc: 'How innovation, impact and feasibility are scored.', href: '/evaluation-rubric' },
  { icon: Rocket, title: 'Prototype Starter Kits', desc: 'Boilerplates, datasets and APIs by theme.', href: '/prototype-kits' },
  { icon: Zap, title: 'Mentor Office Hours', desc: 'Book slots with ministry-appointed mentors.', href: '/mentor-office-hours' },
]

export default function ResourcesSection() {
  const [faqOpen, setFaqOpen] = useState(null)

  return (
    <section className="section" id="resources">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="kicker mono">// Resources</span>
            <h2>Everything you need before you start</h2>
          </div>
        </Reveal>

        <div className="resources-layout">
          <Reveal delay={60}>
            <div className="resource-cards">
              {RESOURCES.map(({ icon: Icon, title, desc, href }) => (
                <Link key={title} href={href} className="resource-card">
                  <div className="rc-icon"><Icon size={18} /></div>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                  <ArrowUpRight size={16} className="rc-arrow" />
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="faq">
              <div className="faq-mini-head">
                <h3 className="faq-head">Frequently asked</h3>
                <Link href="/faq" className="link-inline">View all FAQs →</Link>
              </div>
              {FAQS.map((f, i) => (
                <div key={f.q} className={`faq-item ${faqOpen === i ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}>
                    <span>{f.q}</span>
                    <ChevronDown size={18} className="faq-chev" />
                  </button>
                  <div className="faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}