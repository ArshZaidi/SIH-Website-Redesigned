import { getProblems } from '@/lib/loadProblems'
import HeroSection from './components/HeroSection'
import HeroVideo from './components/HeroVideo'
import AboutSection from './components/AboutSection'
import FeaturedSection from './components/FeaturedSection'
import FindYourChallengeBand from './components/FindYourChallengeBand'
import MilestonesCarousel from './components/MilestonesCarousel'
import ExplorerSection from './components/ExplorerSection'
import JourneySection from './components/JourneySection'
import TimelineSection from './components/TimelineSection'
import ThemesSection from './components/ThemesSection'
import ParticipateSection from './components/ParticipateSection'
import ReviewsSection from './components/ReviewsSection'
import ResourcesSection from './components/ResourcesSection'
import OrganizingCommittee from './components/OrganizingCommittee'
import WhySIHMatters from './components/WhySIHMatters'
import ContactSection from './components/ContactSection'

export default function HomePage() {
  const problems = getProblems()

  return (
    <>
      <HeroSection problems={problems} />
      <HeroVideo />
      <AboutSection />
      <FeaturedSection problems={problems} />
      <FindYourChallengeBand problems={problems} />
      <MilestonesCarousel />
      <ExplorerSection problems={problems} />
      <JourneySection />
      <TimelineSection />
      <ThemesSection />
      <ParticipateSection />
      <ReviewsSection />
      <ResourcesSection />
      <OrganizingCommittee />
      <WhySIHMatters />
      <ContactSection />
    </>
  )
}