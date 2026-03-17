'use client'

import { useState } from 'react'
import { AppContext } from '@/context/AppContext'
import { ClientLayout } from '@/components/layout/ClientLayout'
import type { Lang, Currency } from '@/types'

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const [currency, setCurrency] = useState<Currency>('PEN')

  return (
    <AppContext.Provider value={{ lang, setLang, currency, setCurrency }}>
      <ClientLayout>{children}</ClientLayout>
    </AppContext.Provider>
  )
}
