'use client'

import { useRouter } from 'next/navigation'
import { Hero } from '@/components/sections/Hero'
import { FeaturedTours } from '@/components/sections/FeaturedTours'
import { Commitments } from '@/components/sections/Commitments'
import { CTASection } from '@/components/sections/CTASection'
import { useApp } from '@/context/AppContext'
import { translations } from '@/data/translations'

export default function HomePage() {
  const router = useRouter()
  const { lang, currency } = useApp()
  const t = translations[lang]

  return (
    <>
      <Hero t={t} onViewTours={() => router.push('/tours')} />
      <FeaturedTours tours={t.tours} t={t} currency={currency} />
      <Commitments t={t} />
      <CTASection t={t} lang={lang} />
    </>
  )
}
