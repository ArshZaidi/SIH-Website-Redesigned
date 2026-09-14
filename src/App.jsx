import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import {
  Menu, X, Search, ArrowRight, ArrowUpRight, Check, Star, ChevronDown,
  Users, Cpu, Lightbulb, Trophy, Calendar, Mail, Send, Sparkles,
  BookOpen, Building2, Target, Rocket, GraduationCap, Gavel, Plus,
  MessageSquare, Zap, Filter, Award, Layers, MapPin, ExternalLink, UserCheck,
} from 'lucide-react'
import './App.css'
import ProblemsPage from './pages/ProblemsPage'
import KnowYourSpocPage from './pages/KnowYourSpocPage'
import HeroVideo from './components/HeroVideo'
import MilestonesCarousel from './components/MilestonesCarousel'
import OrganizingCommittee from './components/OrganizingCommittee'
import WhySIHMatters from './components/WhySIHMatters'

/* =========================================================
   DATA
   ========================================================= */
const PROBLEMS = [
  {
    id: 1, code: 'SIH25001', type: 'Software', theme: 'MedTech',
    title: 'AI-Powered Early Disease Detection from Retinal Scans',
    ministry: 'Ministry of Health & Family Welfare',
    difficulty: 'Hard', ideas: 142, prize: '₹1,00,000',
    eligibility: 'UG / PG students in CS, ECE, Bio-medical',
    description:
      'Build a deep-learning pipeline that screens retinal fundus images for early markers of diabetic retinopathy and other systemic conditions, with explainable heatmaps clinicians can trust.',
    tags: ['AI/ML', 'Healthcare', 'Computer Vision'],
  },
  {
    id: 2, code: 'SIH25002', type: 'Hardware', theme: 'AgriTech',
    title: 'Low-Cost Soil Health Sensor Network for Small Farms',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    difficulty: 'Medium', ideas: 98, prize: '₹1,00,000',
    eligibility: 'UG / PG students in ECE, Mechanical, Agri',
    description:
      'Design a solar-powered mesh of soil sensors reporting NPK, moisture and pH to a farmer-friendly mobile dashboard, with offline-first sync for low-connectivity regions.',
    tags: ['IoT', 'Sensors', 'Agriculture'],
  },
  {
    id: 3, code: 'SIH25003', type: 'Software', theme: 'Mobility',
    title: 'Real-Time Multimodal Transit Planner for Tier-2 Cities',
    ministry: 'Ministry of Housing & Urban Affairs',
    difficulty: 'Medium', ideas: 121, prize: '₹1,00,000',
    eligibility: 'UG / PG students in CS, IT, Civil',
    description:
      'Fuse bus, metro, auto and walking data into a single journey planner with live ETA, fare estimates and accessibility-aware routing.',
    tags: ['Maps', 'Realtime', 'Public Transport'],
  },
  {
    id: 4, code: 'SIH25004', type: 'Software', theme: 'EdTech',
    title: 'Adaptive Learning Path Generator for Regional Languages',
    ministry: 'Ministry of Education',
    difficulty: 'Medium', ideas: 87, prize: '₹1,00,000',
    eligibility: 'UG / PG students in CS, Linguistics, Design',
    description:
      'An adaptive engine that builds personalised learning paths from open educational resources, supporting 12+ Indian languages with voice input and offline packs.',
    tags: ['NLP', 'Accessibility', 'Education'],
  },
  {
    id: 5, code: 'SIH25005', type: 'Hardware', theme: 'CleanTech',
    title: 'Smart Waste Segregation Bin with On-Device Vision',
    ministry: 'Ministry of Environment, Forest & Climate Change',
    difficulty: 'Hard', ideas: 156, prize: '₹1,00,000',
    eligibility: 'UG / PG students in ECE, CS, Mechanical',
    description:
      'An edge-AI bin that classifies waste into dry, wet and hazardous streams at source, logs fill-level and routes collection fleets efficiently.',
    tags: ['Edge AI', 'Robotics', 'Sustainability'],
  },
  {
    id: 6, code: 'SIH25006', type: 'Software', theme: 'FinTech',
    title: 'Fraud-Aware UPI Transaction Graph Explorer',
    ministry: 'Ministry of Finance',
    difficulty: 'Hard', ideas: 134, prize: '₹1,00,000',
    eligibility: 'UG / PG students in CS, Data Science, Finance',
    description:
      'Build a graph-analytics console that surfaces mule-account rings and anomalous UPI flows in near real-time, with investigator-friendly case notes.',
    tags: ['Graph', 'Security', 'Analytics'],
  },
  {
    id: 7, code: 'SIH25007', type: 'Software', theme: 'Disaster Mgmt',
    title: 'Flood Early-Warning & Evacuation Router',
    ministry: 'Ministry of Home Affairs',
    difficulty: 'Medium', ideas: 110, prize: '₹1,00,000',
    eligibility: 'UG / PG students in CS, Civil, GIS',
    description:
      'Combine IMD rainfall, river gauge and satellite data to issue hyperlocal flood alerts and generate safe evacuation routes for vulnerable wards.',
    tags: ['GIS', 'Prediction', 'Public Safety'],
  },
  {
    id: 8, code: 'SIH25008', type: 'Hardware', theme: 'Smart Automation',
    title: 'Autonomous Rail Track Inspection Drone',
    ministry: 'Ministry of Railways',
    difficulty: 'Hard', ideas: 173, prize: '₹1,00,000',
    eligibility: 'UG / PG students in ECE, Aerospace, Mechanical',
    description:
      'A drone platform that autonomously scans track segments for cracks, obstructions and vegetation overgrowth, then files geo-tagged defect reports.',
    tags: ['Drones', 'CV', 'Infrastructure'],
  },
  {
    id: 9, code: 'SIH25009', type: 'Software', theme: 'Tourism',
    title: 'Heritage Site AR Guide with Offline Mode',
    ministry: 'Ministry of Tourism',
    difficulty: 'Easy', ideas: 76, prize: '₹1,00,000',
    eligibility: 'UG / PG students in CS, Design, Archaeology',
    description:
      'An AR mobile experience that overlays historical reconstructions on monuments, works fully offline, and supports Indian sign language captions.',
    tags: ['AR', 'Offline', 'Culture'],
  },
]

const THEMES = [
  'MedTech', 'AgriTech', 'Smart Automation', 'CleanTech', 'Mobility',
  'EdTech', 'FinTech', 'Disaster Mgmt', 'Tourism', 'Space', 'Robotics', 'Blockchain',
]

const TIMELINE = [
  { date: 'Aug 01', title: 'Registrations Open', desc: 'Teams of 6 register on the portal with a nominated mentor.' },
  { date: 'Aug 20', title: 'Idea Submission', desc: 'Submit your idea deck against a chosen problem statement.' },
  { date: 'Sep 05', title: 'Campus Evaluation', desc: 'Institutional SPOC shortlists the top teams per college.' },
  { date: 'Sep 25', title: 'Grand Finale — Round 1', desc: '36-hour hackathon begins across nodal centres.' },
  { date: 'Sep 27', title: 'Grand Finale — Round 2', desc: 'Top teams pitch to the national jury.' },
  { date: 'Oct 10', title: 'Winners Announced', desc: '₹1,00,000 per winning team + incubation support.' },
]

const JOURNEY = [
  {
    step: '01',
    phase: 'Registration',
    date: 'Aug 01 — Aug 20',
    title: 'Register your team',
    desc: 'Form a team of six with at least one female member, nominate a faculty mentor, and lock your preferred problem statements on the portal.',
    icon: Users,
    tags: ['Team of 6', 'Faculty mentor', 'Free entry'],
    status: 'open',
  },
  {
    step: '02',
    phase: 'Ideation',
    date: 'Aug 20 — Sep 05',
    title: 'Submit your idea',
    desc: 'Pitch a five-slide deck covering problem understanding, proposed solution, tech stack, feasibility and expected impact. Institute-level judges shortlist.',
    icon: Lightbulb,
    tags: ['5-slide deck', 'Institute round', 'Mentor review'],
    status: 'open',
  },
  {
    step: '03',
    phase: 'Shortlist',
    date: 'Sep 05 — Sep 20',
    title: 'Campus evaluation',
    desc: 'The institutional SPOC and evaluation panel score every submission on innovation, feasibility and clarity. Top teams per college advance to the finale.',
    icon: Target,
    tags: ['Scoring rubric', 'SPOC review', 'Shortlist'],
    status: 'upcoming',
  },
  {
    step: '04',
    phase: 'Build',
    date: 'Sep 25 — Sep 27',
    title: '36-hour grand finale',
    desc: 'Two rounds of non-stop prototyping with domain mentors on the floor. Ship a working demo — repository, walkthrough video and live demo.',
    icon: Cpu,
    tags: ['36 hours', 'Working demo', 'Live mentors'],
    status: 'upcoming',
  },
  {
    step: '05',
    phase: 'Pitch',
    date: 'Sep 27',
    title: 'National jury pitch',
    desc: 'Finalists present live to the national jury — eight minutes to demo, four minutes of Q&A. Judged on impact, scalability and execution quality.',
    icon: Trophy,
    tags: ['Live pitch', 'Q&A', 'National jury'],
    status: 'upcoming',
  },
  {
    step: '06',
    phase: 'Rewards',
    date: 'Oct 10',
    title: 'Winners announced',
    desc: 'Each winning team receives ₹1,00,000 along with incubation support, dedicated mentorship and fast-tracked ministry pilot opportunities.',
    icon: Award,
    tags: ['₹1,00,000', 'Incubation', 'Pilot support'],
    status: 'upcoming',
  },
]

const SEED_REVIEWS = [
  {
    id: 'r1', name: 'Ananya Sharma', role: 'Student', rating: 5,
    title: 'The explorer made shortlisting painless',
    message: 'Filtering by theme and difficulty in one go saved our team an entire evening. We found our AgriTech problem in minutes.',
    date: '2 days ago',
  },
  {
    id: 'r2', name: 'Dr. R. Menon', role: 'Mentor', rating: 4,
    title: 'Clean, fast, and focused',
    message: 'The problem detail cards surface exactly what mentors need — eligibility, ministry and difficulty. Would love CSV export.',
    date: '1 week ago',
  },
  {
    id: 'r3', name: 'Karthik Iyer', role: 'Student', rating: 5,
    title: 'Compare dock is a killer feature',
    message: 'Being able to line up three problem statements side-by-side before committing was genuinely useful.',
    date: '2 weeks ago',
  },
]

/* =========================================================
   HOOKS & HELPERS
   ========================================================= */
function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, shown]
}

function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, shown] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function Counter({ to, duration = 1600, suffix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    let started = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true
          let t0
          const step = (t) => {
            if (!t0) t0 = t
            const p = Math.min((t - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.floor(eased * to))
            if (p < 1) raf = requestAnimationFrame(step)
            else setVal(to)
          }
          raf = requestAnimationFrame(step)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration])
  return <span ref={ref}>{val.toLocaleString('en-IN')}{suffix}</span>
}

const DIFF_ORDER = { Easy: 1, Medium: 2, Hard: 3 }

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */
function StarRating({ value, onChange, size = 22, readOnly = false }) {
  const [hover, setHover] = useState(0)
  return (
    <div className={`stars ${readOnly ? 'readonly' : ''}`} role={readOnly ? undefined : 'radiogroup'}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover || value) >= n
        return (
          <button
            key={n}
            type="button"
            className={`star-btn ${active ? 'on' : ''}`}
            disabled={readOnly}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            onMouseEnter={() => !readOnly && setHover(n)}
            onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => !readOnly && onChange?.(n)}
          >
            <Star size={size} strokeWidth={1.6} fill={active ? 'currentColor' : 'none'} />
          </button>
        )
      })}
    </div>
  )
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onClose, 3600)
    return () => clearTimeout(t)
  }, [toast, onClose])
  if (!toast) return null
  return (
    <div className="toast" role="status" aria-live="polite" key={toast.id}>
      <div className="toast-icon"><Check size={16} strokeWidth={2.4} /></div>
      <div className="toast-body">
        <strong>{toast.title}</strong>
        {toast.msg && <span>{toast.msg}</span>}
      </div>
      <button className="toast-x" onClick={onClose} aria-label="Dismiss"><X size={14} /></button>
    </div>
  )
}

/* =========================================================
   APP
   ========================================================= */
export default function App() {
  /* ---- page routing ---- */
  const [page, setPage] = useState('home') // 'home' | 'problems' | 'spoc'

  /* ---- nav ---- */
  const [menuOpen, setMenuOpen] = useState(false)

  /* ---- explorer filters ---- */
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [theme, setTheme] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [sort, setSort] = useState('popular')

  /* ---- modals / overlays ---- */
  const [selected, setSelected] = useState(null)
  const [compare, setCompare] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [faqOpen, setFaqOpen] = useState(null)

  /* ---- tabs ---- */
  const [role, setRole] = useState('Student')

  /* ---- reviews ---- */
  const [reviews, setReviews] = useState(SEED_REVIEWS)

  /* ---- toast ---- */
  const [toast, setToast] = useState(null)
  const notify = useCallback((title, msg) => {
    setToast({ id: Date.now(), title, msg })
  }, [])

  /* ---- lock body scroll when any overlay open ---- */
  const anyOverlay = !!selected || showCompare || showReview
  useEffect(() => {
    document.body.classList.toggle('no-scroll', anyOverlay)
    return () => document.body.classList.remove('no-scroll')
  }, [anyOverlay])

  /* ---- journey timeline progress ---- */
  const journeyRef = useRef(null)
  const [journeyProgress, setJourneyProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = journeyRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const anchor = vh * 0.75
      const total = rect.height + (anchor - vh)
      const scrolled = anchor - rect.top
      const p = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)))
      setJourneyProgress(p * 100)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  /* ---- esc closes overlays ---- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setSelected(null)
      setShowCompare(false)
      setShowReview(false)
      setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ---- scroll to top when switching pages ---- */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [page])

  /* ---- smooth scroll helper ---- */
  const scrollTo = useCallback((id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  /* ---- open pages ---- */
  const openProblems = useCallback(() => { setMenuOpen(false); setPage('problems') }, [])
  const openSpoc = useCallback(() => { setMenuOpen(false); setPage('spoc') }, [])

  /* ---- filtering + sorting ---- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PROBLEMS.filter((p) => {
      if (type !== 'All' && p.type !== type) return false
      if (theme !== 'All' && p.theme !== theme) return false
      if (difficulty !== 'All' && p.difficulty !== difficulty) return false
      if (!q) return true
      const haystack = [
        p.title, p.ministry, p.category, p.theme, p.code,
        p.type, p.difficulty, p.description,
        ...(p.tags || []),
      ].join(' ').toLowerCase()
      return haystack.includes(q)
    })

    list = [...list].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'difficulty') return DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]
      if (sort === 'ideas') return b.ideas - a.ideas
      return b.ideas - a.ideas
    })
    return list
  }, [query, type, theme, difficulty, sort])

  const activeFilterCount =
    (type !== 'All') + (theme !== 'All') + (difficulty !== 'All') + (query.trim() ? 1 : 0)

  const resetFilters = () => {
    setQuery(''); setType('All'); setTheme('All'); setDifficulty('All'); setSort('popular')
  }

  /* ---- compare helpers ---- */
  const toggleCompare = (id) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) {
        notify('Compare limit reached', 'You can compare up to 3 problems at once.')
        return prev
      }
      return [...prev, id]
    })
  }
  const compareItems = useMemo(
    () => compare.map((id) => PROBLEMS.find((p) => p.id === id)).filter(Boolean),
    [compare],
  )

  /* ---- FAQ ---- */
  const FAQS = [
    {
      q: 'Who can participate in Smart India Hackathon?',
      a: 'Any full-time student enrolled in a recognised Indian institution (UG, PG, or PhD) can participate. Teams must have 6 members with at least one female member and a nominated mentor.',
    },
    {
      q: 'Is there a registration fee?',
      a: 'No. Participation in SIH is completely free for students. Travel and stay for the grand finale are supported by the organising ministry.',
    },
    {
      q: 'Can a team submit ideas for more than one problem statement?',
      a: 'Yes — a team may submit ideas for multiple problem statements during the idea phase, but can only compete with one at the grand finale.',
    },
    {
      q: 'What is the prize for the winning team?',
      a: 'Each winning team receives ₹1,00,000 in prize money along with incubation and mentorship support from partner organisations.',
    },
    {
      q: 'How many SPOCs can an institute appoint?',
      a: 'A minimum of 1 and a maximum of 2 SPOCs per institute are allowed. The SPOC must be a HOD, Principal, Dean, or an authorised faculty member.',
    },
    {
      q: 'Can team members be from different colleges?',
      a: 'No. All team members must be from the same college. However, students from different branches of the same college are encouraged to form a team.',
    },
    {
      q: 'What should teams carry to the grand finale?',
      a: 'Teams must carry their working prototype, any special sensors or components, laptops, chargers, extension boards, and their college ID cards. A detailed checklist is provided to shortlisted teams.',
    },
    {
      q: 'How are winners evaluated?',
      a: 'Judges score prototypes on innovation, feasibility, impact, scalability, and execution quality. The final decision rests with the national jury appointed by the Ministry of Education.',
    },
  ]

  /* =========================================================
     RENDER: SPOC PAGE
     ========================================================= */
  if (page === 'spoc') {
    return <KnowYourSpocPage onBack={() => setPage('home')} />
  }

  /* =========================================================
     RENDER: PROBLEMS PAGE
     ========================================================= */
  if (page === 'problems') {
    return <ProblemsPage onBack={() => setPage('home')} />
  }

  /* =========================================================
     RENDER: HOME PAGE
     ========================================================= */
  return (
    <div className="app">
      {/* ============ HEADER ============ */}
      <header className={`header ${menuOpen ? 'open' : ''}`}>
        <div className="header-inner">
          <button className="brand" onClick={() => scrollTo('top')} aria-label="Go to top">
            <span className="brand-mark">
              <span className="bm-saffron" />
              <span className="bm-green" />
            </span>
            <span className="brand-text">
              <strong>Smart India</strong>
              <em>Hackathon</em>
            </span>
          </button>

          <nav className={`nav ${menuOpen ? 'show' : ''}`}>
            <button className="nav-link" onClick={openProblems}>Problems</button>
            {[
              ['Journey', 'journey'],
              ['Timeline', 'timeline'],
              ['Themes', 'themes'],
              ['Milestones', 'milestones'],
              ['Reviews', 'reviews'],
            ].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">
                {label}
              </button>
            ))}
            <button className="nav-link nav-link-spoc" onClick={openSpoc}>
              <UserCheck size={15} /> Know Your SPOC
            </button>
            <button className="nav-cta" onClick={() => scrollTo('reviews')}>
              Write a review <ArrowRight size={15} />
            </button>
          </nav>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className="header-glow" />
      </header>

      {/* ============ HERO ============ */}
      <section className="hero" id="top">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-orbit">
            <span className="orbit-ring r1" />
            <span className="orbit-ring r2" />
            <span className="orbit-ring r3" />
            <span className="orbit-dot d1" />
            <span className="orbit-dot d2" />
            <span className="orbit-dot d3" />
          </div>
        </div>

        <div className="hero-inner">
          <Reveal>
            <span className="eyebrow mono">
              <Sparkles size={13} /> 10th Edition · 2026
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="hero-title">
              Where India&rsquo;s sharpest
              <span className="grad"> student minds </span>
              build for the nation.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-sub">
              Smart India Hackathon is the world&rsquo;s largest open innovation
              movement. Pick a real problem from a ministry, build a working
              prototype in 36 hours, and pitch it to a national jury.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={openProblems}>
                Explore problem statements <ArrowRight size={17} />
              </button>
              <button className="btn btn-ghost" onClick={() => scrollTo('journey')}>
                How it works
              </button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="hero-strip">
              {[
                ['Problems', 250, '+'],
                ['Institutions', 5000, '+'],
                ['Prize / team', 1, 'L'],
                ['States', 36, ''],
              ].map(([label, n, suf]) => (
                <div key={label} className="hero-stat">
                  <strong className="mono"><Counter to={n} suffix={suf} /></strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HERO VIDEO (NEW) ============ */}
      <HeroVideo />

      {/* ============ ABOUT (EXPANDED) ============ */}
      <section className="section about-section" id="about">
        <div className="container">
          <Reveal>
            <div className="section-head about-head">
              <span className="kicker mono">// About</span>
              <h2>What is Smart India Hackathon?</h2>
            </div>
          </Reveal>

          <div className="about-layout">
            <Reveal delay={60}>
              <div className="about-main">
                <p className="about-lead">
                  Smart India Hackathon (SIH) is a premier nationwide initiative
                  designed to engage students in solving some of the most
                  pressing challenges faced in everyday life. Launched in 2017
                  by the Ministry of Education&rsquo;s Innovation Cell (MIC) and
                  the All India Council for Technical Education (AICTE), SIH has
                  grown into the <strong>world&rsquo;s largest open innovation
                  platform</strong>.
                </p>
                <p>
                  SIH provides a dynamic platform for students to develop and
                  showcase creative solutions to real-world problems sourced
                  from ministries, state departments, PSUs, industries and
                  NGOs. By encouraging participants to think critically and
                  innovatively, the hackathon bridges the gap between academic
                  knowledge and practical application — shifting students from
                  marks-and-exams to problems-and-solutions.
                </p>
                <p>
                  Each edition builds on the previous one, refining its approach
                  and expanding its impact. The 2025 edition alone engaged over
                  8.26 lakh students across 2,587 institutes, with 72,165 idea
                  submissions competing for 271 problem statements. Winning
                  solutions do not stay on paper — several have gone on to
                  become deployable tools, products and startups, feeding
                  directly into incubators and government programmes.
                </p>

                <div className="about-facts">
                  <div className="af-item">
                    <strong className="mono">2017</strong>
                    <span>Founded by MIC &amp; AICTE</span>
                  </div>
                  <div className="af-item">
                    <strong className="mono">60+</strong>
                    <span>Nodal centres nationwide</span>
                  </div>
                  <div className="af-item">
                    <strong className="mono">36h</strong>
                    <span>Non-stop grand finale</span>
                  </div>
                  <div className="af-item">
                    <strong className="mono">₹1L</strong>
                    <span>Per winning team</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="about-aside">
                <div className="aa-card aa-quote">
                  <span className="aa-mark">&ldquo;</span>
                  <p>
                    Through Smart India Hackathon, the youth power of the
                    country is extracting the Amrit of solutions for developed
                    India.
                  </p>
                  <span className="aa-author">
                    — Shri Narendra Modi<br />
                    <em>Hon&rsquo;ble Prime Minister of India</em>
                  </span>
                </div>
                <div className="aa-card aa-mission">
                  <h4>Our Mission</h4>
                  <ul>
                    <li>Foster a culture of innovation and practical problem-solving</li>
                    <li>Connect student talent with real national challenges</li>
                    <li>Build a pipeline from classroom ideas to deployable solutions</li>
                    <li>Support the Viksit Bharat @2047 vision through technology</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="kicker mono">// Featured</span>
              <h2>This week&rsquo;s highlighted challenges</h2>
              <p>Hand-picked problem statements across ministries that need fresh thinking.</p>
            </div>
          </Reveal>

          <div className="featured-grid">
            {PROBLEMS.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <article className="featured-card" onClick={() => setSelected(p)}>
                  <div className="fc-top">
                    <span className={`pill pill-${p.type.toLowerCase()}`}>{p.type}</span>
                    <span className="mono fc-code">{p.code}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="fc-desc">{p.description.slice(0, 118)}…</p>
                  <div className="fc-meta">
                    <span><Building2 size={13} /> {p.ministry.replace('Ministry of ', '')}</span>
                    <span><Lightbulb size={13} /> {p.ideas} ideas</span>
                  </div>
                  <div className="fc-cta">
                    View details <ArrowUpRight size={15} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MILESTONES CAROUSEL (NEW) ============ */}
      <MilestonesCarousel />

      {/* ============ EXPLORER ============ */}
      <section className="section" id="explorer">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="kicker mono">// Explorer</span>
              <h2>Find the problem you were built for</h2>
              <p>Search, filter and compare every problem statement in one place.</p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="filter-bar">
              <div className="search-wrap">
                <Search size={17} className="search-icon" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, ministry, tag, code…"
                  aria-label="Search problem statements"
                />
                {query && (
                  <button className="clear-btn" onClick={() => setQuery('')} aria-label="Clear search">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="filter-row">
                <div className="chip-group" role="group" aria-label="Type filter">
                  {['All', 'Software', 'Hardware'].map((t) => (
                    <button
                      key={t}
                      className={`chip ${type === t ? 'on' : ''}`}
                      onClick={() => setType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="chip-group" role="group" aria-label="Difficulty filter">
                  {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                    <button
                      key={d}
                      className={`chip ${difficulty === d ? 'on' : ''}`}
                      onClick={() => setDifficulty(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <select
                  className="select"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  aria-label="Theme filter"
                >
                  <option value="All">All themes</option>
                  {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>

                <select
                  className="select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort by"
                >
                  <option value="popular">Most ideas</option>
                  <option value="ideas">Fewest ideas</option>
                  <option value="title">A → Z</option>
                  <option value="difficulty">Easiest first</option>
                </select>

                {activeFilterCount > 0 && (
                  <button className="btn-reset" onClick={resetFilters}>
                    <X size={14} /> Clear ({activeFilterCount})
                  </button>
                )}
              </div>

              <div className="results-line">
                <Filter size={14} />
                <span>
                  Showing <strong>{filtered.length}</strong> of {PROBLEMS.length} problem statements
                  {' · '}
                  <button className="link-inline" onClick={openProblems}>
                    View all →
                  </button>
                </span>
              </div>
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <Reveal>
              <div className="empty">
                <Search size={32} />
                <h3>No matches found</h3>
                <p>Try a different keyword or clear the filters to see everything.</p>
                <button className="btn btn-primary" onClick={resetFilters}>Reset filters</button>
              </div>
            </Reveal>
          ) : (
            <div className="problems-grid">
              {filtered.slice(0, 6).map((p, i) => {
                const inCompare = compare.includes(p.id)
                return (
                  <Reveal key={p.id} delay={Math.min(i * 50, 300)}>
                    <article className="problem-card">
                      <div className="pc-top">
                        <span className={`pill pill-${p.type.toLowerCase()}`}>{p.type}</span>
                        <span className={`pill diff diff-${p.difficulty.toLowerCase()}`}>
                          {p.difficulty}
                        </span>
                      </div>
                      <span className="mono pc-code">{p.code} · {p.theme}</span>
                      <h3>{p.title}</h3>
                      <p className="pc-desc">{p.description}</p>
                      <div className="pc-tags">
                        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                      <div className="pc-meta">
                        <span><Building2 size={13} /> {p.ministry.replace('Ministry of ', '')}</span>
                        <span><Lightbulb size={13} /> {p.ideas}</span>
                        <span><Award size={13} /> {p.prize}</span>
                      </div>
                      <div className="pc-actions">
                        <button className="btn btn-sm btn-primary" onClick={() => setSelected(p)}>
                          View details
                        </button>
                        <button
                          className={`btn btn-sm btn-ghost ${inCompare ? 'active' : ''}`}
                          onClick={() => toggleCompare(p.id)}
                        >
                          {inCompare ? <Check size={14} /> : <Plus size={14} />}
                          {inCompare ? 'Added' : 'Compare'}
                        </button>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          )}

          {filtered.length > 6 && (
            <Reveal>
              <div className="preview-cta">
                <button className="btn btn-primary" onClick={openProblems}>
                  View all {filtered.length} problem statements <ArrowRight size={16} />
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============ JOURNEY ============ */}
      <section className="section section-alt journey-section" id="journey">
        <div className="container">
          <Reveal>
            <div className="section-head journey-head">
              <span className="kicker mono">// Journey</span>
              <h2>From idea to national finale</h2>
              <p>Six milestones between registration and the winner&rsquo;s podium.</p>
            </div>
          </Reveal>

          <div className="journey-timeline" ref={journeyRef}>
            <div className="jt-rail" aria-hidden="true">
              <div className="jt-rail-fill" style={{ height: `${journeyProgress}%` }} />
            </div>

            {JOURNEY.map((j, i) => {
              const Icon = j.icon
              return (
                <Reveal
                  key={j.step}
                  delay={i * 60}
                  className={`jt-item ${i % 2 === 0 ? 'left' : 'right'}`}
                >
                  <div className="jt-node">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className="jt-card">
                    <div className="jt-card-top">
                      <span className="mono jt-step">STEP {j.step}</span>
                      <span className={`jt-status jt-status-${j.status}`}>
                        {j.status === 'open' ? 'Open now' : 'Upcoming'}
                      </span>
                    </div>
                    <span className="mono jt-date">{j.date}</span>
                    <span className="jt-phase">{j.phase}</span>
                    <h3>{j.title}</h3>
                    <p>{j.desc}</p>
                    <div className="jt-tags">
                      {j.tags.map((t) => <span key={t} className="jt-tag">{t}</span>)}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="section" id="timeline">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="kicker mono">// Timeline</span>
              <h2>Key dates you cannot miss</h2>
            </div>
          </Reveal>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.date} delay={i * 70}>
                <div className="tl-item">
                  <div className="tl-dot" />
                  <span className="mono tl-date"><Calendar size={13} /> {t.date}</span>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THEMES ============ */}
      <section className="section section-alt" id="themes">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="kicker mono">// Themes</span>
              <h2>Twelve tracks. Infinite problems.</h2>
              <p>Every problem statement maps to one of these thematic areas.</p>
            </div>
          </Reveal>
          <div className="themes-grid">
            {THEMES.map((t, i) => (
              <Reveal key={t} delay={i * 35}>
                <button
                  className={`theme-card ${theme === t ? 'on' : ''}`}
                  onClick={() => {
                    setTheme(theme === t ? 'All' : t)
                    setTimeout(() => scrollTo('explorer'), 80)
                  }}
                >
                  <span className="theme-glow" />
                  <Layers size={16} className="theme-icon" />
                  <span className="theme-label">{t}</span>
                  <ArrowRight size={14} className="theme-arrow" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTICIPATE ============ */}
      <section className="section" id="participate">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="kicker mono">// Participate</span>
              <h2>Three ways to be part of SIH</h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="role-tabs">
              {[
                ['Student', GraduationCap],
                ['Mentor', Users],
                ['Judge', Gavel],
              ].map(([r, Icon]) => (
                <button
                  key={r}
                  className={`role-tab ${role === r ? 'on' : ''}`}
                  onClick={() => setRole(r)}
                >
                  <Icon size={16} /> {r}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="role-panel" key={role}>
              {role === 'Student' && (
                <>
                  <h3>Build something that ships</h3>
                  <p>
                    Form a team of six, choose a problem statement, and prototype
                    alongside mentors from the sponsoring ministry. Winners receive
                    ₹1,00,000 and incubation support.
                  </p>
                  <ul className="role-list">
                    <li><Check size={15} /> Open to all UG, PG and PhD students</li>
                    <li><Check size={15} /> No registration fee</li>
                    <li><Check size={15} /> Travel &amp; stay covered for the finale</li>
                  </ul>
                </>
              )}
              {role === 'Mentor' && (
                <>
                  <h3>Guide the next generation</h3>
                  <p>
                    Mentors review submissions, run office hours during the finale,
                    and help teams translate prototypes into deployable pilots.
                  </p>
                  <ul className="role-list">
                    <li><Check size={15} /> Industry or academic professionals</li>
                    <li><Check size={15} /> Commit ~6 hours across the finale weekend</li>
                    <li><Check size={15} /> Recognised on the national portal</li>
                  </ul>
                </>
              )}
              {role === 'Judge' && (
                <>
                  <h3>Decide what moves forward</h3>
                  <p>
                    Judges score prototypes on innovation, feasibility, impact and
                    scalability, then defend their rankings to the national panel.
                  </p>
                  <ul className="role-list">
                    <li><Check size={15} /> Domain experts and ministry officials</li>
                    <li><Check size={15} /> Structured rubric-based evaluation</li>
                    <li><Check size={15} /> Confidentiality agreement required</li>
                  </ul>
                </>
              )}
              <button className="btn btn-primary" onClick={() => scrollTo('reviews')}>
                Share your experience <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className="section section-alt" id="reviews">
        <div className="container">
          <Reveal>
            <div className="section-head reviews-head">
              <div>
                <span className="kicker mono">// Reviews</span>
                <h2>What participants are saying</h2>
                <p>{reviews.length} review{reviews.length !== 1 ? 's' : ''} from students, mentors and judges.</p>
              </div>
              <button className="btn btn-primary" onClick={() => setShowReview(true)}>
                <MessageSquare size={16} /> Write a review
              </button>
            </div>
          </Reveal>

          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={Math.min(i * 60, 240)}>
                <article className="review-card">
                  <div className="rv-top">
                    <div className="rv-avatar" aria-hidden="true">
                      {r.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="rv-person">
                      <strong>{r.name}</strong>
                      <span>{r.role} · {r.date}</span>
                    </div>
                  </div>
                  <StarRating value={r.rating} readOnly size={16} />
                  <h4>{r.title}</h4>
                  <p>{r.message}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RESOURCES / FAQ ============ */}
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
                {[
                  { icon: BookOpen, title: 'Idea Submission Template', desc: 'The exact deck structure the jury expects.' },
                  { icon: Target, title: 'Evaluation Rubric', desc: 'How innovation, impact and feasibility are scored.' },
                  { icon: Rocket, title: 'Prototype Starter Kits', desc: 'Boilerplates, datasets and APIs by theme.' },
                  { icon: Zap, title: 'Mentor Office Hours', desc: 'Book slots with ministry-appointed mentors.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="resource-card">
                    <div className="rc-icon"><Icon size={18} /></div>
                    <div>
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                    <ArrowUpRight size={16} className="rc-arrow" />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="faq">
                <h3 className="faq-head">Frequently asked</h3>
                {FAQS.map((f, i) => (
                  <div key={f.q} className={`faq-item ${faqOpen === i ? 'open' : ''}`}>
                    <button
                      className="faq-q"
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      aria-expanded={faqOpen === i}
                    >
                      <span>{f.q}</span>
                      <ChevronDown size={18} className="faq-chev" />
                    </button>
                    <div className="faq-a">
                      <p>{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ ORGANIZING COMMITTEE (NEW) ============ */}
      <OrganizingCommittee />

      {/* ============ WHY SIH MATTERS (NEW) ============ */}
      <WhySIHMatters />

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="brand-mark">
              <span className="bm-saffron" />
              <span className="bm-green" />
            </span>
            <div>
              <strong>Smart India Hackathon</strong>
              <p className="mono">A student redesign concept · Not an official platform</p>
            </div>
          </div>

          <div className="footer-cols">
            <div>
              <h5>Explore</h5>
              <button onClick={openProblems}>Problem statements</button>
              <button onClick={() => scrollTo('journey')}>How it works</button>
              <button onClick={() => scrollTo('timeline')}>Timeline</button>
              <button onClick={() => scrollTo('themes')}>Themes</button>
              <button onClick={openSpoc}>Know Your SPOC</button>
            </div>
            <div>
              <h5>Engage</h5>
              <button onClick={() => setShowReview(true)}>Write a review</button>
              <button onClick={() => scrollTo('reviews')}>Read reviews</button>
              <button onClick={() => scrollTo('resources')}>Resources</button>
              <button onClick={() => scrollTo('participate')}>Participate</button>
            </div>
            <div>
              <h5>Contact</h5>
              <a href="mailto:hello@sih.example"><Mail size={14} /> hello@sih.example</a>
              <a href="mailto:press@sih.example"><Send size={14} /> press@sih.example</a>
              <span className="mono footer-loc"><MapPin size={14} /> New Delhi, India</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="mono">© 2026 Smart India Hackathon · Redesign concept</span>
          <span className="mono">Built with React + Vite</span>
        </div>
      </footer>

      {/* ============ COMPARE DOCK ============ */}
      {compare.length > 0 && (
        <div className="compare-dock">
          <div className="dock-inner">
            <span className="dock-label mono"><Layers size={14} /> Compare ({compare.length}/3)</span>
            <div className="dock-items">
              {compareItems.map((p) => (
                <div key={p.id} className="dock-chip">
                  <span>{p.code}</span>
                  <button onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.code}`}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="dock-actions">
              <button className="btn btn-sm btn-ghost" onClick={() => setCompare([])}>Clear</button>
              <button
                className="btn btn-sm btn-primary"
                disabled={compare.length < 2}
                onClick={() => setShowCompare(true)}
              >
                Compare now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ PROBLEM DETAIL MODAL ============ */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-x" onClick={() => setSelected(null)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="modal-body">
              <div className="modal-top">
                <span className={`pill pill-${selected.type.toLowerCase()}`}>{selected.type}</span>
                <span className={`pill diff diff-${selected.difficulty.toLowerCase()}`}>{selected.difficulty}</span>
                <span className="mono modal-code">{selected.code}</span>
              </div>
              <h2>{selected.title}</h2>
              <p className="modal-ministry"><Building2 size={14} /> {selected.ministry}</p>
              <p className="modal-desc">{selected.description}</p>

              <div className="modal-grid">
                <div><span>Theme</span><strong>{selected.theme}</strong></div>
                <div><span>Ideas submitted</span><strong>{selected.ideas}</strong></div>
                <div><span>Prize</span><strong>{selected.prize}</strong></div>
                <div><span>Eligibility</span><strong>{selected.eligibility}</strong></div>
              </div>

              <div className="modal-tags">
                {selected.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>

              <div className="modal-actions">
                <button
                  className={`btn btn-primary ${compare.includes(selected.id) ? 'active' : ''}`}
                  onClick={() => toggleCompare(selected.id)}
                >
                  {compare.includes(selected.id) ? <Check size={16} /> : <Plus size={16} />}
                  {compare.includes(selected.id) ? 'Added to compare' : 'Add to compare'}
                </button>
                <button className="btn btn-ghost" onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ COMPARE MODAL ============ */}
      {showCompare && compareItems.length >= 2 && (
        <div className="modal-backdrop" onClick={() => setShowCompare(false)}>
          <div className="modal modal-wide" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-x" onClick={() => setShowCompare(false)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="modal-body">
              <h2>Side-by-side comparison</h2>
              <div className="compare-table">
                <div className="ct-row ct-head">
                  <div className="ct-label">Attribute</div>
                  {compareItems.map((p) => <div key={p.id}>{p.code}</div>)}
                </div>
                {[
                  ['Title', (p) => p.title],
                  ['Type', (p) => p.type],
                  ['Theme', (p) => p.theme],
                  ['Difficulty', (p) => p.difficulty],
                  ['Ministry', (p) => p.ministry.replace('Ministry of ', '')],
                  ['Ideas', (p) => p.ideas],
                  ['Prize', (p) => p.prize],
                  ['Eligibility', (p) => p.eligibility],
                ].map(([label, fn]) => (
                  <div className="ct-row" key={label}>
                    <div className="ct-label">{label}</div>
                    {compareItems.map((p) => <div key={p.id}>{fn(p)}</div>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ REVIEW FORM MODAL ============ */}
      {showReview && (
        <ReviewFormModal
          onClose={() => setShowReview(false)}
          onSubmit={(review) => {
            setReviews((prev) => [
              { ...review, id: `r${Date.now()}`, date: 'just now' },
              ...prev,
            ])
            setShowReview(false)
            notify('Review submitted', 'Thanks for sharing your experience!')
            setTimeout(() => scrollTo('reviews'), 200)
          }}
        />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}

/* =========================================================
   REVIEW FORM MODAL
   ========================================================= */
function ReviewFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '', email: '', role: 'Student', rating: 0, title: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim()) e.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.rating) e.rating = 'Please pick a rating.'
    if (!form.title.trim()) e.title = 'Add a short headline.'
    if (form.message.trim().length < 10) e.message = 'Review should be at least 10 characters.'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setSubmitting(true)
    setTimeout(() => {
      onSubmit({
        name: form.name.trim(),
        role: form.role,
        rating: form.rating,
        title: form.title.trim(),
        message: form.message.trim(),
      })
    }, 500)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-form" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className="modal-body">
          <span className="kicker mono">// Share your experience</span>
          <h2>Write a review</h2>
          <p className="form-sub">Your feedback helps future participants pick the right problem statement.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label>
                Full name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className={errors.name ? 'err' : ''}
                />
                {errors.name && <span className="err-msg">{errors.name}</span>}
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="you@example.com"
                  className={errors.email ? 'err' : ''}
                />
                {errors.email && <span className="err-msg">{errors.email}</span>}
              </label>
            </div>

            <div className="form-row">
              <label>
                I am a
                <select value={form.role} onChange={(e) => set('role', e.target.value)}>
                  <option>Student</option>
                  <option>Mentor</option>
                  <option>Judge</option>
                  <option>Organiser</option>
                </select>
              </label>

              <label>
                Overall rating
                <div className="rating-row">
                  <StarRating value={form.rating} onChange={(v) => set('rating', v)} />
                  {form.rating > 0 && <span className="mono rating-num">{form.rating}/5</span>}
                </div>
                {errors.rating && <span className="err-msg">{errors.rating}</span>}
              </label>
            </div>

            <label className="full">
              Review headline
              <input
                type="text"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="Sum it up in a line"
                className={errors.title ? 'err' : ''}
              />
              {errors.title && <span className="err-msg">{errors.title}</span>}
            </label>

            <label className="full">
              Your review
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                placeholder="What worked, what didn't, what you'd tell a new team…"
                className={errors.message ? 'err' : ''}
              />
              {errors.message && <span className="err-msg">{errors.message}</span>}
            </label>

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting…' : <><Send size={16} /> Submit review</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}