# PDR — Green Golden Cusco
## Product Design Requirements

**Agencia de viajes turísticos · Cusco, Perú**
Versión: 1.0 | Fecha: 2026-03-16

---

## 1. Visión del Producto

Green Golden Cusco es una agencia de viajes boutique ubicada en San Sebastián, Cusco. Su propuesta de valor es ofrecer experiencias auténticas, responsables y de alta calidad en los destinos más icónicos de la región.

El sitio web es el canal principal de captación de clientes. Debe transmitir **confianza, profesionalismo y emoción por el destino**, en tres idiomas (Español, Inglés, Portugués), y convertir visitas en reservas directas vía WhatsApp.

---

## 2. Objetivos de Negocio

| Prioridad | Objetivo |
|-----------|----------|
| P0 | Generar reservas directas vía WhatsApp (sin intermediarios) |
| P0 | Mostrar el catálogo completo de tours con precios claros |
| P1 | Generar confianza mediante credenciales legales (RUC, DIRCETUR) |
| P1 | Alcanzar turistas de habla inglesa y portuguesa (mercado internacional) |
| P2 | Posicionarse en Google con contenido SEO optimizado |
| P2 | Construir presencia en redes sociales (Instagram, TikTok, Facebook) |

---

## 3. Usuarios Objetivo

### 3.1 Turista Internacional (primario)
- Edad: 25-45 años
- Idiomas: inglés, portugués
- Canal: búsqueda orgánica en Google, Instagram, recomendación
- Motivación: experiencias auténticas, aventura, naturaleza
- Pain point: desconfianza ante agencias desconocidas, barreras de idioma
- Dispositivo: 70% móvil

### 3.2 Turista Latinoamericano (primario)
- Edad: 25-50 años
- Idioma: español
- Canal: búsqueda en Google, WhatsApp directo, boca a boca
- Motivación: precios competitivos, atención personalizada
- Dispositivo: 80% móvil

### 3.3 Grupos y Corporativos (secundario)
- Grupos familiares, empresas, colegios
- Necesitan cotizaciones personalizadas
- Canal: formulario de contacto o WhatsApp

---

## 4. Arquitectura de Páginas

```
/                  → Home (Hero + Tours destacados + Garantías)
/tours             → Catálogo completo de tours (con filtros)
/tours/:id         → Detalle de tour (itinerario, precios, reserva)
/nosotros          → Quiénes somos (historia, valores, equipo, legalidad)
/media             → Galería de fotos y videos
/contacto          → Formulario + info de contacto + WhatsApp
```

---

## 5. Catálogo de Tours

### Tours actuales (9 paquetes)

| # | Tour | Tipo | Precio | Duración |
|---|------|------|--------|----------|
| 1 | Machu Picchu Full Day | Full Day | S/. 350 | 1 día |
| 2 | Montaña de Colores | Full Day | S/. 80 | 1 día |
| 3 | Laguna Humantay | Full Day | S/. 70 | 1 día |
| 4 | City Tour Cusco | Medio día | S/. 50 | 4 horas |
| 5 | 7 Lagunas Ausangate | Full Day | S/. 90 | 1 día |
| 6 | Camino Inca Clásico | Multi-día | S/. 1,800 | 4D/3N |
| 7 | Trek Salkantay | Multi-día | S/. 1,200 | 5D/4N |
| 8 | Trek Lares | Multi-día | S/. 950 | 4D/3N |
| 9 | Palccoyo | Full Day | S/. 70 | 1 día |

### Estructura de cada tour
- Nombre + tag + duración + precio
- Descripción corta (para card) y descripción larga (para detalle)
- Itinerario con horarios
- Incluye / No incluye
- Dificultad, altitud máxima, tamaño máximo de grupo
- CTA directa a WhatsApp con mensaje pre-llenado

### Tours pendientes de agregar (roadmap)
- Valle Sagrado (Full Day)
- Moray & Salineras (Full Day)
- Chinchero + Comunidad textil (Half Day)
- Choquequirao (multi-día)

---

## 6. Diseño Visual

### 6.1 Identidad de Marca

| Elemento | Valor |
|----------|-------|
| Nombre | Green Golden Cusco |
| Logotipo | "GG" (monograma) + nombre completo |
| Concepto | Naturaleza (verde) + Lujo accesible (dorado) + Historia andina |

### 6.2 Paleta de Colores

| Rol | Color | Hex |
|-----|-------|-----|
| Primario (dorado) | Gold | `#A68D49` |
| Fondo oscuro principal | Negro profundo | `#0a0f07` |
| Fondo oscuro secundario | Negro verdoso | `#060a04` |
| Texto principal | Blanco | `#FFFFFF` |
| Texto secundario | Gris claro | `#CCCCCC` |
| Acento hover | Gold claro | `#C4A55A` |

### 6.3 Tipografía

| Rol | Fuente | Estilo |
|-----|--------|--------|
| Títulos | Playfair Display | Serif, elegante |
| Cuerpo / UI | DM Sans | Sans-serif, moderno |

### 6.4 Componentes de Diseño

- **Cards de tour**: glassmorphism (fondo semitransparente + borde dorado sutil + blur)
- **Botón primario**: fondo dorado `#A68D49`, texto oscuro, border-radius 8px
- **Botón outline**: borde dorado, fondo transparente, texto dorado
- **Animaciones**: fade-in con Intersection Observer al hacer scroll
- **Iconografía**: emojis nativos (sin dependencia de icon libraries)
- **Efectos hover**: scale, color shift, shadow en dorado

### 6.5 Responsividad

| Breakpoint | Layout |
|------------|--------|
| < 768px | 1 columna, hamburger menu, texto reducido |
| 768–1024px | 2 columnas |
| > 1024px | 3–4 columnas, layout completo |

---

## 7. Internacionalización (i18n)

- **Idiomas soportados**: Español (default), Inglés, Portugués
- **Implementación**: Context API (`LangCtx`) + objeto de traducciones en memoria
- **Selector**: Banderas con SVG inline + botones de idioma en navbar
- **Cobertura**: 100% del contenido (nav, hero, tours, nosotros, contacto, footer)

### Prioridades de traducción
1. Textos UI y navegación ✓
2. Descripciones de tours ✓
3. SEO (meta tags por idioma) — pendiente
4. URLs localizadas (`/en/tours`, `/pt/tours`) — roadmap

---

## 8. Funcionalidades Requeridas

### 8.1 Core (P0 — debe estar)

| Feature | Descripción |
|---------|-------------|
| Catálogo de tours | Listado con filtros: Todos / Full Day / Multi-día |
| Detalle de tour | Itinerario completo, precios, incluye/no incluye |
| WhatsApp directo | Botón flotante + CTAs por tour con mensaje pre-llenado |
| Multiidioma | ES / EN / PT con selector en navbar |
| Navbar fija | Con logo, links, idioma y CTA WhatsApp |
| Footer completo | Links, tours populares, contacto, legal |
| Formulario de contacto | Nombre, email, asunto, mensaje + confirmación |

### 8.2 Importante (P1 — debe estar pronto)

| Feature | Descripción |
|---------|-------------|
| Galería de fotos real | Reemplazar emojis por imágenes reales de los tours |
| Sección de testimonios | Reviews de viajeros con foto, nombre, país |
| SEO básico | Title, description, og:image por página |
| Google Analytics | Seguimiento de conversiones hacia WhatsApp |
| Mapa de ubicación | Embed Google Maps en contacto |
| Badge de DIRCETUR | Visible y con link verificable |

### 8.3 Deseable (P2 — roadmap)

| Feature | Descripción |
|---------|-------------|
| Blog de viajes | Artículos SEO sobre Cusco y sus destinos |
| Sistema de reservas | Calendario de disponibilidad + pago online |
| Chat en vivo | Integración con WhatsApp Business API |
| Reviews de TripAdvisor | Widget de calificación |
| Videos propios | Galería de videos de tours reales |
| PWA | Instalable como app en móvil |

---

## 9. Integraciones Externas

| Integración | Propósito | Estado |
|-------------|-----------|--------|
| WhatsApp API (`wa.me`) | Reservas directas | Implementado |
| Google Fonts | Playfair Display + DM Sans | Implementado |
| Facebook | Link redes sociales | Link básico |
| Instagram | Link redes sociales | Link básico |
| TikTok | Link redes sociales | Link básico |
| Google Analytics | Tracking conversiones | Pendiente |
| Google Maps | Ubicación oficina | Pendiente |
| TripAdvisor | Reviews | Pendiente |

---

## 10. Stack Técnico

### Actual (estado del JSX)
- **Framework**: React (sin bundler visible — single file component)
- **Estilos**: 100% inline styles + inyección dinámica de CSS
- **Estado**: React hooks (`useState`, `useEffect`, `useCallback`)
- **Routing**: estado interno con switch (`page`, `tourId`)
- **i18n**: Context API custom
- **Animaciones**: Intersection Observer API nativo
- **Dependencias externas**: ninguna (standalone)

### Recomendado para producción
- **Bundler**: Vite + React
- **Routing**: React Router v6
- **Estilos**: Tailwind CSS o CSS Modules (reemplazar inline styles)
- **i18n**: `react-i18next` (más escalable que el custom actual)
- **SEO**: React Helmet Async + sitemap.xml
- **Hosting**: Vercel o Netlify (con CI/CD desde GitHub)
- **Dominio**: `greengoldencusco.com` (ya referenciado en el email)
- **Images**: Cloudinary o assets locales optimizados con Vite

---

## 11. Contenido Requerido (pendiente de producción)

El proyecto actualmente usa emojis como placeholder visual. Para lanzar a producción se necesita:

### Fotografías
- [ ] Hero banner (2–3 fotos de alta calidad: Machu Picchu, Montaña Colores, paisaje andino)
- [ ] Foto por cada tour (mínimo 1, ideal 3–5 por tour)
- [ ] Galería general (20+ fotos de experiencias)
- [ ] Fotos del equipo (Carlos, María, Diego, Luz)
- [ ] Foto de la oficina / vehículos

### Textos
- [ ] Historia real de la empresa (año de fundación, por qué se creó)
- [ ] Bios reales del equipo
- [ ] Testimonios reales de viajeros (mínimo 6)
- [ ] Políticas: cancelación, pagos, seguro de viaje

### Legal / Credenciales
- [ ] RUC activo verificado en SUNAT
- [ ] Número de autorización DIRCETUR Cusco
- [ ] Libro de Reclamaciones (físico o virtual)
- [ ] Términos y condiciones
- [ ] Política de privacidad

---

## 12. Información de Contacto

| Canal | Valor |
|-------|-------|
| WhatsApp | +51 943 539 286 |
| Email info | info@greengoldencusco.com |
| Email reservas | reservas@greengoldencusco.com |
| Dirección | Urb. San Antonio H5-4, San Sebastián, Cusco, Perú |
| Horario | Lun-Sáb 7:00am–9:00pm / Dom 8:00am–6:00pm |

---

## 13. KPIs de Éxito

| KPI | Meta inicial |
|-----|-------------|
| Clicks a WhatsApp | > 50/mes |
| Tiempo en página | > 2 minutos |
| Bounce rate | < 60% |
| Páginas por sesión | > 2.5 |
| Conversión visita → consulta | > 3% |
| Reservas confirmadas/mes | > 10 |

---

## 14. Fases de Desarrollo

### Fase 1 — MVP (estado actual)
- [x] SPA funcional en un archivo JSX
- [x] 9 tours con detalle completo
- [x] 3 idiomas
- [x] WhatsApp integration
- [x] Diseño dark + gold

### Fase 2 — Producción Ready
- [ ] Migrar a proyecto Vite + React Router
- [ ] Reemplazar emojis con imágenes reales
- [ ] SEO básico (meta tags, OG)
- [ ] Google Analytics
- [ ] Formulario de contacto funcional (backend o servicio externo)
- [ ] Deploy en dominio propio

### Fase 3 — Crecimiento
- [ ] Blog de viajes (SEO orgánico)
- [ ] Sistema de reservas con calendario
- [ ] Testimonios dinámicos
- [ ] Videos de tours reales

---

## 15. Riesgos y Consideraciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Sin imágenes reales | Alto — baja credibilidad | Priorizar sesión fotográfica |
| Single file no escala | Medio | Migrar a Vite en Fase 2 |
| Sin SEO | Alto — tráfico orgánico nulo | Meta tags básicos en Fase 2 |
| Dependencia total de WhatsApp | Medio | Agregar formulario funcional |
| Sin sistema de reservas | Medio | Aceptable en Fase 1 |

---

*Documento generado en base al código fuente `greengoldencusco-3idiomas.jsx`*
