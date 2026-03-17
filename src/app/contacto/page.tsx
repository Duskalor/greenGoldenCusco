import type { Metadata } from 'next'
import { ContactClient } from '@/components/pages/ContactClient'
export const metadata: Metadata = { title: 'Contacto | Green Golden Cusco', description: 'Escríbenos por WhatsApp o email. Respuesta inmediata.' }
export default function ContactoPage() { return <ContactClient /> }
