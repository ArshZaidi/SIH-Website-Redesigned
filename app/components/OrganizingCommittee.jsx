'use client'

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
  {
    name: "Ministry of Education's Innovation Cell",
    short: "MIE",
    logo: "/logos/moe.png",
  },
  {
    name: "All India Council for Technical Education",
    short: "AICTE",
    logo: "/logos/aicte.png",
  },
  {
    name: "Inter Institutional Inclusive Innovations Center",
    short: "i4C",
    logo: "/logos/i4c.png",
  },
];

const MOE_LOGO = '/logos/moe.png'

function initials(name) {
  return name
    .replace(
      /^(Shri|Smt\.?|Dr\.?|Prof\.?|Mr\.?|Ms\.?)\s+/i,
      ""
    )
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function Avatar({ name, photo, size = 48 }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="ct-avatar"
      style={{
        width: size,
        height: size,
      }}
      aria-label={name}
    >
      {/* Fallback initials */}
      <span className="ct-avatar-initials">
        {initials(name)}
      </span>

      {/* Real photo */}
      {photo && !failed && (
        <img
          src={photo}
          alt=""
          className="ct-avatar-img"
          loading="eager"
          decoding="async"
          onError={() => {
            console.error(
              `[Committee] Failed to load: ${photo}`
            );
            setFailed(true);
          }}
        />
      )}
    </div>
  );
}

function OrgLogo({ src, short }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="org-logo">
      {!failed ? (
        <img
          src={src}
          alt={`${short} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="org-logo-fallback">
          <span>{short}</span>
        </div>
      )}
    </div>
  );
}

function MoeEmblem() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="moe-logo-wrapper">
      {!failed ? (
        <img
          src="/logos/moe.png"
          alt="Ministry of Education"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="moe-fallback">
          <span>MINISTRY OF EDUCATION</span>
          <small>GOVERNMENT OF INDIA</small>
        </div>
      )}
    </div>
  );
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