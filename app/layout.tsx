import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/whatsapp-button'

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
      className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
