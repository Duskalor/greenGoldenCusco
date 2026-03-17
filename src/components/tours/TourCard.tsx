'use client'

import { useRouter } from 'next/navigation'
import { Clock, Mountain, Users } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Animate } from '../ui/Animate'
import { tourMeta, tourPricesUSD } from '../../data/tours'
import type { Tour, Currency } from '../../types'

interface TourCardProps {
  tour: Tour
  from: string
  details: string
  currency?: Currency
  delay?: number
}

export function TourCard({ tour, from, details, currency = 'PEN', delay = 0 }: TourCardProps) {
  const router = useRouter()
  const meta = tourMeta[tour.id] ?? { emoji: '🏔️', gradient: 'from-dark to-dark-secondary' }
  const displayPrice = currency === 'USD' ? (tourPricesUSD[tour.id] ?? tour.price) : tour.price

  return (
    <Animate delay={delay}>
      <Card hover onClick={() => router.push(`/tours/${tour.id}`)} className="p-7 h-full flex flex-col">
        <div className="flex justify-between items-start mb-5">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-2xl`}>
            {meta.emoji}
          </div>
          <Badge variant="gold">{tour.duration}</Badge>
        </div>

        <span className="text-[10px] font-sans text-white/30 tracking-[2px] uppercase">{tour.tag}</span>
        <h3 className="font-display text-xl font-bold text-white mt-1.5 mb-2.5">{tour.name}</h3>
        <p className="font-sans text-sm text-white/50 leading-relaxed mb-5 flex-1">{tour.description}</p>

        <div className="flex items-center gap-4 mb-5 text-[11px] font-sans text-white/35">
          <span className="flex items-center gap-1"><Mountain size={12} className="text-gold/60" />{tour.altitude}</span>
          <span className="flex items-center gap-1"><Users size={12} className="text-gold/60" />{tour.groupSize}</span>
          <span className="flex items-center gap-1"><Clock size={12} className="text-gold/60" />{tour.difficulty}</span>
        </div>

        <div className="flex justify-between items-center border-t border-white/6 pt-5">
          <span className="font-sans text-[17px] font-bold text-gold">{from} {displayPrice}</span>
          <span className="text-xs font-sans text-white/40 group-hover:text-gold transition-colors duration-300">{details}</span>
        </div>
      </Card>
    </Animate>
  )
}
