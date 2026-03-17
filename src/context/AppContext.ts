import { createContext, useContext } from 'react'
import type { Lang, Currency } from '@/types'

interface AppContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  currency: Currency
  setCurrency: (c: Currency) => void
}

export const AppContext = createContext<AppContextValue>({
  lang: 'es',
  setLang: () => {},
  currency: 'PEN',
  setCurrency: () => {},
})

export function useApp() {
  return useContext(AppContext)
}
