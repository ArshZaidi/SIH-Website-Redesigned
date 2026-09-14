import {
  Globe, Lightbulb, Rocket, TrendingUp, Award, ArrowRight,
} from 'lucide-react'

const POINTS = [
  { icon: Globe, title: 'World\u2019s largest open innovation model',
    desc: 'SIH connects real problem statements from ministries, state departments, PSUs and industries directly to student teams across 9,406+ institutes.' },
  { icon: Lightbulb, title: 'From classrooms to real-world impact',
    desc: 'It shifts students from marks-and-exams to problems-and-solutions, giving them exposure to actual societal and industrial challenges early in their careers.' },
  { icon: Rocket, title: 'A pipeline for startups and incubation',
    desc: 'Winning solutions have gone on to become deployable tools, products and startups — feeding ideas into incubators and government programmes across priority sectors.' },
  { icon: TrendingUp, title: 'Aligned with Viksit Bharat @2047',
    desc: 'SIH themes — AI, clean energy, medtech, agriculture, cybersecurity, space tech and digital public services — directly support India\u2019s vision of a self-reliant, innovative nation.' },
  { icon: Award, title: 'National recognition and rewards',
    desc: 'Each winning team receives \u20B91,00,000, incubation support, mentorship from ministry-appointed experts and fast-tracked pilot opportunities.' },
]

export default function WhySIHMatters() {
  return (
    <section className="section why-section" id="why-sih">
      <div className="container">
        <div className="why-grid">
          <div className="why-left">
            <span className="kicker mono">// Why SIH Matters</span>
            <h2>More than a hackathon.<br />A national innovation engine.</h2>
            <p>
              Smart India Hackathon is not just a 36-hour sprint — it is a
              structured pipeline that converts student creativity into
              deployable solutions for the nation. By bringing together
              students, mentors, domain experts and government stakeholders
              under one roof, SIH creates a live laboratory where classroom
              learning meets real-world constraints and impact.
            </p>
            <div className="why-cta">
              <a href="https://sih.gov.in" target="_blank" rel="noreferrer noopener" className="btn btn-primary">
                Visit sih.gov.in <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="why-right">
            {POINTS.map((p, i) => {
              const Icon = p.icon
              return (
                <div className="why-point" key={p.title} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="wp-icon"><Icon size={18} /></div>
                  <div className="wp-text">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}