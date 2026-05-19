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
  title: 'Yavigo – Premium Visa Processing | 180+ Countries',
  description:
    'Expert visa processing for 180+ destinations. Fast approvals, 95% success rate, secure online process. Apply for your visa today with Yavigo.',
  keywords:
    'visa services, visa processing, e-visa, Schengen visa, UK visa, USA visa, Dubai visa, visa application online',
  generator: 'v0.app',

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  openGraph: {
    title: 'Yavigo – Premium Visa Processing',
    description:
      'Expert visa processing for 180+ destinations. Fast approvals and secure online applications.',
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
