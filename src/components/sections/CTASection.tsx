'use client'

import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Animate } from '../ui/Animate'
import { getWhatsAppUrl } from '../../lib/whatsapp'

interface CTASectionProps {
  t: {
    cta: { label: string; title: string; desc: string; btn: string }
  }
  lang: string
}

export function CTASection({ t }: CTASectionProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-dark to-dark-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] via-gold/[0.06] to-gold/[0.03]" />
      <Container className="relative z-10 text-center">
        <Animate>
          <span className="text-[11px] font-sans text-gold tracking-[4px] uppercase">{t.cta.label}</span>
          <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white mt-3 mb-4">{t.cta.title}</h2>
          <p className="font-sans text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">{t.cta.desc}</p>
          <Button variant="whatsapp" size="lg" as="a" href={getWhatsAppUrl('Hola, quiero diseñar mi itinerario')} target="_blank" rel="noreferrer">
            💬 {t.cta.btn}
          </Button>
          <p className="font-sans text-xs text-white/25 mt-5">Sin compromiso · Respuesta inmediata · Precios directos</p>
        </Animate>
      </Container>
    </section>
  )
}
