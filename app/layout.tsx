import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Elder Care Companion',
    default: 'Elder Care Companion',
  },
  description:
    'Peace of mind for families, dignity for elders. Monitor medications, wellness check-ins, appointments, and emergency alerts in one secure dashboard.',
  keywords: ['elder care', 'family caregiver', 'medication tracker', 'wellness monitoring'],
  openGraph: {
    siteName: 'Elder Care Companion',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
