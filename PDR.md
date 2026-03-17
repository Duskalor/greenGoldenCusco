# PDR — Green Golden Cusco
## Product Development Requirements

**Agencia de viajes turísticos · Cusco, Perú**
Versión: 2.0 | Fecha: 2026-03-16 | Estado: En desarrollo

---

## 1. Visión del Producto

Green Golden Cusco es una agencia de viajes boutique ubicada en Cusco. Su propuesta de valor es ofrecer experiencias auténticas, responsables y de alta calidad en los destinos más icónicos de la región, sin intermediarios.

El sitio web es el **canal principal de captación de clientes**. Debe transmitir confianza, profesionalismo y emoción por el destino, en tres idiomas (ES / EN / PT), y convertir visitas en reservas directas vía WhatsApp.

---

## 2. Estado Actual del Stack

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Framework | Next.js 15 App Router | ✅ Implementado |
| Estilos | Tailwind CSS v4 + PostCSS | ✅ Implementado |
| Tipado | TypeScript 5 | ✅ Implementado |
| Routing | Next.js file-based routing | ✅ Implementado |
| i18n | Context API custom (ES/EN/PT) | ✅ Implementado |
| Moneda | Toggle PEN/USD | ✅ Implementado |
| SEO base | Metadata API de Next.js | ✅ Implementado |
| SSG Tours | generateStaticParams (9 tours) | ✅ Implementado |
| Deploy | — | ❌ Pendiente |
| Backend | — | ❌ Pendiente |

---

## 3. Objetivos de Negocio

| Prioridad | Objetivo |
|-----------|----------|
| P0 | Generar reservas directas vía WhatsApp sin intermediarios |
| P0 | Mostrar catálogo de tours con precios en S/. y USD |
| P1 | Posicionarse en Google para búsquedas de tours en Cusco |
| P1 | Generar confianza con credenciales legales (RUC, DIRCETUR) |
| P1 | Capturar turistas EN y PT (Brasil, mercado anglófono) |
| P2 | Construir presencia en redes sociales |
| P2 | Escalar a sistema de reservas con calendario |

---

## 4. Pendientes por Fase

---

### FASE 1 — Operativo Mínimo
> **Meta**: Que el sitio pueda recibir clientes reales.

#### 4.1 Imágenes Reales 🔴 CRÍTICO

**Problema**: El sitio usa emojis como placeholders. Ningún turista reserva sin ver fotos.

**Entregables requeridos**:

| Asset | Dimensiones | Cantidad |
|-------|-------------|----------|
| Hero homepage | 1920×1080px | 1 |
| Thumbnail por tour | 800×600px | 9 |
| Hero por tour | 1600×900px | 9 |
| Galería por tour | 800×600px | 3–5 por tour |
| Foto equipo | 400×400px | 4 (Carlos, María, Diego, Luz) |
| Galería general | Variado | 9+ |

**Implementación técnica**:
- Formato: WebP con fallback JPG
- Componente: `next/image` con `sizes` responsivo
- Estructura: `/public/images/tours/{id}/hero.webp`
- Lazy loading automático (Next.js default)

```tsx
// Reemplazar placeholder emoji por:
<Image
  src={`/images/tours/${tour.id}/thumb.webp`}
  alt={tour.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
```

---

#### 4.2 Formulario de Contacto Funcional 🔴 CRÍTICO

**Problema**: El form actual solo hace `setSent(true)` — no envía ningún mensaje.

**Solución recomendada**: Resend (gratis hasta 3,000 emails/mes)

**Implementación**:
```bash
npm install resend
```

```ts
// src/app/api/contact/route.ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()
  await resend.emails.send({
    from: 'web@greengoldencusco.com',
    to: 'info@greengoldencusco.com',
    subject: `[Web] ${subject} — ${name}`,
    text: `De: ${name} (${email})\n\n${message}`,
  })
  return Response.json({ ok: true })
}
```

**Variables de entorno requeridas**:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

**Alternativas más simples**:
- Formspree (sin backend, solo HTML)
- Netlify Forms (si se deploya en Netlify)

---

#### 4.3 Deploy en Vercel 🔴 CRÍTICO

**Pasos**:
1. `git push` al repositorio GitHub
2. Conectar repo en [vercel.com](https://vercel.com) — import project
3. Configurar env vars (`RESEND_API_KEY`)
4. Deploy automático en cada push a `main`

**Configuración next.config.ts para producción**:
```ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
}
```

**Dominio**: Conectar `greengoldencusco.com` en Settings → Domains de Vercel.

**Costo**: Gratis (Vercel Hobby plan cubre este caso de uso).

---

### FASE 2 — SEO y Presencia Online
> **Meta**: Que Google indexe el sitio y aparezca en búsquedas relevantes.

#### 4.4 sitemap.xml Dinámico 🟡 IMPORTANTE

**Implementación**:
```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { toursES } from '@/data/tours'

export default function sitemap(): MetadataRoute.Sitemap {
  const tourUrls = toursES.map((tour) => ({
    url: `https://greengoldencusco.com/tours/${tour.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://greengoldencusco.com', lastModified: new Date(), priority: 1 },
    { url: 'https://greengoldencusco.com/tours', lastModified: new Date(), priority: 0.9 },
    { url: 'https://greengoldencusco.com/nosotros', lastModified: new Date(), priority: 0.5 },
    { url: 'https://greengoldencusco.com/contacto', lastModified: new Date(), priority: 0.6 },
    ...tourUrls,
  ]
}
```

---

#### 4.5 robots.txt 🟡 IMPORTANTE

```ts
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://greengoldencusco.com/sitemap.xml',
  }
}
```

---

#### 4.6 Open Graph Image 🟡 IMPORTANTE

**Problema**: Sin esto, compartir el link en WhatsApp/redes no muestra preview visual.

**Archivo requerido**: `/public/og-image.jpg` (1200×630px)
- Fondo oscuro con el logo + foto de Machu Picchu o Montaña 7 Colores
- Texto: "Green Golden Cusco — Tours en Cusco desde S/. 50"

**Implementación en layout.tsx**:
```ts
export const metadata: Metadata = {
  openGraph: {
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
}
```

---

#### 4.7 Schema.org JSON-LD 🟡 IMPORTANTE

Aparece en rich results de Google (estrellitas, precio, etc).

```tsx
// En TourDetailClient.tsx — agregar dentro del return:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.name,
      description: tour.description,
      provider: {
        '@type': 'TravelAgency',
        name: 'Green Golden Cusco',
        url: 'https://greengoldencusco.com',
      },
      offers: {
        '@type': 'Offer',
        price: tour.price.replace('S/. ', ''),
        priceCurrency: 'PEN',
      },
    }),
  }}
/>
```

**También agregar en layout.tsx** (LocalBusiness):
```json
{
  "@type": "TravelAgency",
  "name": "Green Golden Cusco",
  "address": { "@type": "PostalAddress", "addressLocality": "Cusco", "addressCountry": "PE" },
  "telephone": "+51943539286",
  "url": "https://greengoldencusco.com"
}
```

---

#### 4.8 Google Analytics 4 🟡 IMPORTANTE

```bash
npm install @next/third-parties
```

```tsx
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

// Dentro de <html>:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

**Variable de entorno**:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

### FASE 3 — Conversión y Confianza
> **Meta**: Aumentar el porcentaje de visitas que terminan en consulta o reserva.

#### 4.9 Testimonios Reales 🟡 IMPORTANTE

**Problema**: La sección de testimonios tiene placeholders. Sin prueba social real, la tasa de conversión baja.

**Mínimo viable**:
- 3 testimonios reales con nombre, país y tour específico
- Pueden ser capturas de WhatsApp convertidas a componente
- Formato recomendado:

```ts
interface Testimonial {
  name: string        // "Sarah M."
  country: string     // "🇺🇸 Estados Unidos"
  tour: string        // "Machu Picchu"
  text: string        // "Increíble experiencia..."
  rating: 5
  date: string        // "Febrero 2026"
}
```

**Componente**: Carousel con Swiper o CSS scroll-snap nativo.

---

#### 4.10 Sección de Estadísticas Reales

**Problema**: Los contadores del hero ("500+ viajeros", "5★") son estimados. Reemplazar con datos reales o removerlos.

**Fuentes de datos**:
- Conteo de clientes en WhatsApp
- Rating real de Google My Business o TripAdvisor
- Años de operación como agencia

---

#### 4.11 Favicon Completo

**Archivos requeridos**:
```
/public/favicon.ico          (32×32px)
/public/favicon.svg          (vectorial — ya existe, verificar)
/public/apple-touch-icon.png (180×180px)
/public/favicon-192.png      (PWA)
/public/favicon-512.png      (PWA)
```

**En layout.tsx**:
```ts
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}
```

---

#### 4.12 next/font en vez de Google CDN

**Problema**: Las fuentes se cargan desde CDN de Google → latencia extra + posible flash.

```tsx
// src/app/layout.tsx
import { Playfair_Display, DM_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

// En <html>: className={`${playfair.variable} ${dmSans.variable}`}
```

**Beneficio**: Fuentes optimizadas, sin flash, mejor Lighthouse score.

---

### FASE 4 — Funcionalidades Avanzadas
> **Meta**: Escalar el negocio con automatizaciones y nuevos canales.

#### 4.13 Sistema de Reservas con Calendario

- Calendario de disponibilidad por tour
- Integración con Google Calendar API
- Confirmación automática por WhatsApp (Twilio / Meta API)

#### 4.14 Blog de Viajes

- Rutas: `/blog`, `/blog/[slug]`
- Contenido: consejos de viaje, preparación para altitud, mejores épocas
- Impacto SEO: captura long-tail keywords

#### 4.15 TripAdvisor / Google Reviews Widget

- Mostrar reviews reales en tiempo real
- Aumenta confianza sin esfuerzo manual

#### 4.16 PWA (Progressive Web App)

```ts
// next.config.ts con next-pwa
```

- Instalable en móvil
- Funciona offline (catálogo de tours)
- Push notifications para ofertas

---

## 5. Checklist por Fase

### Fase 1 — Operativo Mínimo
- [ ] Fotografías reales de los 9 tours
- [ ] Logo en SVG
- [ ] Formulario de contacto funcional (Resend)
- [ ] Deploy en Vercel
- [ ] Dominio conectado (`greengoldencusco.com`)

### Fase 2 — SEO
- [ ] `src/app/sitemap.ts`
- [ ] `src/app/robots.ts`
- [ ] `/public/og-image.jpg` (1200×630px)
- [ ] Schema.org JSON-LD en TourDetail y layout
- [ ] Google Analytics 4
- [ ] Google My Business verificado

### Fase 3 — Conversión
- [ ] 3+ testimonios reales
- [ ] Estadísticas reales en hero
- [ ] Favicon completo
- [ ] `next/font` en vez de CDN

### Fase 4 — Avanzado
- [ ] Sistema de reservas con calendario
- [ ] Blog de viajes (5+ artículos SEO)
- [ ] Reviews widget
- [ ] PWA

---

## 6. Variables de Entorno Necesarias

```env
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://greengoldencusco.com
```

---

## 7. Métricas de Éxito

| Métrica | Actual | Objetivo 3 meses |
|---------|--------|-----------------|
| Consultas WhatsApp/mes | 0 (sin deploy) | 30+ |
| Posición Google "tours cusco" | Sin indexar | Top 20 |
| Lighthouse Performance | — | >90 |
| Lighthouse SEO | — | 100 |
| Bounce rate | — | <60% |

---

*PDR v2.0 — Actualizado: 2026-03-16*
*Stack: Next.js 15 · Tailwind CSS v4 · TypeScript · Vercel*
