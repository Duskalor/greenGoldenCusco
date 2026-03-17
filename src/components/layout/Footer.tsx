'use client'

import Link from 'next/link'
import { Container } from '../ui/Container'
import { MapPin, Mail, Phone } from 'lucide-react'

interface FooterProps {
  t: {
    footer: {
      desc: string
      menu: string
      popularTours: string
      contactLabel: string
      terms: string
      complaints: string
      rights: string
    }
    nav: { inicio: string; tours: string; nosotros: string; media: string; contacto: string }
  }
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-dark-secondary border-t border-white/5 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-display font-bold text-gold">GG</span>
              <span className="text-[10px] font-sans text-white/50 tracking-[3px] uppercase">Green Golden Cusco</span>
            </div>
            <p className="font-sans text-sm text-white/40 leading-relaxed">{t.footer.desc}</p>
            <div className="flex gap-3 mt-5">
              {['📘', '📸', '🎬', '⭐'].map((icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-sm cursor-pointer hover:bg-gold/10 hover:border-gold/30 transition-all duration-300">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans text-[11px] font-bold text-gold tracking-[3px] uppercase mb-4">{t.footer.menu}</h4>
            <ul className="space-y-2.5">
              {[
                { path: '/', label: t.nav.inicio },
                { path: '/tours', label: t.nav.tours },
                { path: '/nosotros', label: t.nav.nosotros },
                { path: '/media', label: t.nav.media },
                { path: '/contacto', label: t.nav.contacto },
              ].map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="font-sans text-sm text-white/40 hover:text-gold transition-colors duration-300 no-underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[11px] font-bold text-gold tracking-[3px] uppercase mb-4">{t.footer.popularTours}</h4>
            <ul className="space-y-2.5">
              {['Machu Picchu', 'Montaña 7 Colores', 'Laguna Humantay', 'Camino Inca', 'Salkantay Trek'].map((name) => (
                <li key={name}>
                  <Link href="/tours" className="font-sans text-sm text-white/40 hover:text-gold transition-colors duration-300 no-underline">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[11px] font-bold text-gold tracking-[3px] uppercase mb-4">{t.footer.contactLabel}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-white/40">+51 943 539 286</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-white/40">info@greengoldencusco.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-white/40">Cusco, Perú</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              <span className="text-[10px] font-sans text-white/25 bg-white/5 border border-white/8 rounded px-2.5 py-1">RUC Activo</span>
              <span className="text-[10px] font-sans text-white/25 bg-white/5 border border-white/8 rounded px-2.5 py-1">DIRCETUR</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-white/25">© 2026 Green Golden Cusco. {t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-xs text-white/25 hover:text-gold transition-colors duration-300 no-underline">{t.footer.terms}</a>
            <a href="#" className="font-sans text-xs text-white/25 hover:text-gold transition-colors duration-300 no-underline">{t.footer.complaints}</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
