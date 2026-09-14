import './globals.css'
import Providers from './providers'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

export const metadata = {
  title: 'Smart India Hackathon — Redesigned',
  description: 'The world\u2019s largest open innovation movement \u2014 a student redesign concept.',
  icons: { icon: '/logos/sih-logo.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}