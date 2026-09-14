import { useState } from 'react'
import { Crown, Shield, Award } from 'lucide-react'

const COMMITTEE = [
  {
    tier: 'Patron', icon: Crown, accent: 'saffron',
    members: [
      { name: 'Shri Narendra Modi', role: 'Hon\u2019ble Prime Minister of India',
        photo: '/committee/narendra-modi.jpg' },
    ],
  },
  {
    tier: 'Patron', icon: Crown, accent: 'saffron',
    members: [
      { name: 'Shri Pralhad Joshi', role: 'Hon\u2019ble Minister of Education',
        photo: '/committee/pralhad-joshi.jpg' },
    ],
  },
  {
    tier: 'Co-Patrons', icon: Shield, accent: 'green',
    members: [
      { name: 'Dr. Sukanta Majumdar', role: 'Hon\u2019ble Minister of State for Education',
        photo: '/committee/sukanta-majumdar.jpg' },
      { name: 'Jayant Chaudhary', role: 'Hon\u2019ble Minister of State for Education',
        photo: '/committee/jayant-chaudhary.jpg' },
      { name: 'Dr. Deepti Gaur Mukerjee', role: 'Hon\u2019ble Secretary, Higher Education',
        photo: '/committee/deepti-gaur-mukerjee.jpg' },
    ],
  },
]

const ORGANISERS = [
  { name: 'Ministry of Education\u2019s Innovation Cell', short: 'MIC',   logo: '/logos/mic.png' },
  { name: 'All India Council for Technical Education',    short: 'AICTE', logo: '/logos/aicte.png' },
  { name: 'Inter Institutional Inclusive Innovations Center', short: 'i4C', logo: '/logos/i4c.png' },
]

const MOE_LOGO = '/logos/moe.png'

function initials(name) {
  return name
    .replace(/^(Shri|Smt\.?|Dr\.?|Prof\.?|Mr\.?|Ms\.?)\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

/* Avatar with photo + initials fallback */
function Avatar({ name, photo, size = 48 }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className="ct-avatar" style={{ width: size, height: size }} aria-hidden="true">
      <span className="ct-avatar-initials">{initials(name)}</span>
      {photo && !failed && (
        <img
          src={photo}
          alt={name}
          className={`ct-avatar-img ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            console.warn(`[Committee] photo not found: ${photo}`)
            setFailed(true)
          }}
        />
      )}
    </div>
  )
}

/* Organiser logo with text fallback */
function OrgLogo({ src, short }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="org-logo">
      {!failed && (
        <img
          src={src}
          alt={short}
          onError={() => {
            console.warn(`[Organiser] logo not found: ${src}`)
            setFailed(true)
          }}
        />
      )}
      {failed && <span className="org-logo-fallback">{short}</span>}
    </div>
  )
}

/* MoE emblem with graceful hide */
function MoeEmblem() {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={MOE_LOGO}
      alt="Ministry of Education"
      onError={() => {
        console.warn(`[Organiser] MoE logo not found: ${MOE_LOGO}`)
        setFailed(true)
      }}
    />
  )
}

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
                      <Avatar name={m.name} photo={m.photo} />
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

          <div className="organisers-moe">
            <MoeEmblem />
          </div>

          <div className="organisers-row">
            {ORGANISERS.map((o) => (
              <div className="organiser-card" key={o.short}>
                <OrgLogo src={o.logo} short={o.short} />
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