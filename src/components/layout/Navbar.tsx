'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { LangSwitcher } from './LangSwitcher'
import { CurrencySwitcher } from './CurrencySwitcher'
import type { Lang, Currency } from '@/types'

interface NavbarProps {
  lang: Lang
  setLang: (l: Lang) => void
  currency: Currency
  setCurrency: (c: Currency) => void
  t: { nav: { inicio: string; tours: string; nosotros: string; media: string; contacto: string; reservar: string } }
}

export function Navbar({ lang, setLang, currency, setCurrency, t }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) setOpen(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const transparent = pathname === '/' && !scrolled

  const links = [
    { path: '/', label: t.nav.inicio },
    { path: '/tours', label: t.nav.tours },
    { path: '/nosotros', label: t.nav.nosotros },
    { path: '/media', label: t.nav.media },
    { path: '/contacto', label: t.nav.contacto },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      transparent ? 'bg-transparent py-[18px]' : 'bg-[rgba(15,23,12,0.96)] backdrop-blur-xl border-b border-gold/15 py-[10px]'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="text-[28px] font-bold font-display text-gold">GG</span>
          <div className="h-5 w-px bg-gold/35" />
          <span className="text-[10px] font-sans text-white/60 tracking-[3px] uppercase">Green Golden Cusco</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {links.map((l) => (
            <Link key={l.path} href={l.path}
              className={`text-[11px] font-sans tracking-[2px] uppercase no-underline transition-all duration-300 pb-1 border-b-2 ${
                pathname === l.path ? 'text-gold border-gold' : 'text-white/70 border-transparent hover:text-white'
              }`}>
              {l.label}
            </Link>
          ))}
          <LangSwitcher lang={lang} setLang={setLang} />
          <CurrencySwitcher currency={currency} setCurrency={setCurrency} />
          <Button as="a" href="https://wa.me/51943539286?text=Hola" target="_blank" rel="noreferrer" size="sm">
            {t.nav.reservar}
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2.5">
          <LangSwitcher lang={lang} setLang={setLang} />
          <CurrencySwitcher currency={currency} setCurrency={setCurrency} />
          <button onClick={() => setOpen(!open)} className="bg-transparent border-0 text-gold text-2xl cursor-pointer p-1">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[rgba(15,23,12,0.98)] px-6 py-6 flex flex-col gap-5 items-center border-t border-gold/10">
          {links.map((l) => (
            <Link key={l.path} href={l.path}
              className={`text-sm font-sans tracking-[2px] uppercase no-underline transition-colors duration-300 ${
                pathname === l.path ? 'text-gold' : 'text-white/70'
              }`}>
              {l.label}
            </Link>
          ))}
          <Button as="a" href="https://wa.me/51943539286?text=Hola" target="_blank" rel="noreferrer" size="sm" className="mt-2">
            {t.nav.reservar}
          </Button>
        </div>
      )}
    </nav>
  )
}
