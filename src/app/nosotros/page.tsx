import type { Metadata } from 'next'
import { AboutClient } from '@/components/pages/AboutClient'
export const metadata: Metadata = { title: 'Nosotros | Green Golden Cusco', description: 'Agencia local fundada por cusqueños.' }
export default function NosotrosPage() { return <AboutClient /> }
