import { Crown, Shield, Users, Award } from 'lucide-react'

const COMMITTEE = [
  {
    tier: 'Patron',
    icon: Crown,
    accent: 'saffron',
    members: [
      { name: 'Shri Narendra Modi', role: 'Hon\u2019ble Prime Minister of India' },
    ],
  },
  {
    tier: 'Patron',
    icon: Crown,
    accent: 'saffron',
    members: [
      { name: 'Shri Pralhad Joshi', role: 'Hon\u2019ble Minister of Education' },
    ],
  },
  {
    tier: 'Co-Patrons',
    icon: Shield,
    accent: 'green',
    members: [
      { name: 'Dr. Sukanta Majumdar', role: 'Hon\u2019ble Minister of State for Education' },
      { name: 'Jayant Chaudhary', role: 'Hon\u2019ble Minister of State for Education' },
      { name: 'Dr. Deepti Gaur Mukerjee', role: 'Hon\u2019ble Secretary, Higher Education' },
    ],
  },
]

const ORGANISERS = [
  { name: 'Ministry of Education\u2019s Innovation Cell', short: 'MIC', badge: 'MoE' },
  { name: 'All India Council for Technical Education', short: 'AICTE', badge: 'AICTE' },
  { name: 'Inter Institutional Inclusive Innovations Center', short: 'i4C', badge: 'i4C' },
]

export default function OrganizingCommittee() {
  return (
    <section className="section committee-section" id="committee">
      <div className="container">
        <div className="section-head committee-head">
          <span className="kicker mono">// Leadership</span>
          <h2>Organizing Committee</h2>
          <p>The visionaries steering India&rsquo;s largest innovation movement.</p>
        </div>

        <div className="committee-tiers">
          {COMMITTEE.map((tier, ti) => {
            const Icon = tier.icon
            return (
              <div className={`committee-tier ct-accent-${tier.accent}`} key={ti}>
                <div className="ct-tier-header">
                  <span className="ct-tier-icon"><Icon size={16} /></span>
                  <span className="ct-tier-label mono">{tier.tier}</span>
                </div>
                <div className="ct-members">
                  {tier.members.map((m) => (
                    <div className="ct-member" key={m.name}>
                      <div className="ct-avatar" aria-hidden="true">
                        {m.name.split(' ').slice(-2).map((n) => n[0]).join('')}
                      </div>
                      <div className="ct-member-info">
                        <strong>{m.name}</strong>
                        <span>{m.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="organisers-block">
          <div className="organisers-header">
            <Award size={18} />
            <span className="mono">Organisers</span>
          </div>
          <div className="organisers-row">
            {ORGANISERS.map((o) => (
              <div className="organiser-card" key={o.short}>
                <div className="org-badge">{o.badge}</div>
                <div className="org-info">
                  <strong>{o.short}</strong>
                  <span>{o.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}