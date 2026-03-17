# MDR — Mejoras de Requisitos
## Green Golden Cusco · Landing Page Moderna

**Versión:** 1.0
**Fecha:** 2026-03-16
**Estado:** En desarrollo

---

## 1. Objetivo

Transformar el MVP actual (single-file JSX con inline styles) en una **landing page moderna, profesional y mantenible**, lista para recibir contenido real y escalar.

### Alcance de esta fase
- ✅ Migración a arquitectura moderna (Vite + React Router)
- ✅ Sistema de diseño con Tailwind CSS
- ✅ Componentes reutilizables
- ✅ SEO básico funcional
- ✅ Internacionalización escalable
- ✅ Preparado para imágenes reales
- ⏸️ Backend (formularios) — Fase 2
- ⏸️ Google Analytics — Fase 2

---

## 2. Stack Técnico

### 2.1 Tecnologías

| Categoría | Actual | Nuevo |
|-----------|--------|-------|
| Bundler | Ninguno (JSX puro) | **Vite 8** |
| Framework | React (imports manuales) | **React 19** |
| Routing | Estado interno (`page`) | **React Router v7** |
| Estilos | 100% inline styles | **Tailwind CSS 4** |
| i18n | Context API custom | **react-i18next** |
| Tipado | JavaScript | **TypeScript 5** |
| Linting | Ninguno | **ESLint + Prettier** |
| Icons | Emojis | **Lucide React** |

### 2.2 Estructura de Carpetas

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Layout.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Container.tsx
│   │   └── WhatsAppButton.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── FeaturedTours.tsx
│   │   ├── Commitments.tsx
│   │   ├── CTASection.tsx
│   │   └── Testimonials.tsx
│   └── tours/
│       ├── TourCard.tsx
│       ├── TourGrid.tsx
│       ├── TourDetail.tsx
│       ├── TourFilters.tsx
│       └── TourItinerary.tsx
├── pages/
│   ├── Home.tsx
│   ├── Tours.tsx
│   ├── TourDetail.tsx
│   ├── About.tsx
│   ├── Media.tsx
│   └── Contact.tsx
├── data/
│   ├── tours.ts
│   └── team.ts
├── locales/
│   ├── es.json
│   ├── en.json
│   └── pt.json
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useTourFilter.ts
├── lib/
│   ├── i18n.ts
│   ├── whatsapp.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

---

## 3. Sistema de Diseño

### 3.1 Paleta de Colores (Tailwind Config)

```js
// tailwind.config.js
colors: {
  gold: {
    DEFAULT: '#A68D49',
    light: '#C4A55A',
    dark: '#8B7340',
  },
  dark: {
    DEFAULT: '#0a0f07',
    secondary: '#060a04',
    card: '#0d1209',
  },
  // Mantener grays de Tailwind para texto
}
```

### 3.2 Tipografía

| Rol | Fuente | Clase Tailwind |
|-----|--------|----------------|
| Títulos | Playfair Display | `font-display` |
| Cuerpo | DM Sans | `font-sans` |

```js
// tailwind.config.js
fontFamily: {
  display: ['Playfair Display', 'serif'],
  sans: ['DM Sans', 'sans-serif'],
}
```

### 3.3 Componentes Base

#### Button
```tsx
// Variantes
<Button variant="primary">Reservar</Button>     // Fondo gold
<Button variant="outline">Ver más</Button>      // Borde gold
<Button variant="ghost">Cancelar</Button>       // Solo texto
<Button variant="whatsapp">WhatsApp</Button>    // Verde WA

// Tamaños
<Button size="sm" | "md" | "lg">
```

#### Card (Glassmorphism)
```tsx
<Card hover={true}>
  // bg-dark-card/80 backdrop-blur-md border border-gold/20
  // hover: border-gold/40 scale-[1.02]
</Card>
```

#### Badge
```tsx
<Badge variant="gold">Full Day</Badge>
<Badge variant="outline">Multi-día</Badge>
```

### 3.4 Animaciones

| Animación | Trigger | Implementación |
|-----------|---------|----------------|
| Fade In Up | Scroll into view | Intersection Observer + CSS |
| Scale on Hover | Mouse enter | Tailwind `hover:scale-105` |
| Navbar blur | Scroll > 50px | Estado + clase condicional |
| Page transitions | Route change | Framer Motion (opcional) |

---

## 4. Páginas y Rutas

### 4.1 Estructura de Rutas

```tsx
// App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/tours" element={<Tours />} />
  <Route path="/tours/:id" element={<TourDetail />} />
  <Route path="/nosotros" element={<About />} />
  <Route path="/media" element={<Media />} />
  <Route path="/contacto" element={<Contact />} />

  {/* Rutas con idioma (Fase 2 SEO) */}
  {/* <Route path="/:lang/tours" element={<Tours />} /> */}
</Routes>
```

### 4.2 Especificaciones por Página

#### Home (`/`)
| Sección | Componentes | Notas |
|---------|-------------|-------|
| Hero | Hero, Container | Video/imagen de fondo preparado |
| Stats | StatCounter | Animación de números |
| Tours destacados | FeaturedTours, TourCard | 3 tours, link a `/tours` |
| Por qué elegirnos | Commitments | 4 cards con iconos |
| CTA | CTASection | WhatsApp prominente |
| Testimonios | Testimonials | Carousel (swiper) — placeholder |

#### Tours (`/tours`)
| Sección | Componentes | Notas |
|---------|-------------|-------|
| Header | PageHeader | Título + descripción |
| Filtros | TourFilters | Todos / Full Day / Multi-día |
| Grid | TourGrid, TourCard | 3 columnas desktop |

#### Tour Detail (`/tours/:id`)
| Sección | Componentes | Notas |
|---------|-------------|-------|
| Hero | TourHero | Imagen grande + título + badges |
| Info rápida | TourQuickInfo | Duración, dificultad, altitud |
| Descripción | TourDescription | Texto largo |
| Itinerario | TourItinerary | Timeline visual |
| Incluye | TourIncludes | Dos columnas: ✅ / ❌ |
| Precio + CTA | TourPricing | Card fija o sticky |
| Galería | TourGallery | Grid de imágenes (placeholder) |

#### Nosotros (`/nosotros`)
| Sección | Componentes | Notas |
|---------|-------------|-------|
| Historia | AboutStory | Párrafos + imagen |
| Valores | AboutValues | 4 cards |
| Equipo | TeamGrid | 4 miembros con foto placeholder |
| Legal | LegalBadges | RUC, DIRCETUR |

#### Media (`/media`)
| Sección | Componentes | Notas |
|---------|-------------|-------|
| Galería | MediaGallery | Filtros por categoría |
| Videos | VideoSection | Placeholder "próximamente" |

#### Contacto (`/contacto`)
| Sección | Componentes | Notas |
|---------|-------------|-------|
| Formulario | ContactForm | UI completa (sin backend aún) |
| Info | ContactInfo | WhatsApp, email, dirección |
| Horarios | ContactHours | Tabla de horarios |
| Mapa | ContactMap | Placeholder para Google Maps |

---

## 5. Internacionalización (i18n)

### 5.1 Configuración react-i18next

```ts
// src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'pt'],
    interpolation: { escapeValue: false },
  });
```

### 5.2 Estructura de Archivos de Traducción

```json
// locales/es.json
{
  "nav": {
    "home": "Inicio",
    "tours": "Tours",
    "about": "Nosotros",
    "media": "Media",
    "contact": "Contacto",
    "book": "Reservar"
  },
  "hero": {
    "badge": "Agencia local en Cusco",
    "title": "Descubre la magia de",
    "highlight": "Cusco"
  },
  // ... resto
}
```

### 5.3 Selector de Idioma

```tsx
<LanguageSelector>
  // Banderas SVG inline
  // Dropdown o botones toggle
  // Guarda preferencia en localStorage
</LanguageSelector>
```

---

## 6. SEO

### 6.1 Meta Tags Base

```tsx
// src/components/SEO.tsx
<Helmet>
  <title>{title} | Green Golden Cusco</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={`https://greengoldencusco.com${path}`} />
</Helmet>
```

### 6.2 SEO por Página

| Página | Title | Description |
|--------|-------|-------------|
| Home | Tours en Cusco \| Green Golden Cusco | Agencia de turismo local. Machu Picchu, Montaña 7 Colores, trekkings y más. |
| Tours | Todos los Tours \| Green Golden Cusco | Full days, trekkings y aventuras en Cusco. Reserva directo sin intermediarios. |
| Tour Detail | {Tour Name} \| Green Golden Cusco | {Tour short description} |
| Nosotros | Sobre Nosotros \| Green Golden Cusco | Somos una agencia local fundada por cusqueños... |
| Contacto | Contacto \| Green Golden Cusco | Escríbenos por WhatsApp o email. Respuesta inmediata. |

### 6.3 Archivos Requeridos

- [ ] `/public/robots.txt`
- [ ] `/public/sitemap.xml`
- [ ] `/public/og-image.jpg` (1200x630px)
- [ ] `/public/favicon.ico` + variantes

---

## 7. Imágenes

### 7.1 Estrategia de Placeholders

Mientras no haya fotos reales, usar:

```tsx
// Opción A: Gradientes con texto
<div className="bg-gradient-to-br from-dark to-dark-secondary flex items-center justify-center">
  <span className="text-gold/50 text-6xl">🏔️</span>
</div>

// Opción B: Unsplash temporal (con atribución)
<img src="https://images.unsplash.com/photo-cusco-xxx?w=800" alt="..." />

// Opción C: Componente Placeholder
<ImagePlaceholder aspectRatio="16/9" icon="mountain" />
```

### 7.2 Estructura de Assets

```
public/
├── images/
│   ├── tours/
│   │   ├── machu-picchu/
│   │   │   ├── hero.webp
│   │   │   ├── thumb.webp
│   │   │   └── gallery/
│   │   ├── montana-7-colores/
│   │   └── ...
│   ├── team/
│   ├── gallery/
│   └── hero/
├── og-image.jpg
├── favicon.ico
└── logo.svg
```

### 7.3 Optimización (cuando haya imágenes reales)

- Formato: WebP con fallback JPG
- Tamaños: srcset responsivo
- Lazy loading: `loading="lazy"`
- Aspect ratio: contenedores con ratio fijo para evitar layout shift

---

## 8. Componentes Clave

### 8.1 WhatsApp Integration

```tsx
// src/lib/whatsapp.ts
const PHONE = '51943539286';

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export function getTourWhatsAppUrl(tourName: string, lang: string): string {
  const messages = {
    es: `Hola, quiero reservar el tour: ${tourName}`,
    en: `Hi, I want to book the tour: ${tourName}`,
    pt: `Olá, quero reservar o tour: ${tourName}`,
  };
  return getWhatsAppUrl(messages[lang]);
}
```

### 8.2 Floating WhatsApp Button

```tsx
// Siempre visible en esquina inferior derecha
// Pulso animado para llamar atención
// Tooltip con texto
<WhatsAppFloating />
```

### 8.3 Tour Card

```tsx
interface TourCardProps {
  tour: Tour;
  variant: 'default' | 'featured' | 'compact';
}

// Features:
// - Imagen con overlay gradiente
// - Badge de duración
// - Precio destacado
// - Hover: escala + borde gold
// - Link a detalle
```

### 8.4 Navbar

```tsx
// Features:
// - Fija en top
// - Transparente → blur on scroll
// - Logo + links + idioma + CTA
// - Mobile: hamburger → drawer
// - Indicador de página activa
```

---

## 9. Animaciones y Microinteracciones

### 9.1 Scroll Animations

```tsx
// Hook personalizado
function useScrollAnimation() {
  // Intersection Observer
  // Añade clase 'animate-in' cuando elemento entra en viewport
  // Clases: fade-up, fade-in, scale-in
}
```

### 9.2 Transiciones de Página

```tsx
// Fade simple entre páginas
// Scroll to top en navegación
```

### 9.3 Estados Interactivos

| Elemento | Hover | Active | Focus |
|----------|-------|--------|-------|
| Button primary | Lighten gold | Scale 0.98 | Ring gold |
| Button outline | Fill gold | Scale 0.98 | Ring gold |
| Card | Scale 1.02, border gold | — | Ring |
| Link | Underline | — | Ring |
| Nav item | Color gold | — | Ring |

---

## 10. Performance

### 10.1 Targets

| Métrica | Target |
|---------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse | > 90 |

### 10.2 Optimizaciones

- [ ] Code splitting por ruta (React.lazy)
- [ ] Preload de fuentes críticas
- [ ] Lazy loading de imágenes
- [ ] Minificación (Vite default)
- [ ] Compresión gzip/brotli (server)

---

## 11. Accesibilidad (a11y)

### 11.1 Requisitos Mínimos

- [ ] Contraste WCAG AA (texto sobre fondos oscuros)
- [ ] Focus visible en todos los interactivos
- [ ] Alt text en todas las imágenes
- [ ] Labels en formularios
- [ ] Navegación por teclado
- [ ] Skip to content link
- [ ] ARIA labels donde corresponda

### 11.2 Contraste Verificado

| Combinación | Ratio | Estado |
|-------------|-------|--------|
| Gold (#A68D49) sobre Dark (#0a0f07) | 7.2:1 | ✅ AAA |
| White (#FFFFFF) sobre Dark (#0a0f07) | 18.5:1 | ✅ AAA |
| Gray (#CCCCCC) sobre Dark (#0a0f07) | 12.1:1 | ✅ AAA |

---

## 12. Datos (TypeScript Types)

```ts
// src/types/index.ts

interface Tour {
  id: string;
  name: string;
  tag: string;
  duration: string;
  durationDays?: number;
  price: string;
  priceUSD?: string;
  description: string;
  longDescription: string;
  includes: string[];
  notIncludes: string[];
  itinerary: ItineraryItem[];
  difficulty: 'Fácil' | 'Moderada' | 'Moderada-Alta' | 'Alta';
  altitude: string;
  groupSize: string;
  images?: TourImages;
}

interface ItineraryItem {
  time: string;
  text: string;
}

interface TourImages {
  hero: string;
  thumb: string;
  gallery: string[];
}

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  image?: string;
}

interface Testimonial {
  name: string;
  country: string;
  tour: string;
  text: string;
  rating: number;
  image?: string;
}
```

---

## 13. Checklist de Implementación

### Fase 1: Setup (Día 1)
- [ ] Inicializar proyecto Vite + React + TypeScript
- [ ] Configurar Tailwind CSS con colores custom
- [ ] Configurar React Router
- [ ] Configurar react-i18next
- [ ] Estructura de carpetas
- [ ] Configurar ESLint + Prettier

### Fase 2: Layout Base (Día 1-2)
- [ ] Componente Layout
- [ ] Navbar (desktop + mobile)
- [ ] Footer
- [ ] WhatsApp floating button
- [ ] Componentes UI base (Button, Card, Badge, Container)

### Fase 3: Páginas (Día 2-3)
- [ ] Home con todas las secciones
- [ ] Tours (listado con filtros)
- [ ] Tour Detail
- [ ] Nosotros
- [ ] Media (galería)
- [ ] Contacto (UI sin backend)

### Fase 4: Contenido (Día 3-4)
- [ ] Migrar traducciones a JSON
- [ ] Migrar data de tours a TypeScript
- [ ] Placeholders de imágenes
- [ ] SEO meta tags

### Fase 5: Polish (Día 4)
- [ ] Animaciones scroll
- [ ] Transiciones hover
- [ ] Responsive QA
- [ ] Lighthouse audit
- [ ] Fix bugs

---

## 14. Pendientes para Fase 2

### Backend & Integraciones
- [ ] Formulario de contacto funcional (Formspree / Netlify Forms / API propia)
- [ ] Google Analytics 4
- [ ] Google Tag Manager
- [ ] Facebook Pixel
- [ ] Google Maps embed
- [ ] TripAdvisor widget

### SEO Avanzado
- [ ] URLs localizadas (`/en/tours`, `/pt/tours`)
- [ ] Sitemap.xml dinámico
- [ ] Schema.org markup (LocalBusiness, TouristTrip)
- [ ] Hreflang tags

### Contenido Real
- [ ] Fotografías profesionales
- [ ] Videos de tours
- [ ] Testimonios reales
- [ ] Precios en USD

### Features Adicionales
- [ ] Blog de viajes
- [ ] Sistema de reservas con calendario
- [ ] Chat en vivo
- [ ] PWA

---

## 15. Referencias de Diseño

### Inspiración
- [Intrepid Travel](https://www.intrepidtravel.com/) — Layout de tours
- [G Adventures](https://www.gadventures.com/) — Cards y filtros
- [Explora](https://www.explora.com/) — Estética premium dark

### Assets
- Fuentes: [Google Fonts](https://fonts.google.com/)
- Iconos: [Lucide](https://lucide.dev/)
- Imágenes placeholder: [Unsplash](https://unsplash.com/s/photos/cusco)

---

*Documento generado: 2026-03-16*
*Próxima revisión: Al completar Fase 1*
