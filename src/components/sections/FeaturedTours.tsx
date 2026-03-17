'use client'

import { useRouter } from 'next/navigation'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { TourCard } from '../tours/TourCard'
import { Button } from '../ui/Button'
import { Animate } from '../ui/Animate'
import type { Tour, Currency } from '../../types'

interface FeaturedToursProps {
  tours: Tour[]
  currency?: Currency
  t: {
    featured: { label: string; title: string; seeAll: string; details: string; from: string }
  }
}

export function FeaturedTours({ tours, t, currency = 'PEN' }: FeaturedToursProps) {
  const router = useRouter()
  return (
    <section className="py-24 bg-dark px-6">
      <Container>
        <SectionHeader label={t.featured.label} title={t.featured.title} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.slice(0, 6).map((tour, i) => (
            <TourCard key={tour.id} tour={tour} from={t.featured.from} details={t.featured.details} currency={currency} delay={i * 0.08} />
          ))}
        </div>
        <Animate delay={0.3}>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => router.push('/tours')}>{t.featured.seeAll}</Button>
          </div>
        </Animate>
      </Container>
    </section>
  )
}
