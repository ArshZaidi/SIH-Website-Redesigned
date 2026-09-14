import { Mail, Phone, MapPin } from 'lucide-react'

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
    </svg>
  )
}

function TwitterXIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const PHONES = [
  '011 29581222', '011 29581223', '011 29581239',
  '011 29581240', '011 29581241', '011 29581319',
]

const SOCIALS = [
  { Icon: FacebookIcon,  label: 'Facebook',  href: 'https://www.facebook.com/mhrdInnovation/' },
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/mhrd.innovationcell/' },
  { Icon: TwitterXIcon,  label: 'X',         href: 'https://x.com/SIH2025' },
  { Icon: LinkedinIcon,  label: 'LinkedIn',  href: 'https://in.linkedin.com/company/moe-innovation-cell' },
]

export default function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-head contact-head">
          <span className="kicker mono">// Contact Us</span>
          <h2>Get in touch with the SIH secretariat</h2>
          <p>For any queries related to registration, problem statements, or the grand finale.</p>
        </div>

        <div className="contact-grid">
          <a className="contact-card contact-email" href="mailto:sih@aicte-india.org">
            <div className="cc-icon"><Mail size={20} /></div>
            <div className="cc-body">
              <span className="mono cc-label">Email</span>
              <strong>sih@aicte-india.org</strong>
              <span className="cc-hint">Replies within 2–3 working days</span>
            </div>
          </a>

          <div className="contact-card contact-phones">
            <div className="cc-icon"><Phone size={20} /></div>
            <div className="cc-body">
              <span className="mono cc-label">Helpline</span>
              <div className="cc-phone-grid">
                {PHONES.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-card contact-loc">
            <div className="cc-icon"><MapPin size={20} /></div>
            <div className="cc-body">
              <span className="mono cc-label">Address</span>
              <strong>Ministry of Education&rsquo;s Innovation Cell</strong>
              <span className="cc-hint">AICTE, Nelson Mandela Marg, Vasant Kunj, New Delhi – 110070</span>
            </div>
          </div>

          <div className="contact-card contact-social">
            <div className="cc-icon"><FacebookIcon size={20} /></div>
            <div className="cc-body">
              <span className="mono cc-label">Follow us</span>
              <div className="cc-socials">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer noopener"
                    aria-label={label} className="cc-social-btn">
                    <Icon size={16} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}