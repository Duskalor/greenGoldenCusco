'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { TourCard } from '@/components/tours/TourCard'
import { Animate } from '@/components/ui/Animate'
import { useApp } from '@/context/AppContext'
import { translations } from '@/data/translations'
import type { Tour } from '@/types'

export function ToursClient() {
  const [filter, setFilter] = useState<'all' | 'fullday' | 'multiday'>('all')
  const { lang, currency } = useApp()
  const t = translations[lang]
  const tours: Tour[] = t.tours ?? []
  const tp = t.toursPage

  const filtered = tours.filter((tour: Tour) => {
    if (filter === 'fullday') return !tour.duration.includes('D') && !tour.duration.includes('Día') && !tour.duration.includes('dia')
    if (filter === 'multiday') return tour.duration.includes('D') || tour.duration.includes('N')
    return true
  })

  return (
    <div className="pt-24 pb-16 bg-dark min-h-screen">
      <Container>
        <Animate>
          <div className="text-center mb-12 pt-8">
            <span className="text-[11px] font-sans text-gold tracking-[4px] uppercase">{tp.label}</span>
            <h1 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white mt-3 mb-3">{tp.title}</h1>
            <p className="font-sans text-white/50 max-w-lg mx-auto">{tp.desc}</p>
          </div>
        </Animate>
        <Animate delay={0.1}>
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {([['all', tp.all], ['fullday', tp.fullDay], ['multiday', tp.multiDay]] as const).map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`px-5 py-2 rounded-full text-sm font-sans font-semibold tracking-wide transition-all duration-300 border ${
                  filter === key ? 'bg-gold text-dark border-gold' : 'bg-transparent text-white/60 border-white/15 hover:border-gold/40 hover:text-white'
                }`}>
                {label}
              </button>
            ))}
          </div>
        </Animate>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tour: Tour, i: number) => (
            <TourCard key={tour.id} tour={tour} from={t.featured.from} details={t.featured.details} currency={currency} delay={i * 0.06} />
          ))}
        </div>
      </Container>
    </div>
  )
}
