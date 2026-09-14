import { ArrowLeft, Rocket, ShieldCheck, Users, IndianRupee, Award, FileCheck, Scale } from 'lucide-react'
import { useEffect } from 'react'

const GUIDELINES = [
  {
    icon: Rocket,
    title: 'Feasibility before deployment',
    body: 'Hackathons are opportunities to quickly check the feasibility of a novel idea. Projects developed during hackathons are usually very crude and absolutely not ready for field implementation. They require considerable work before deployment as reliable, dependable solutions.',
  },
  {
    icon: FileCheck,
    title: 'Development duration',
    body: 'Ideally the duration for development and implementation of an SIH winning project should be between 6 months to 1 year. However, the duration can be increased or decreased with the mutual consent of all the involved parties.',
  },
  {
    icon: Users,
    title: 'Initiate communication',
    body: 'Once the Ministry of Education / AICTE shares the contact details of the winning teams with the respective ministry or department, they are requested to directly initiate communication with the winning teams to discuss the further development and implementation roadmap.',
  },
  {
    icon: FileCheck,
    title: 'Detailed project plan',
    body: 'Ministry or department should request a detailed project plan from the winning team, covering implementation details, tools (software and hardware) required, expert support required, along with timelines.',
  },
  {
    icon: Rocket,
    title: 'Procurement of critical tools',
    body: 'Ministry should procure commercial software or hardware critical for the development and implementation of the winning project.',
  },
  {
    icon: Users,
    title: 'Coordination agency',
    body: 'Ideally, the ministry or department may identify an appropriate autonomous or technical agency under its aegis for overall coordination, development and implementation. If no such agency is available, a panel of experts may be appointed to oversee the development and deployment of the SIH-winning solution.',
  },
  {
    icon: Users,
    title: 'Assign a technical mentor',
    body: 'Minimum one experienced technical expert per winning idea should be assigned as a mentor to ensure timely progress and implementation of the project.',
  },
  {
    icon: Users,
    title: 'Regular monitoring sessions',
    body: 'In the majority of cases, the winning team will work remotely from their college. Effective coordination is critical. The ministry or department should schedule regular weekly or monthly monitoring sessions with each team through video conferencing.',
  },
  {
    icon: Users,
    title: 'Faculty co-mentor',
    body: 'If required, an appropriate faculty member from the same institution as the winning team may be co-opted as an additional mentor for better coordination on project development.',
  },
  {
    icon: FileCheck,
    title: 'Institutional consent',
    body: 'Written consent from the winning team\u2019s educational institution should be taken, committing support (permissions and time commitments) during development and deployment. Educational institutions will not have any financial burden in this regard.',
  },
  {
    icon: IndianRupee,
    title: 'Site visits',
    body: 'Selected teams may be asked to visit the ministry or deployment site when required. In such cases, expenses for travel, stay and other logistics are borne by the concerned department or ministry as per usual government norms.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity expert',
    body: 'In the case of software solutions, a cybersecurity expert may be engaged to ensure the development meets the required safety standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Product design expert',
    body: 'For hardware-based products, it is highly recommended that a Product Design Expert be regularly consulted to ensure a state-of-the-art product.',
  },
  {
    icon: IndianRupee,
    title: 'Stipend & internship',
    body: 'It is highly recommended that the department provide a monthly stipend and/or internship to all members of teams working on development. Each team member can be given a consolidated stipend of 15,000 per month for a period of 6 months (minimum). Note: a maximum of 6 students receive this stipend.',
  },
  {
    icon: FileCheck,
    title: 'Quarterly status reports',
    body: 'Ministry or department will share quarterly status reports regarding the implementation and development of SIH-winning solutions with the Ministry of Education\u2019s Innovation Cell and AICTE.',
  },
]

const TRAVEL = [
  {
    label: 'Long Distance Travel',
    detail: 'Each student is entitled to AC-III tier train ticket fare. The amount is reimbursed on producing the tickets.',
  },
  {
    label: 'Short Distance Travel',
    detail: 'Each student is entitled to \u20B91,000 per day for short-distance travel (within a 100 km radius of the college). Bills and receipts must be produced.',
  },
  {
    label: 'Stay',
    detail: 'Each student is entitled to \u20B91,500 per day for long-distance travel, reimbursed on producing valid bills and receipts.',
  },
  {
    label: 'Field Visit Allowance',
    detail: 'For costs incurred during field visits (data collection, user testing), each person is entitled to \u20B9500 per day. Prior approval must be taken from the ministry or department.',
  },
]

export default function ProjectImplementationPage({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="pi-page">
      <div className="pi-topbar">
        <button className="pp-back" onClick={onBack}>
          <ArrowLeft size={18} /> Back to home
        </button>
        <h1>Project Implementation</h1>
      </div>

      <div className="container">
        {/* hero */}
        <section className="pi-hero">
          <span className="kicker mono">// Deployment Guidelines</span>
          <h1>From winning prototype to deployed solution</h1>
          <p>
            The Smart India Hackathon is envisioned to promote innovation and
            out-of-the-box thinking among young minds. Post SIH, the Ministry
            of Education is committed to further development, implementation
            and deployment of SIH-winning ideas by supporting the concerned
            ministries and departments.
          </p>
          <p>
            These guidelines outline the process that a sponsoring ministry or
            department is requested to follow when taking a winning prototype
            from the final stage to a field-ready solution.
          </p>
        </section>

        {/* guidelines */}
        <section className="pi-block">
          <h2 className="pi-block-title">
            <span className="kicker mono">01</span>
            Deployment guidelines
          </h2>
          <div className="pi-grid">
            {GUIDELINES.map((g, i) => {
              const Icon = g.icon
              return (
                <article className="pi-card" key={g.title} style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="pi-card-icon"><Icon size={20} /></div>
                  <div className="pi-card-body">
                    <span className="mono pi-card-num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3>{g.title}</h3>
                    <p>{g.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* stipend highlight */}
        <section className="pi-highlight">
          <div className="pi-highlight-icon"><IndianRupee size={22} /></div>
          <div>
            <h3>Stipend &amp; internship support</h3>
            <p>
              Each team member can receive <strong>\u20B910,000\u2013\u20B915,000 per month</strong>{' '}
              for a minimum of 6 months during development and implementation.
              A maximum of 6 students per team are eligible for this stipend.
            </p>
          </div>
        </section>

        {/* travel */}
        <section className="pi-block">
          <h2 className="pi-block-title">
            <span className="kicker mono">02</span>
            Travel, stay &amp; field visit allowance
          </h2>
          <div className="pi-travel-grid">
            {TRAVEL.map((t) => (
              <div className="pi-travel-card" key={t.label}>
                <h4>{t.label}</h4>
                <p>{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IP */}
        <section className="pi-ip">
          <div className="pi-ip-head">
            <Scale size={22} />
            <h2>Intellectual Property</h2>
          </div>
          <p className="pi-ip-lead">
            The Intellectual Property (IP) of the solution resides with the
            students who have developed and deployed the solution post-hackathon,
            but the concerned ministry will have <strong>lifetime access</strong>{' '}
            to the solution for free.
          </p>
          <p>
            This has been done to encourage startups to be created out of the
            developed solutions, while also keeping in mind the interest of the
            involved ministries.
          </p>
          <div className="pi-ip-notes">
            <div className="pi-note">
              <Award size={16} />
              <p>
                If a ministry IT or domain expert becomes a major contributor,
                they may be considered a co-contributor in the IP after due
                consultation between the team, the ministry and MIC/AICTE.
              </p>
            </div>
            <div className="pi-note">
              <ShieldCheck size={16} />
              <p>
                Teams must use only verified open-source components and
                acknowledge them. Any conflict from plagiarism, IP or copyright
                violations is solely the responsibility of the concerned team
                members.
              </p>
            </div>
            <div className="pi-note">
              <Users size={16} />
              <p>
                If team members pass out or leave, the team has the flexibility
                to include new members as replacements to continue development
                and deployment.
              </p>
            </div>
          </div>
        </section>

        <div className="pi-cta">
          <button className="btn btn-primary" onClick={onBack}>
            Back to home
          </button>
        </div>
      </div>
    </div>
  )
}