import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/whatsapp-button'
import SmoothScroll from '@/components/premium/SmoothScroll'
import CustomCursor from '@/components/premium/CustomCursor'
import ScrollProgress from '@/components/premium/ScrollProgress'
import AmbientParticles from '@/components/premium/AmbientParticles'
import FilmGrain from '@/components/premium/FilmGrain'
import ClickRipple from '@/components/premium/ClickRipple'
import EasterEggs from '@/components/premium/EasterEggs'
import MagicTrail from '@/components/premium/MagicTrail'
import WelcomeExperience from '@/components/premium/WelcomeExperience'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yavigo.com'),
  title: 'Yavigo – B2B Visa & Immigration Services for Travel Partners',
  description:
    'Yavigo is a B2B visa and immigration partner for travel agencies, corporates, and immigration consultants. Expert handling, secure online workflows, and dedicated specialist support.',
  keywords:
    'B2B visa services, immigration services, visa processing partner, travel agency visa partner, corporate visa, e-visa, Schengen visa, UK visa, USA visa, Dubai visa',
  generator: 'v0.app',

  openGraph: {
    title: 'Yavigo – B2B Visa & Immigration Services',
    description:
      'B2B visa and immigration expertise for travel partners and corporates. Secure online workflows and dedicated specialist support.',
    type: 'website',
    images: ['/favicon.ico'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <SmoothScroll>
          {/* Atmospheric global layers (behind content) */}
          <AmbientParticles />
          <FilmGrain />

          {/* Active overlays */}
          <ScrollProgress />
          <MagicTrail />
          <CustomCursor />
          <ClickRipple />
          <EasterEggs />
          <WelcomeExperience />

          {/* App tree */}
          {children}

          {/* Floating utilities */}
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  )
}
