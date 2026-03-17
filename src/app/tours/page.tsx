import type { Metadata } from 'next'
import { ToursClient } from '@/components/pages/ToursClient'

export const metadata: Metadata = {
  title: 'Tours | Green Golden Cusco',
  description: 'Full days, trekkings y aventuras en Cusco. Reserva directo sin intermediarios.',
}

export default function ToursPage() {
  return <ToursClient />
}
