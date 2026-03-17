'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'
import { useApp } from '@/context/AppContext'
import { translations } from '@/data/translations'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { lang, setLang, currency, setCurrency } = useApp()
  const t = translations[lang]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar lang={lang} setLang={setLang} currency={currency} setCurrency={setCurrency} t={t} />
      <main>{children}</main>
      <Footer t={t} />
      <WhatsAppFloat />
    </div>
  )
}
