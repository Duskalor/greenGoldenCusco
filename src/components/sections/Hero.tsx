'use client'

import { Button } from '../ui/Button'
import { Animate } from '../ui/Animate'

interface HeroProps {
  t: {
    hero: { badge: string; title1: string; titleHighlight: string; subtitle: string; cta1: string; cta2: string; stat1: string; stat2: string; stat3: string }
  }
  onViewTours: () => void
}

export function Hero({ t, onViewTours }: HeroProps) {
  const { hero } = t
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f170c] via-[#1a2e0f] to-[#0f170c]">
      {/* Background orbs */}
      <div
        className="absolute -top-52 -right-52 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(166,141,73,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-28 -left-28 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(64,145,108,0.06) 0%, transparent 70%)' }}
      />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-[880px] px-6 text-center relative z-10">
        <Animate>
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-5 py-2 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            <span className="text-[11px] font-sans text-gold tracking-[4px] uppercase">{hero.badge}</span>
          </div>
        </Animate>

        <Animate delay={0.12}>
          <h1 className="font-display text-[clamp(38px,7vw,78px)] font-bold text-white leading-[1.08] mb-6">
            {hero.title1}{' '}
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent italic">
              {hero.titleHighlight}
            </span>
          </h1>
        </Animate>

        <Animate delay={0.25}>
          <p className="font-sans text-[clamp(16px,2vw,19px)] text-white/50 max-w-[580px] mx-auto mb-11 leading-relaxed">
            {hero.subtitle}
          </p>
        </Animate>

        <Animate delay={0.38}>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Button size="lg" onClick={onViewTours}>{hero.cta1}</Button>
            <Button variant="outline" size="lg" as="a" href="https://wa.me/51943539286?text=Hola" target="_blank" rel="noreferrer">
              💬 {hero.cta2}
            </Button>
          </div>
        </Animate>

        <Animate delay={0.5}>
          <div className="flex justify-center gap-12 mt-16 flex-wrap">
            {[['500+', hero.stat1], ['9', hero.stat2], ['5★', hero.stat3]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-display text-[30px] font-bold text-gold">{n}</div>
                <div className="font-sans text-[11px] text-white/35 tracking-[2px] uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </Animate>
      </div>
    </section>
  )
}
