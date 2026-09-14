import { Archive } from 'lucide-react'
import Link from 'next/link'
import Reveal from './ui/Reveal'

export default function AboutSection() {
  return (
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
                grown into the <strong>world&rsquo;s largest open innovation platform</strong>.
              </p>
              <p>
                SIH provides a dynamic platform for students to develop and
                showcase creative solutions to real-world problems sourced
                from ministries, state departments, PSUs, industries and NGOs.
                By encouraging participants to think critically and innovatively,
                the hackathon bridges the gap between academic knowledge and
                practical application — shifting students from marks-and-exams
                to problems-and-solutions.
              </p>
              <p>
                Each edition builds on the previous one, refining its approach
                and expanding its impact. Winning solutions do not stay on
                paper — several have gone on to become deployable tools,
                products and startups, feeding directly into incubators and
                government programmes.
              </p>

              <div className="about-facts">
                <div className="af-item"><strong className="mono">2017</strong><span>Founded by MIC &amp; AICTE</span></div>
                <div className="af-item"><strong className="mono">60+</strong><span>Nodal centres nationwide</span></div>
                <div className="af-item"><strong className="mono">36h</strong><span>Non-stop grand finale</span></div>
                <div className="af-item"><strong className="mono">₹1L</strong><span>Per winning team</span></div>
              </div>

              <div className="about-actions">
                <Link href="/archive" className="btn btn-ghost">
                  <Archive size={15} /> See all editions
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="about-aside">
              <div className="aa-card aa-quote">
                <span className="aa-mark">&ldquo;</span>
                <p>Through Smart India Hackathon, the youth power of the country is extracting the Amrit of solutions for developed India.</p>
                <span className="aa-author">— Shri Narendra Modi<br /><em>Hon&rsquo;ble Prime Minister of India</em></span>
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
  )
}