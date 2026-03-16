import { useState, useEffect, useRef, createContext, useContext } from "react";

/* ─── i18n SYSTEM ─── */
const translations = {
  es: {
    nav: { inicio: "Inicio", tours: "Tours", nosotros: "Nosotros", media: "Media", contacto: "Contacto", reservar: "Reservar" },
    hero: {
      badge: "Agencia local en Cusco",
      title1: "Descubre la magia de",
      titleHighlight: "Cusco",
      subtitle: "Tours auténticos con guías locales. Machu Picchu, Montaña 7 Colores, Valle Sagrado y más — atención personalizada en cada aventura.",
      cta1: "Ver Tours", cta2: "WhatsApp",
      stat1: "Viajeros felices", stat2: "Tours disponibles", stat3: "En TripAdvisor", scroll: "Scroll"
    },
    featured: { label: "Más populares", title: "Tours Destacados", seeAll: "Ver todos los tours →", details: "Ver detalles →", from: "Desde" },
    commitments: {
      label: "Nuestras garantías", title: "¿Por qué elegirnos?",
      items: [
        { icon: "🛡️", title: "Seguridad Certificada", desc: "Equipos certificados y protocolos estrictos en cada aventura." },
        { icon: "🗣️", title: "Guías Bilingües", desc: "Profesionales que hablan español e inglés y conocen cada rincón." },
        { icon: "💰", title: "Precio Directo", desc: "Sin intermediarios. Reserva directa al mejor precio garantizado." },
        { icon: "📱", title: "Atención 24/7", desc: "Te asesoramos por WhatsApp o llamada cuando lo necesites." }
      ]
    },
    cta: { label: "¿Listo?", title: "Arma tu aventura hoy", desc: "Escríbenos por WhatsApp y diseñamos tu itinerario ideal. Respuesta inmediata, sin compromiso.", btn: "Escríbenos por WhatsApp" },
    toursPage: { label: "Experiencias", title: "Todos Nuestros Tours", desc: "Desde caminatas de medio día hasta trekkings de 5 días. Encuentra tu aventura ideal.", all: "Todos", fullDay: "Full Day", multiDay: "Multi-día" },
    tourDetail: {
      back: "← Volver a Tours", itinerary: "📋 Itinerario", includes: "✅ Incluye", notIncludes: "❌ No incluye",
      priceLabel: "Precio por persona", priceNote: "Precio por persona. Grupos grandes consultar descuento.", reserveBtn: "Reservar por WhatsApp",
      whatsappMsg: "Hola, quiero reservar"
    },
    about: {
      label: "Nuestra historia", title: "Sobre Green Golden Cusco",
      paragraphs: [
        "Somos una agencia de turismo local fundada en Cusco por cusqueños. Nacimos con la convicción de que la mejor forma de conocer nuestra tierra es con quienes la viven a diario.",
        "No somos intermediarios. Diseñamos cada tour personalmente, seleccionamos a nuestros guías por su pasión y conocimiento, y nos aseguramos de que cada viajero sienta la autenticidad de los Andes.",
        "Desde trekking de alta montaña hasta recorridos culturales por la ciudad, nuestra misión es conectar a los viajeros con la esencia de Cusco de forma segura, responsable y memorable."
      ],
      valuesTitle: "Nuestros Valores",
      values: [
        { icon: "🌱", title: "Turismo Responsable", desc: "Respetamos el medio ambiente y las comunidades locales." },
        { icon: "🤝", title: "Autenticidad", desc: "Experiencias reales, no guiones turísticos genéricos." },
        { icon: "⭐", title: "Excelencia", desc: "Cada detalle importa. Desde el transporte hasta la guía." },
        { icon: "❤️", title: "Pasión", desc: "Amamos nuestra tierra y eso se nota en cada tour." }
      ],
      teamTitle: "Nuestro Equipo",
      team: [
        { name: "Carlos Quispe", role: "Fundador & Guía Principal", exp: "12 años de experiencia", emoji: "👨‍💼" },
        { name: "María Huamán", role: "Coordinadora de Tours", exp: "8 años en turismo", emoji: "👩‍💼" },
        { name: "Diego Condori", role: "Guía de Trekking", exp: "Certificado en alta montaña", emoji: "🧗" },
        { name: "Luz Mamani", role: "Atención al Cliente", exp: "Bilingüe español-inglés", emoji: "💬" }
      ],
      legalTitle: "📄 Legalidades",
      legalDesc: "Green Golden Cusco es una empresa formalmente constituida, registrada en SUNAT y autorizada por DIRCETUR Cusco para operar servicios turísticos.",
      legalBadges: ["RUC Activo", "DIRCETUR Autorizado", "Libro de Reclamaciones"]
    },
    mediaPage: {
      label: "Galería", title: "Media", desc: "Imágenes y momentos de nuestros tours por Cusco y alrededores.", all: "Todas",
      videoTitle: "Multimedia", videoDesc: "Próximamente videos de nuestros tours. Síguenos en redes para ver contenido actualizado."
    },
    contact: {
      label: "Hablemos", title: "Contacto", desc: "¿Tienes preguntas? Escríbenos y te respondemos al instante.",
      formTitle: "Envíanos un mensaje", name: "Nombre", email: "Correo", subject: "Asunto", message: "Tu mensaje...", send: "Enviar Mensaje",
      sent: "¡Mensaje enviado! Te responderemos pronto.",
      whatsappTitle: "💬 WhatsApp (Respuesta rápida)", emailTitle: "📧 Correo", addressTitle: "📍 Dirección",
      hoursTitle: "🕐 Horario", hours1: "Lunes a Sábado: 7:00 AM – 9:00 PM", hours2: "Domingo: 8:00 AM – 6:00 PM",
      socialTitle: "🌐 Redes Sociales"
    },
    footer: {
      desc: "Agencia de turismo local en Cusco. Tours auténticos con atención personalizada.",
      menu: "Menú", popularTours: "Tours Populares", contactLabel: "Contacto",
      terms: "Términos y Condiciones", complaints: "Libro de Reclamaciones", rights: "Todos los derechos reservados."
    },
    tours: [
      { id: "machu-picchu", name: "Machu Picchu", tag: "Maravilla del Mundo", duration: "Full Day", price: "S/. 350",
        desc: "Descubre la ciudadela inca más emblemática del planeta, rodeada de montañas y misterio ancestral.",
        longDesc: "Machu Picchu es una de las 7 maravillas del mundo moderno y el destino más visitado de Sudamérica. Nuestro tour te lleva desde Cusco en un viaje que combina historia, naturaleza y una energía única.",
        includes: ["Transporte Cusco – Ollantaytambo – Aguas Calientes", "Tren turístico ida y vuelta", "Bus subida/bajada a Machu Picchu", "Entrada a Machu Picchu", "Guía profesional bilingüe", "Asistencia permanente"],
        notIncludes: ["Alimentación", "Propinas", "Gastos personales"],
        itinerary: [{ time: "4:00 AM", text: "Recojo del hotel" }, { time: "6:30 AM", text: "Tren desde Ollantaytambo" }, { time: "8:30 AM", text: "Bus a Machu Picchu" }, { time: "9:00 AM", text: "Tour guiado (2.5 hrs)" }, { time: "12:00 PM", text: "Tiempo libre" }, { time: "2:00 PM", text: "Almuerzo en Aguas Calientes" }, { time: "4:30 PM", text: "Tren de retorno" }, { time: "8:00 PM", text: "Llegada a Cusco" }],
        difficulty: "Fácil", altitude: "2,430 m", groupSize: "Máx. 16" },
      { id: "montana-7-colores", name: "Montaña 7 Colores", tag: "Ícono Natural", duration: "Full Day", price: "S/. 80",
        desc: "Camina entre paisajes surrealistas hasta uno de los escenarios más impresionantes del Perú.",
        longDesc: "Vinicunca, la famosa Montaña de 7 Colores, muestra capas minerales en tonos rojizos, turquesas, dorados y lavanda. Una caminata exigente pero absolutamente gratificante.",
        includes: ["Transporte Cusco – Vinicunca – Cusco", "Desayuno buffet en ruta", "Guía bilingüe", "Kit primeros auxilios y oxígeno", "Bastones de trekking"],
        notIncludes: ["Almuerzo (S/. 15)", "Caballo de apoyo (S/. 80)", "Propinas"],
        itinerary: [{ time: "3:30 AM", text: "Recojo del hotel" }, { time: "6:00 AM", text: "Desayuno en Cusipata" }, { time: "7:30 AM", text: "Inicio caminata (5 km)" }, { time: "10:00 AM", text: "Llegada a la cumbre" }, { time: "11:00 AM", text: "Descenso" }, { time: "1:00 PM", text: "Almuerzo opcional" }, { time: "5:00 PM", text: "Llegada a Cusco" }],
        difficulty: "Moderada-Alta", altitude: "5,200 m", groupSize: "Máx. 15" },
      { id: "laguna-humantay", name: "Laguna Humantay", tag: "Naturaleza Pura", duration: "Full Day", price: "S/. 70",
        desc: "Una laguna turquesa al pie de glaciares milenarios. Un espectáculo visual inolvidable.",
        longDesc: "La Laguna Humantay es una joya escondida en los Andes cusqueños. Sus aguas turquesa intenso, alimentadas por el deshielo del nevado Humantay, crean un paisaje irreal.",
        includes: ["Transporte ida y vuelta", "Desayuno en ruta", "Guía bilingüe", "Kit primeros auxilios", "Bastones de trekking"],
        notIncludes: ["Almuerzo", "Caballo de apoyo (S/. 70)", "Entrada laguna (S/. 10)", "Propinas"],
        itinerary: [{ time: "4:00 AM", text: "Recojo del hotel" }, { time: "6:30 AM", text: "Desayuno en Mollepata" }, { time: "7:30 AM", text: "Inicio caminata" }, { time: "9:30 AM", text: "Arribo a la laguna" }, { time: "11:00 AM", text: "Descenso" }, { time: "12:30 PM", text: "Almuerzo opcional" }, { time: "5:00 PM", text: "Retorno a Cusco" }],
        difficulty: "Moderada", altitude: "4,200 m", groupSize: "Máx. 16" },
      { id: "city-tour", name: "City Tour Cusco", tag: "Centro Histórico", duration: "Medio Día", price: "S/. 50",
        desc: "Recorre la esencia de la ciudad imperial: Sacsayhuamán, Qenqo, la Catedral y el Qoricancha.",
        longDesc: "Un recorrido por los puntos más emblemáticos de la antigua capital del Imperio Inca. La fusión perfecta entre arquitectura inca y colonial.",
        includes: ["Transporte turístico", "Guía bilingüe", "Recorrido por 6 sitios históricos"],
        notIncludes: ["Boleto turístico (S/. 70)", "Entrada Catedral (S/. 25)", "Entrada Qoricancha (S/. 15)", "Alimentación"],
        itinerary: [{ time: "1:00 PM", text: "Recojo del hotel" }, { time: "1:20 PM", text: "Qoricancha" }, { time: "2:30 PM", text: "Catedral del Cusco" }, { time: "3:30 PM", text: "Sacsayhuamán" }, { time: "4:30 PM", text: "Qenqo" }, { time: "5:00 PM", text: "Puca Pucara y Tambomachay" }, { time: "6:00 PM", text: "Retorno al hotel" }],
        difficulty: "Fácil", altitude: "3,400 m", groupSize: "Máx. 16" },
      { id: "7-lagunas", name: "7 Lagunas Ausangate", tag: "Aventura Andina", duration: "Full Day", price: "S/. 90",
        desc: "Siete lagunas de colores intensos rodeadas de montañas nevadas. Para amantes del trekking.",
        longDesc: "El circuito de las 7 Lagunas te lleva a través de paisajes altoandinos espectaculares, con lagunas del turquesa al esmeralda, rodeadas por glaciares del Ausangate.",
        includes: ["Transporte ida y vuelta", "Desayuno buffet", "Guía bilingüe", "Kit primeros auxilios", "Bastones"],
        notIncludes: ["Almuerzo", "Caballo de apoyo (S/. 80)", "Propinas"],
        itinerary: [{ time: "3:00 AM", text: "Recojo del hotel" }, { time: "5:30 AM", text: "Desayuno en Checacupe" }, { time: "7:00 AM", text: "Inicio trekking" }, { time: "8:30 AM", text: "Primera laguna" }, { time: "10:00 AM", text: "Recorrido 7 lagunas" }, { time: "12:30 PM", text: "Punto más alto" }, { time: "1:30 PM", text: "Descenso y almuerzo" }, { time: "6:00 PM", text: "Retorno a Cusco" }],
        difficulty: "Alta", altitude: "4,800 m", groupSize: "Máx. 15" },
      { id: "camino-inca", name: "Camino Inca Clásico", tag: "Trekking Legendario", duration: "4D / 3N", price: "S/. 1,800",
        desc: "La ruta ancestral de 43 km hasta Machu Picchu. Campamentos, ruinas y paisajes que cambian tu vida.",
        longDesc: "El Camino Inca Clásico de 4 días es uno de los mejores trekkings del mundo. 43 km de senderos incas originales, 3 pasos de montaña y amanecer en la Puerta del Sol.",
        includes: ["Permisos Camino Inca y Machu Picchu", "Guía bilingüe", "Cocinero y porteadores", "Todas las comidas", "Equipo de campamento", "Bus bajada y tren retorno"],
        notIncludes: ["Saco de dormir (S/. 50)", "Bastones (S/. 30)", "Propinas", "Último almuerzo"],
        itinerary: [{ time: "Día 1", text: "Km 82 → Wayllabamba (12 km)" }, { time: "Día 2", text: "Wayllabamba → Pacaymayo (11 km) – Paso Dead Woman" }, { time: "Día 3", text: "Pacaymayo → Wiñay Wayna (16 km)" }, { time: "Día 4", text: "Wiñay Wayna → Machu Picchu (4 km)" }],
        difficulty: "Alta", altitude: "4,215 m (máx)", groupSize: "Máx. 8" },
      { id: "salkantay", name: "Salkantay Trekking", tag: "Ruta Alternativa", duration: "5D / 4N", price: "S/. 1,200",
        desc: "La alternativa épica al Camino Inca. Glaciares, selva alta y Machu Picchu en 5 días.",
        longDesc: "El Salkantay Trek es la ruta alternativa más popular. Atraviesa paisajes desde glaciares a 4,600m hasta selva tropical, pasando por comunidades andinas.",
        includes: ["Transporte y traslados", "Guía bilingüe", "Cocinero y arrieros", "Todas las comidas", "Campamento completo", "Entrada Machu Picchu", "Tren retorno"],
        notIncludes: ["Saco de dormir (S/. 50)", "Bastones (S/. 30)", "Aguas termales (S/. 10)", "Propinas"],
        itinerary: [{ time: "Día 1", text: "Cusco → Soraypampa" }, { time: "Día 2", text: "Paso Salkantay (4,630m)" }, { time: "Día 3", text: "Descenso a selva alta" }, { time: "Día 4", text: "Cafetales → Aguas Calientes" }, { time: "Día 5", text: "Machu Picchu → Cusco" }],
        difficulty: "Alta", altitude: "4,630 m (máx)", groupSize: "Máx. 12" },
      { id: "lares", name: "Lares Trekking", tag: "Cultura Viva", duration: "4D / 3N", price: "S/. 950",
        desc: "Trekking cultural por comunidades quechuas, aguas termales y paisajes andinos auténticos.",
        longDesc: "El Trek de Lares es la ruta más cultural. Atraviesa comunidades quechuas con tradiciones ancestrales, montañas, lagunas y valles que culminan en Machu Picchu.",
        includes: ["Transporte", "Guía bilingüe", "Cocinero y arrieros", "Todas las comidas", "Campamento", "Entrada Machu Picchu", "Tren retorno", "Aguas termales de Lares"],
        notIncludes: ["Saco de dormir (S/. 50)", "Bastones (S/. 30)", "Propinas"],
        itinerary: [{ time: "Día 1", text: "Cusco → Lares – Aguas termales" }, { time: "Día 2", text: "Lares → Patacancha" }, { time: "Día 3", text: "Patacancha → Ollantaytambo" }, { time: "Día 4", text: "Machu Picchu → Cusco" }],
        difficulty: "Moderada", altitude: "4,400 m (máx)", groupSize: "Máx. 12" },
      { id: "palccoyo", name: "Palccoyo", tag: "7 Colores Alternativo", duration: "Full Day", price: "S/. 70",
        desc: "Tres montañas de colores con caminata suave. La alternativa perfecta a Vinicunca.",
        longDesc: "Palccoyo ofrece tres montañas de colores, un bosque de piedras y vistas espectaculares con caminata menos exigente. Ideal para quienes quieren la experiencia sin esfuerzo extremo.",
        includes: ["Transporte ida y vuelta", "Desayuno buffet", "Guía bilingüe", "Kit primeros auxilios"],
        notIncludes: ["Entrada Palccoyo (S/. 10)", "Almuerzo", "Propinas"],
        itinerary: [{ time: "4:00 AM", text: "Recojo del hotel" }, { time: "6:30 AM", text: "Desayuno en Checacupe" }, { time: "8:30 AM", text: "Inicio caminata (3 km)" }, { time: "9:30 AM", text: "Primera montaña" }, { time: "10:30 AM", text: "Bosque de piedras" }, { time: "11:30 AM", text: "Retorno" }, { time: "5:00 PM", text: "Llegada a Cusco" }],
        difficulty: "Fácil", altitude: "4,900 m", groupSize: "Máx. 16" }
    ],
    gallery: [
      { title: "Machu Picchu al amanecer", cat: "Machu Picchu", emoji: "🌅" },
      { title: "Cima Montaña 7 Colores", cat: "Montaña 7C", emoji: "🌈" },
      { title: "Laguna Humantay", cat: "Lagunas", emoji: "💎" },
      { title: "Sacsayhuamán", cat: "City Tour", emoji: "🏛️" },
      { title: "Valle Sagrado", cat: "Valle", emoji: "🏞️" },
      { title: "Puerta del Sol", cat: "Trekking", emoji: "🚶" },
      { title: "Grupo en la cima", cat: "Grupos", emoji: "👥" },
      { title: "Comida cusqueña", cat: "Cultura", emoji: "🍲" },
      { title: "Atardecer en Cusco", cat: "Ciudad", emoji: "🌇" }
    ]
  },
  en: {
    nav: { inicio: "Home", tours: "Tours", nosotros: "About Us", media: "Media", contacto: "Contact", reservar: "Book Now" },
    hero: {
      badge: "Local agency in Cusco",
      title1: "Discover the magic of",
      titleHighlight: "Cusco",
      subtitle: "Authentic tours with local guides. Machu Picchu, Rainbow Mountain, Sacred Valley and more — personalized attention on every adventure.",
      cta1: "View Tours", cta2: "WhatsApp",
      stat1: "Happy travelers", stat2: "Tours available", stat3: "On TripAdvisor", scroll: "Scroll"
    },
    featured: { label: "Most Popular", title: "Featured Tours", seeAll: "View all tours →", details: "View details →", from: "From" },
    commitments: {
      label: "Our guarantees", title: "Why Choose Us?",
      items: [
        { icon: "🛡️", title: "Certified Safety", desc: "Certified equipment and strict protocols on every adventure." },
        { icon: "🗣️", title: "Bilingual Guides", desc: "Professionals who speak your language and know every corner." },
        { icon: "💰", title: "Direct Pricing", desc: "No middlemen. Book directly at the best guaranteed price." },
        { icon: "📱", title: "24/7 Support", desc: "We assist you via WhatsApp or call whenever you need." }
      ]
    },
    cta: { label: "Ready?", title: "Plan your adventure today", desc: "Message us on WhatsApp and we'll design your perfect itinerary. Instant response, no commitment.", btn: "Message us on WhatsApp" },
    toursPage: { label: "Experiences", title: "All Our Tours", desc: "From half-day walks to 5-day treks. Find your ideal adventure.", all: "All", fullDay: "Full Day", multiDay: "Multi-day" },
    tourDetail: {
      back: "← Back to Tours", itinerary: "📋 Itinerary", includes: "✅ Included", notIncludes: "❌ Not Included",
      priceLabel: "Price per person", priceNote: "Price per person. Ask about group discounts.", reserveBtn: "Book via WhatsApp",
      whatsappMsg: "Hi, I want to book"
    },
    about: {
      label: "Our Story", title: "About Green Golden Cusco",
      paragraphs: [
        "We are a local tourism agency founded in Cusco by locals. We were born with the conviction that the best way to know our land is with those who live it daily.",
        "We are not middlemen. We personally design each tour, select our guides for their passion and knowledge, and make sure every traveler feels the authenticity of the Andes.",
        "From high-altitude trekking to cultural city tours, our mission is to connect travelers with the essence of Cusco in a safe, responsible, and memorable way."
      ],
      valuesTitle: "Our Values",
      values: [
        { icon: "🌱", title: "Responsible Tourism", desc: "We respect the environment and local communities." },
        { icon: "🤝", title: "Authenticity", desc: "Real experiences, not generic tourist scripts." },
        { icon: "⭐", title: "Excellence", desc: "Every detail matters. From transport to the guide." },
        { icon: "❤️", title: "Passion", desc: "We love our land and it shows in every tour." }
      ],
      teamTitle: "Our Team",
      team: [
        { name: "Carlos Quispe", role: "Founder & Lead Guide", exp: "12 years of experience", emoji: "👨‍💼" },
        { name: "María Huamán", role: "Tours Coordinator", exp: "8 years in tourism", emoji: "👩‍💼" },
        { name: "Diego Condori", role: "Trekking Guide", exp: "Certified in high mountain", emoji: "🧗" },
        { name: "Luz Mamani", role: "Customer Service", exp: "Bilingual Spanish-English", emoji: "💬" }
      ],
      legalTitle: "📄 Legal",
      legalDesc: "Green Golden Cusco is a formally incorporated company, registered with SUNAT and authorized by DIRCETUR Cusco to operate tourism services.",
      legalBadges: ["Active RUC", "DIRCETUR Authorized", "Complaints Book"]
    },
    mediaPage: {
      label: "Gallery", title: "Media", desc: "Images and moments from our tours around Cusco.", all: "All",
      videoTitle: "Multimedia", videoDesc: "Tour videos coming soon. Follow us on social media for updated content."
    },
    contact: {
      label: "Let's Talk", title: "Contact", desc: "Have questions? Write to us and we'll respond instantly.",
      formTitle: "Send us a message", name: "Name", email: "Email", subject: "Subject", message: "Your message...", send: "Send Message",
      sent: "Message sent! We'll respond soon.",
      whatsappTitle: "💬 WhatsApp (Quick Response)", emailTitle: "📧 Email", addressTitle: "📍 Address",
      hoursTitle: "🕐 Hours", hours1: "Monday to Saturday: 7:00 AM – 9:00 PM", hours2: "Sunday: 8:00 AM – 6:00 PM",
      socialTitle: "🌐 Social Media"
    },
    footer: {
      desc: "Local tourism agency in Cusco. Authentic tours with personalized attention.",
      menu: "Menu", popularTours: "Popular Tours", contactLabel: "Contact",
      terms: "Terms & Conditions", complaints: "Complaints Book", rights: "All rights reserved."
    },
    tours: [
      { id: "machu-picchu", name: "Machu Picchu", tag: "World Wonder", duration: "Full Day", price: "S/. 350",
        desc: "Discover the most iconic Inca citadel on the planet, surrounded by mountains and ancestral mystery.",
        longDesc: "Machu Picchu is one of the 7 New Wonders of the World. Our tour takes you from Cusco on a journey combining history, nature, and unique energy.",
        includes: ["Transport Cusco – Ollantaytambo – Aguas Calientes", "Round-trip tourist train", "Bus up/down to Machu Picchu", "Machu Picchu entrance", "Bilingual professional guide", "Permanent assistance"],
        notIncludes: ["Meals", "Tips", "Personal expenses"],
        itinerary: [{ time: "4:00 AM", text: "Hotel pickup" }, { time: "6:30 AM", text: "Train from Ollantaytambo" }, { time: "8:30 AM", text: "Bus to Machu Picchu" }, { time: "9:00 AM", text: "Guided tour (2.5 hrs)" }, { time: "12:00 PM", text: "Free time" }, { time: "2:00 PM", text: "Lunch in Aguas Calientes" }, { time: "4:30 PM", text: "Return train" }, { time: "8:00 PM", text: "Arrival in Cusco" }],
        difficulty: "Easy", altitude: "2,430 m", groupSize: "Max. 16" },
      { id: "montana-7-colores", name: "Rainbow Mountain", tag: "Natural Icon", duration: "Full Day", price: "S/. 80",
        desc: "Walk through surreal landscapes to one of Peru's most breathtaking natural wonders.",
        longDesc: "Vinicunca, the famous Rainbow Mountain, shows mineral layers in red, turquoise, gold, and lavender tones. A demanding but absolutely rewarding hike.",
        includes: ["Transport Cusco – Vinicunca – Cusco", "Buffet breakfast en route", "Bilingual guide", "First aid kit & oxygen", "Trekking poles"],
        notIncludes: ["Lunch (S/. 15)", "Support horse (S/. 80)", "Tips"],
        itinerary: [{ time: "3:30 AM", text: "Hotel pickup" }, { time: "6:00 AM", text: "Breakfast in Cusipata" }, { time: "7:30 AM", text: "Start hike (5 km)" }, { time: "10:00 AM", text: "Arrive at summit" }, { time: "11:00 AM", text: "Descent" }, { time: "1:00 PM", text: "Optional lunch" }, { time: "5:00 PM", text: "Arrival in Cusco" }],
        difficulty: "Moderate-Hard", altitude: "5,200 m", groupSize: "Max. 15" },
      { id: "laguna-humantay", name: "Humantay Lake", tag: "Pure Nature", duration: "Full Day", price: "S/. 70",
        desc: "A turquoise lake at the foot of ancient glaciers. An unforgettable visual spectacle.",
        longDesc: "Humantay Lake is a hidden gem in the Cusco Andes. Its intense turquoise waters, fed by the Humantay glacier melt, create a surreal landscape.",
        includes: ["Round-trip transport", "Breakfast en route", "Bilingual guide", "First aid kit", "Trekking poles"],
        notIncludes: ["Lunch", "Support horse (S/. 70)", "Lake entrance (S/. 10)", "Tips"],
        itinerary: [{ time: "4:00 AM", text: "Hotel pickup" }, { time: "6:30 AM", text: "Breakfast in Mollepata" }, { time: "7:30 AM", text: "Start hike" }, { time: "9:30 AM", text: "Arrive at the lake" }, { time: "11:00 AM", text: "Descent" }, { time: "12:30 PM", text: "Optional lunch" }, { time: "5:00 PM", text: "Return to Cusco" }],
        difficulty: "Moderate", altitude: "4,200 m", groupSize: "Max. 16" },
      { id: "city-tour", name: "Cusco City Tour", tag: "Historic Center", duration: "Half Day", price: "S/. 50",
        desc: "Walk through the heart of the imperial city: Sacsayhuamán, Qenqo, the Cathedral, and Qoricancha.",
        longDesc: "A tour through the most emblematic sites of the ancient Inca Empire capital. The perfect blend of Inca and colonial architecture.",
        includes: ["Tourist transport", "Bilingual guide", "Tour of 6 historic sites"],
        notIncludes: ["Tourist ticket (S/. 70)", "Cathedral entrance (S/. 25)", "Qoricancha entrance (S/. 15)", "Meals"],
        itinerary: [{ time: "1:00 PM", text: "Hotel pickup" }, { time: "1:20 PM", text: "Qoricancha" }, { time: "2:30 PM", text: "Cusco Cathedral" }, { time: "3:30 PM", text: "Sacsayhuamán" }, { time: "4:30 PM", text: "Qenqo" }, { time: "5:00 PM", text: "Puca Pucara & Tambomachay" }, { time: "6:00 PM", text: "Return to hotel" }],
        difficulty: "Easy", altitude: "3,400 m", groupSize: "Max. 16" },
      { id: "7-lagunas", name: "7 Lagoons Ausangate", tag: "Andean Adventure", duration: "Full Day", price: "S/. 90",
        desc: "Seven intensely colored lagoons surrounded by snow-capped mountains. For trekking lovers.",
        longDesc: "The 7 Lagoons circuit takes you through spectacular high-Andean landscapes, with lagoons ranging from turquoise to emerald, surrounded by Ausangate glaciers.",
        includes: ["Round-trip transport", "Buffet breakfast", "Bilingual guide", "First aid kit", "Trekking poles"],
        notIncludes: ["Lunch", "Support horse (S/. 80)", "Tips"],
        itinerary: [{ time: "3:00 AM", text: "Hotel pickup" }, { time: "5:30 AM", text: "Breakfast in Checacupe" }, { time: "7:00 AM", text: "Start trek" }, { time: "8:30 AM", text: "First lagoon" }, { time: "10:00 AM", text: "7 lagoons circuit" }, { time: "12:30 PM", text: "Highest point" }, { time: "1:30 PM", text: "Descent & lunch" }, { time: "6:00 PM", text: "Return to Cusco" }],
        difficulty: "Hard", altitude: "4,800 m", groupSize: "Max. 15" },
      { id: "camino-inca", name: "Classic Inca Trail", tag: "Legendary Trek", duration: "4D / 3N", price: "S/. 1,800",
        desc: "The ancestral 43 km route to Machu Picchu. Camps, ruins, and life-changing landscapes.",
        longDesc: "The 4-day Classic Inca Trail is one of the world's best treks. 43 km of original Inca paths, 3 mountain passes, and sunrise at the Sun Gate.",
        includes: ["Inca Trail & Machu Picchu permits", "Bilingual guide", "Cook & porters", "All meals", "Camping equipment", "Return bus & train"],
        notIncludes: ["Sleeping bag (S/. 50)", "Poles (S/. 30)", "Tips", "Last lunch"],
        itinerary: [{ time: "Day 1", text: "Km 82 → Wayllabamba (12 km)" }, { time: "Day 2", text: "Wayllabamba → Pacaymayo (11 km) – Dead Woman's Pass" }, { time: "Day 3", text: "Pacaymayo → Wiñay Wayna (16 km)" }, { time: "Day 4", text: "Wiñay Wayna → Machu Picchu (4 km)" }],
        difficulty: "Hard", altitude: "4,215 m (max)", groupSize: "Max. 8" },
      { id: "salkantay", name: "Salkantay Trek", tag: "Alternative Route", duration: "5D / 4N", price: "S/. 1,200",
        desc: "The epic alternative to the Inca Trail. Glaciers, cloud forest, and Machu Picchu in 5 days.",
        longDesc: "The Salkantay Trek is the most popular alternative route. It crosses landscapes from glaciers at 4,600m to tropical jungle through Andean communities.",
        includes: ["Transport & transfers", "Bilingual guide", "Cook & muleteers", "All meals", "Full camping", "Machu Picchu entrance", "Return train"],
        notIncludes: ["Sleeping bag (S/. 50)", "Poles (S/. 30)", "Hot springs (S/. 10)", "Tips"],
        itinerary: [{ time: "Day 1", text: "Cusco → Soraypampa" }, { time: "Day 2", text: "Salkantay Pass (4,630m)" }, { time: "Day 3", text: "Descent to cloud forest" }, { time: "Day 4", text: "Coffee farms → Aguas Calientes" }, { time: "Day 5", text: "Machu Picchu → Cusco" }],
        difficulty: "Hard", altitude: "4,630 m (max)", groupSize: "Max. 12" },
      { id: "lares", name: "Lares Trek", tag: "Living Culture", duration: "4D / 3N", price: "S/. 950",
        desc: "Cultural trek through Quechua communities, hot springs, and authentic Andean landscapes.",
        longDesc: "The Lares Trek is the most cultural of all routes. It passes through Quechua communities with ancestral traditions, mountains, lagoons, and valleys ending at Machu Picchu.",
        includes: ["Transport", "Bilingual guide", "Cook & muleteers", "All meals", "Camping", "Machu Picchu entrance", "Return train", "Lares hot springs"],
        notIncludes: ["Sleeping bag (S/. 50)", "Poles (S/. 30)", "Tips"],
        itinerary: [{ time: "Day 1", text: "Cusco → Lares – Hot springs" }, { time: "Day 2", text: "Lares → Patacancha" }, { time: "Day 3", text: "Patacancha → Ollantaytambo" }, { time: "Day 4", text: "Machu Picchu → Cusco" }],
        difficulty: "Moderate", altitude: "4,400 m (max)", groupSize: "Max. 12" },
      { id: "palccoyo", name: "Palccoyo", tag: "Alternative Rainbow", duration: "Full Day", price: "S/. 70",
        desc: "Three rainbow mountains with an easy hike. The perfect alternative to Vinicunca.",
        longDesc: "Palccoyo offers three rainbow mountains, a stone forest, and spectacular views with a much easier walk. Ideal for those who want the experience without extreme effort.",
        includes: ["Round-trip transport", "Buffet breakfast", "Bilingual guide", "First aid kit"],
        notIncludes: ["Palccoyo entrance (S/. 10)", "Lunch", "Tips"],
        itinerary: [{ time: "4:00 AM", text: "Hotel pickup" }, { time: "6:30 AM", text: "Breakfast in Checacupe" }, { time: "8:30 AM", text: "Start easy hike (3 km)" }, { time: "9:30 AM", text: "First rainbow mountain" }, { time: "10:30 AM", text: "Stone forest" }, { time: "11:30 AM", text: "Return" }, { time: "5:00 PM", text: "Arrival in Cusco" }],
        difficulty: "Easy", altitude: "4,900 m", groupSize: "Max. 16" }
    ],
    gallery: [
      { title: "Machu Picchu at sunrise", cat: "Machu Picchu", emoji: "🌅" },
      { title: "Rainbow Mountain summit", cat: "Rainbow Mt.", emoji: "🌈" },
      { title: "Humantay Lake", cat: "Lakes", emoji: "💎" },
      { title: "Sacsayhuamán", cat: "City Tour", emoji: "🏛️" },
      { title: "Sacred Valley panorama", cat: "Valley", emoji: "🏞️" },
      { title: "Sun Gate – Inca Trail", cat: "Trekking", emoji: "🚶" },
      { title: "Group at the top", cat: "Groups", emoji: "👥" },
      { title: "Cusco traditional food", cat: "Culture", emoji: "🍲" },
      { title: "Sunset in Cusco", cat: "City", emoji: "🌇" }
    ]
  },
  pt: {
    nav: { inicio: "Início", tours: "Tours", nosotros: "Sobre Nós", media: "Mídia", contacto: "Contato", reservar: "Reservar" },
    hero: {
      badge: "Agência local em Cusco",
      title1: "Descubra a magia de",
      titleHighlight: "Cusco",
      subtitle: "Tours autênticos com guias locais. Machu Picchu, Montanha 7 Cores, Vale Sagrado e mais — atendimento personalizado em cada aventura.",
      cta1: "Ver Tours", cta2: "WhatsApp",
      stat1: "Viajantes felizes", stat2: "Tours disponíveis", stat3: "No TripAdvisor", scroll: "Scroll"
    },
    featured: { label: "Mais populares", title: "Tours em Destaque", seeAll: "Ver todos os tours →", details: "Ver detalhes →", from: "A partir de" },
    commitments: {
      label: "Nossas garantias", title: "Por que nos escolher?",
      items: [
        { icon: "🛡️", title: "Segurança Certificada", desc: "Equipamentos certificados e protocolos rigorosos em cada aventura." },
        { icon: "🗣️", title: "Guias Bilíngues", desc: "Profissionais que falam seu idioma e conhecem cada canto." },
        { icon: "💰", title: "Preço Direto", desc: "Sem intermediários. Reserve direto com o melhor preço garantido." },
        { icon: "📱", title: "Atendimento 24/7", desc: "Atendemos pelo WhatsApp ou ligação quando precisar." }
      ]
    },
    cta: { label: "Pronto?", title: "Monte sua aventura hoje", desc: "Escreva no WhatsApp e montamos seu roteiro ideal. Resposta imediata, sem compromisso.", btn: "Fale conosco no WhatsApp" },
    toursPage: { label: "Experiências", title: "Todos os Nossos Tours", desc: "De caminhadas de meio dia a trekkings de 5 dias. Encontre sua aventura ideal.", all: "Todos", fullDay: "Full Day", multiDay: "Multi-dia" },
    tourDetail: {
      back: "← Voltar aos Tours", itinerary: "📋 Roteiro", includes: "✅ Inclui", notIncludes: "❌ Não Inclui",
      priceLabel: "Preço por pessoa", priceNote: "Preço por pessoa. Consulte desconto para grupos.", reserveBtn: "Reservar pelo WhatsApp",
      whatsappMsg: "Olá, quero reservar"
    },
    about: {
      label: "Nossa história", title: "Sobre Green Golden Cusco",
      paragraphs: [
        "Somos uma agência de turismo local fundada em Cusco por cusqueños. Nascemos com a convicção de que a melhor forma de conhecer nossa terra é com quem a vive diariamente.",
        "Não somos intermediários. Desenhamos cada tour pessoalmente, selecionamos nossos guias pela paixão e conhecimento, e garantimos que cada viajante sinta a autenticidade dos Andes.",
        "De trekking de alta montanha a passeios culturais pela cidade, nossa missão é conectar viajantes com a essência de Cusco de forma segura, responsável e memorável."
      ],
      valuesTitle: "Nossos Valores",
      values: [
        { icon: "🌱", title: "Turismo Responsável", desc: "Respeitamos o meio ambiente e as comunidades locais." },
        { icon: "🤝", title: "Autenticidade", desc: "Experiências reais, não roteiros turísticos genéricos." },
        { icon: "⭐", title: "Excelência", desc: "Cada detalhe importa. Do transporte ao guia." },
        { icon: "❤️", title: "Paixão", desc: "Amamos nossa terra e isso se nota em cada tour." }
      ],
      teamTitle: "Nossa Equipe",
      team: [
        { name: "Carlos Quispe", role: "Fundador & Guia Principal", exp: "12 anos de experiência", emoji: "👨‍💼" },
        { name: "María Huamán", role: "Coordenadora de Tours", exp: "8 anos em turismo", emoji: "👩‍💼" },
        { name: "Diego Condori", role: "Guia de Trekking", exp: "Certificado em alta montanha", emoji: "🧗" },
        { name: "Luz Mamani", role: "Atendimento ao Cliente", exp: "Bilíngue espanhol-inglês", emoji: "💬" }
      ],
      legalTitle: "📄 Legalidades",
      legalDesc: "Green Golden Cusco é uma empresa formalmente constituída, registrada na SUNAT e autorizada pela DIRCETUR Cusco para operar serviços turísticos.",
      legalBadges: ["RUC Ativo", "DIRCETUR Autorizado", "Livro de Reclamações"]
    },
    mediaPage: {
      label: "Galeria", title: "Mídia", desc: "Imagens e momentos dos nossos tours por Cusco e arredores.", all: "Todas",
      videoTitle: "Multimídia", videoDesc: "Em breve vídeos dos nossos tours. Siga-nos nas redes para conteúdo atualizado."
    },
    contact: {
      label: "Fale Conosco", title: "Contato", desc: "Tem perguntas? Escreva e respondemos na hora.",
      formTitle: "Envie uma mensagem", name: "Nome", email: "E-mail", subject: "Assunto", message: "Sua mensagem...", send: "Enviar Mensagem",
      sent: "Mensagem enviada! Responderemos em breve.",
      whatsappTitle: "💬 WhatsApp (Resposta rápida)", emailTitle: "📧 E-mail", addressTitle: "📍 Endereço",
      hoursTitle: "🕐 Horário", hours1: "Segunda a Sábado: 7:00 AM – 9:00 PM", hours2: "Domingo: 8:00 AM – 6:00 PM",
      socialTitle: "🌐 Redes Sociais"
    },
    footer: {
      desc: "Agência de turismo local em Cusco. Tours autênticos com atendimento personalizado.",
      menu: "Menu", popularTours: "Tours Populares", contactLabel: "Contato",
      terms: "Termos e Condições", complaints: "Livro de Reclamações", rights: "Todos os direitos reservados."
    },
    tours: [
      { id: "machu-picchu", name: "Machu Picchu", tag: "Maravilha do Mundo", duration: "Dia Inteiro", price: "S/. 350",
        desc: "Descubra a cidadela inca mais emblemática do planeta, cercada de montanhas e mistério ancestral.",
        longDesc: "Machu Picchu é uma das 7 maravilhas do mundo moderno. Nosso tour leva você de Cusco em uma viagem que combina história, natureza e energia única.",
        includes: ["Transporte Cusco – Ollantaytambo – Aguas Calientes", "Trem turístico ida e volta", "Ônibus subida/descida Machu Picchu", "Entrada Machu Picchu", "Guia bilíngue", "Assistência permanente"],
        notIncludes: ["Alimentação", "Gorjetas", "Gastos pessoais"],
        itinerary: [{ time: "4:00 AM", text: "Saída do hotel" }, { time: "6:30 AM", text: "Trem de Ollantaytambo" }, { time: "8:30 AM", text: "Ônibus a Machu Picchu" }, { time: "9:00 AM", text: "Tour guiado (2,5 hrs)" }, { time: "12:00 PM", text: "Tempo livre" }, { time: "2:00 PM", text: "Almoço em Aguas Calientes" }, { time: "4:30 PM", text: "Trem de retorno" }, { time: "8:00 PM", text: "Chegada em Cusco" }],
        difficulty: "Fácil", altitude: "2.430 m", groupSize: "Máx. 16" },
      { id: "montana-7-colores", name: "Montanha 7 Cores", tag: "Ícone Natural", duration: "Dia Inteiro", price: "S/. 80",
        desc: "Caminhe por paisagens surreais até um dos cenários mais impressionantes do Peru.",
        longDesc: "Vinicunca, a famosa Montanha 7 Cores, mostra camadas minerais em tons avermelhados, turquesa, dourados e lavanda. Uma caminhada exigente mas gratificante.",
        includes: ["Transporte Cusco – Vinicunca – Cusco", "Café da manhã buffet", "Guia bilíngue", "Kit primeiros socorros e oxigênio", "Bastões de trekking"],
        notIncludes: ["Almoço (S/. 15)", "Cavalo de apoio (S/. 80)", "Gorjetas"],
        itinerary: [{ time: "3:30 AM", text: "Saída do hotel" }, { time: "6:00 AM", text: "Café em Cusipata" }, { time: "7:30 AM", text: "Início caminhada (5 km)" }, { time: "10:00 AM", text: "Chegada ao cume" }, { time: "11:00 AM", text: "Descida" }, { time: "1:00 PM", text: "Almoço opcional" }, { time: "5:00 PM", text: "Chegada em Cusco" }],
        difficulty: "Moderada-Alta", altitude: "5.200 m", groupSize: "Máx. 15" },
      { id: "laguna-humantay", name: "Lagoa Humantay", tag: "Natureza Pura", duration: "Dia Inteiro", price: "S/. 70",
        desc: "Uma lagoa turquesa aos pés de geleiras milenares. Um espetáculo visual inesquecível.",
        longDesc: "A Lagoa Humantay é uma joia escondida nos Andes cusqueños. Suas águas turquesa intenso criam uma paisagem irreal.",
        includes: ["Transporte ida e volta", "Café da manhã", "Guia bilíngue", "Kit primeiros socorros", "Bastões"],
        notIncludes: ["Almoço", "Cavalo (S/. 70)", "Entrada lagoa (S/. 10)", "Gorjetas"],
        itinerary: [{ time: "4:00 AM", text: "Saída do hotel" }, { time: "6:30 AM", text: "Café em Mollepata" }, { time: "7:30 AM", text: "Início caminhada" }, { time: "9:30 AM", text: "Chegada à lagoa" }, { time: "11:00 AM", text: "Descida" }, { time: "12:30 PM", text: "Almoço opcional" }, { time: "5:00 PM", text: "Retorno a Cusco" }],
        difficulty: "Moderada", altitude: "4.200 m", groupSize: "Máx. 16" },
      { id: "city-tour", name: "City Tour Cusco", tag: "Centro Histórico", duration: "Meio Dia", price: "S/. 50",
        desc: "Percorra a essência da cidade imperial: Sacsayhuamán, Qenqo, Catedral e Qoricancha.",
        longDesc: "Um passeio pelos pontos mais emblemáticos da antiga capital do Império Inca. A fusão perfeita entre arquitetura inca e colonial.",
        includes: ["Transporte turístico", "Guia bilíngue", "Visita a 6 sítios históricos"],
        notIncludes: ["Boleto turístico (S/. 70)", "Entrada Catedral (S/. 25)", "Entrada Qoricancha (S/. 15)", "Alimentação"],
        itinerary: [{ time: "1:00 PM", text: "Saída do hotel" }, { time: "1:20 PM", text: "Qoricancha" }, { time: "2:30 PM", text: "Catedral de Cusco" }, { time: "3:30 PM", text: "Sacsayhuamán" }, { time: "4:30 PM", text: "Qenqo" }, { time: "5:00 PM", text: "Puca Pucara e Tambomachay" }, { time: "6:00 PM", text: "Retorno ao hotel" }],
        difficulty: "Fácil", altitude: "3.400 m", groupSize: "Máx. 16" },
      { id: "7-lagunas", name: "7 Lagoas Ausangate", tag: "Aventura Andina", duration: "Dia Inteiro", price: "S/. 90",
        desc: "Sete lagoas de cores intensas cercadas de montanhas nevadas. Para amantes de trekking.",
        longDesc: "O circuito das 7 Lagoas leva por paisagens alto-andinas espetaculares, com lagoas do turquesa ao esmeralda.",
        includes: ["Transporte ida e volta", "Café buffet", "Guia bilíngue", "Kit primeiros socorros", "Bastões"],
        notIncludes: ["Almoço", "Cavalo (S/. 80)", "Gorjetas"],
        itinerary: [{ time: "3:00 AM", text: "Saída do hotel" }, { time: "5:30 AM", text: "Café em Checacupe" }, { time: "7:00 AM", text: "Início trekking" }, { time: "8:30 AM", text: "Primeira lagoa" }, { time: "10:00 AM", text: "Circuito 7 lagoas" }, { time: "12:30 PM", text: "Ponto mais alto" }, { time: "1:30 PM", text: "Descida e almoço" }, { time: "6:00 PM", text: "Retorno a Cusco" }],
        difficulty: "Alta", altitude: "4.800 m", groupSize: "Máx. 15" },
      { id: "camino-inca", name: "Trilha Inca Clássica", tag: "Trekking Lendário", duration: "4D / 3N", price: "S/. 1.800",
        desc: "A rota ancestral de 43 km até Machu Picchu. Acampamentos, ruínas e paisagens que mudam vidas.",
        longDesc: "A Trilha Inca Clássica de 4 dias é um dos melhores trekkings do mundo. 43 km de trilhas incas originais, 3 passagens de montanha e nascer do sol no Portão do Sol.",
        includes: ["Permissões Trilha Inca e Machu Picchu", "Guia bilíngue", "Cozinheiro e carregadores", "Todas as refeições", "Equipamento de camping", "Ônibus e trem retorno"],
        notIncludes: ["Saco de dormir (S/. 50)", "Bastões (S/. 30)", "Gorjetas", "Último almoço"],
        itinerary: [{ time: "Dia 1", text: "Km 82 → Wayllabamba (12 km)" }, { time: "Dia 2", text: "Wayllabamba → Pacaymayo (11 km)" }, { time: "Dia 3", text: "Pacaymayo → Wiñay Wayna (16 km)" }, { time: "Dia 4", text: "Wiñay Wayna → Machu Picchu (4 km)" }],
        difficulty: "Alta", altitude: "4.215 m (máx)", groupSize: "Máx. 8" },
      { id: "salkantay", name: "Salkantay Trekking", tag: "Rota Alternativa", duration: "5D / 4N", price: "S/. 1.200",
        desc: "A alternativa épica à Trilha Inca. Geleiras, mata nublada e Machu Picchu em 5 dias.",
        longDesc: "O Salkantay Trek é a rota alternativa mais popular. Cruza paisagens de geleiras a 4.600m até selva tropical.",
        includes: ["Transporte", "Guia bilíngue", "Cozinheiro e tropeiros", "Todas as refeições", "Camping completo", "Entrada Machu Picchu", "Trem retorno"],
        notIncludes: ["Saco de dormir (S/. 50)", "Bastões (S/. 30)", "Águas termais (S/. 10)", "Gorjetas"],
        itinerary: [{ time: "Dia 1", text: "Cusco → Soraypampa" }, { time: "Dia 2", text: "Passagem Salkantay (4.630m)" }, { time: "Dia 3", text: "Descida à mata nublada" }, { time: "Dia 4", text: "Cafezais → Aguas Calientes" }, { time: "Dia 5", text: "Machu Picchu → Cusco" }],
        difficulty: "Alta", altitude: "4.630 m (máx)", groupSize: "Máx. 12" },
      { id: "lares", name: "Lares Trekking", tag: "Cultura Viva", duration: "4D / 3N", price: "S/. 950",
        desc: "Trekking cultural por comunidades quechuas, águas termais e paisagens andinas autênticas.",
        longDesc: "O Trek de Lares é a rota mais cultural. Passa por comunidades quechuas com tradições ancestrais até Machu Picchu.",
        includes: ["Transporte", "Guia bilíngue", "Cozinheiro e tropeiros", "Todas as refeições", "Camping", "Entrada Machu Picchu", "Trem retorno", "Águas termais de Lares"],
        notIncludes: ["Saco de dormir (S/. 50)", "Bastões (S/. 30)", "Gorjetas"],
        itinerary: [{ time: "Dia 1", text: "Cusco → Lares – Águas termais" }, { time: "Dia 2", text: "Lares → Patacancha" }, { time: "Dia 3", text: "Patacancha → Ollantaytambo" }, { time: "Dia 4", text: "Machu Picchu → Cusco" }],
        difficulty: "Moderada", altitude: "4.400 m (máx)", groupSize: "Máx. 12" },
      { id: "palccoyo", name: "Palccoyo", tag: "7 Cores Alternativo", duration: "Dia Inteiro", price: "S/. 70",
        desc: "Três montanhas coloridas com caminhada leve. A alternativa perfeita a Vinicunca.",
        longDesc: "Palccoyo oferece três montanhas coloridas, uma floresta de pedras e vistas espetaculares com caminhada menos exigente.",
        includes: ["Transporte ida e volta", "Café buffet", "Guia bilíngue", "Kit primeiros socorros"],
        notIncludes: ["Entrada Palccoyo (S/. 10)", "Almoço", "Gorjetas"],
        itinerary: [{ time: "4:00 AM", text: "Saída do hotel" }, { time: "6:30 AM", text: "Café em Checacupe" }, { time: "8:30 AM", text: "Início caminhada (3 km)" }, { time: "9:30 AM", text: "Primeira montanha" }, { time: "10:30 AM", text: "Floresta de pedras" }, { time: "11:30 AM", text: "Retorno" }, { time: "5:00 PM", text: "Chegada em Cusco" }],
        difficulty: "Fácil", altitude: "4.900 m", groupSize: "Máx. 16" }
    ],
    gallery: [
      { title: "Machu Picchu ao amanhecer", cat: "Machu Picchu", emoji: "🌅" },
      { title: "Cume Montanha 7 Cores", cat: "Montanha 7C", emoji: "🌈" },
      { title: "Lagoa Humantay", cat: "Lagoas", emoji: "💎" },
      { title: "Sacsayhuamán", cat: "City Tour", emoji: "🏛️" },
      { title: "Vale Sagrado", cat: "Vale", emoji: "🏞️" },
      { title: "Portão do Sol", cat: "Trekking", emoji: "🚶" },
      { title: "Grupo no topo", cat: "Grupos", emoji: "👥" },
      { title: "Comida cusqueña", cat: "Cultura", emoji: "🍲" },
      { title: "Pôr do sol em Cusco", cat: "Cidade", emoji: "🌇" }
    ]
  }
};

const LangCtx = createContext();
const useLang = () => useContext(LangCtx);

const tourEmojis = { "machu-picchu": "🏛️", "montana-7-colores": "🌈", "laguna-humantay": "💧", "city-tour": "🏰", "7-lagunas": "⛰️", "camino-inca": "🥾", salkantay: "🏔️", lares: "🌿", palccoyo: "🎨" };
const tourGradients = { "machu-picchu": "linear-gradient(135deg,#2d5016,#4a7c23)", "montana-7-colores": "linear-gradient(135deg,#8B4513,#D2691E)", "laguna-humantay": "linear-gradient(135deg,#1a5276,#2e86c1)", "city-tour": "linear-gradient(135deg,#6c3483,#a569bd)", "7-lagunas": "linear-gradient(135deg,#1b4332,#40916c)", "camino-inca": "linear-gradient(135deg,#5D4037,#8D6E63)", salkantay: "linear-gradient(135deg,#2c3e50,#4ca1af)", lares: "linear-gradient(135deg,#1e8449,#58d68d)", palccoyo: "linear-gradient(135deg,#b7410e,#e67e22)" };

/* ─── SHARED ─── */
const gold = "#A68D49", darkBg = "#0a0f07", darkerBg = "#060a04";
const maxW = { maxWidth: 1200, margin: "0 auto" };
const lb = { fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: gold, letterSpacing: 4, textTransform: "uppercase" };
const hd = (s = 48) => ({ fontFamily: "'Playfair Display',serif", fontSize: `clamp(28px,5vw,${s}px)`, color: "#fff", margin: "14px 0 0", fontWeight: 700 });
const bt = { fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.8 };
const cBg = { background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 16, transition: "all .35s" };
const gBtn = (big) => ({ display: "inline-flex", alignItems: "center", gap: 8, background: gold, color: "#0f170c", padding: big ? "16px 40px" : "12px 28px", borderRadius: 8, fontSize: big ? 14 : 13, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", transition: "all .3s", cursor: "pointer", border: "none", boxShadow: "0 4px 20px rgba(166,141,73,.25)" });
const oBtn = { ...gBtn(), background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.15)", boxShadow: "none" };
const hL = e => e.currentTarget.style.transform = "translateY(-4px)";
const hR = e => e.currentTarget.style.transform = "translateY(0)";
const hC = e => { e.currentTarget.style.borderColor = "rgba(166,141,73,.3)"; e.currentTarget.style.background = "rgba(166,141,73,.06)"; };
const rC = e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"; e.currentTarget.style.background = "rgba(255,255,255,.03)"; };

function useInView(th = .12) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: th }); o.observe(el); return () => o.disconnect(); }, [th]);
  return [ref, v];
}
function A({ children, delay = 0, style: s = {} }) { const [ref, v] = useInView(); return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`, ...s }}>{children}</div>; }

/* ─── LANG SWITCHER ─── */
function FlagES() {
  return <svg width="24" height="16" viewBox="0 0 24 16" style={{ display: "block" }}>
    <rect width="24" height="16" rx="2" fill="#AA151B"/>
    <rect y="4" width="24" height="8" fill="#F1BF00"/>
  </svg>;
}
function FlagEN() {
  return <svg width="24" height="16" viewBox="0 0 24 16" style={{ display: "block" }}>
    <rect width="24" height="16" rx="2" fill="#012169"/>
    <path d="M0 0L24 16M24 0L0 16" stroke="#fff" strokeWidth="2.5"/>
    <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.5"/>
    <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="4.5"/>
    <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.5"/>
  </svg>;
}
function FlagPT() {
  return <svg width="24" height="16" viewBox="0 0 24 16" style={{ display: "block" }}>
    <rect width="24" height="16" rx="2" fill="#009739"/>
    <polygon points="12,2 22,8 12,14 2,8" fill="#FEDD00"/>
    <circle cx="12" cy="8" r="3" fill="#012169"/>
    <circle cx="12" cy="8" r="2.2" fill="#fff"/>
  </svg>;
}

const flagComponents = { es: FlagES, en: FlagEN, pt: FlagPT };
const langLabels = { es: "Español", en: "English", pt: "Português" };

function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {Object.keys(flagComponents).map(l => {
        const Flag = flagComponents[l];
        const active = lang === l;
        return (
          <button key={l} onClick={() => setLang(l)} title={langLabels[l]} style={{
            background: active ? "rgba(166,141,73,.2)" : "transparent",
            border: active ? `2px solid ${gold}` : "2px solid rgba(255,255,255,.12)",
            borderRadius: 6, padding: 4, cursor: "pointer", transition: "all .3s",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: active ? 1 : 0.6, transform: active ? "scale(1.1)" : "scale(1)"
          }}>
            <Flag />
          </button>
        );
      })}
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar({ page, setPage, scrolled, lang, setLang }) {
  const t = useLang(); const [open, setOpen] = useState(false);
  const links = [{ id: "inicio", l: t.nav.inicio }, { id: "tours", l: t.nav.tours }, { id: "nosotros", l: t.nav.nosotros }, { id: "media", l: t.nav.media }, { id: "contacto", l: t.nav.contacto }];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled || page !== "inicio" ? "rgba(15,23,12,.96)" : "transparent", backdropFilter: scrolled || page !== "inicio" ? "blur(20px)" : "none", borderBottom: scrolled || page !== "inicio" ? "1px solid rgba(166,141,73,.15)" : "none", transition: "all .4s", padding: scrolled ? "10px 0" : "18px 0" }}>
      <div style={{ ...maxW, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => { setPage("inicio"); window.scrollTo(0, 0); }} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <span style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Playfair Display',serif", color: gold }}>GG</span>
          <div style={{ height: 22, width: 1, background: "rgba(166,141,73,.35)" }} />
          <span style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)", letterSpacing: 3, textTransform: "uppercase" }}>Green Golden Cusco</span>
        </div>
        <div className="dNav" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {links.map(l => (
            <a key={l.id} onClick={() => { setPage(l.id); window.scrollTo(0, 0); }} style={{ color: page === l.id ? gold : "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 12, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", borderBottom: page === l.id ? `2px solid ${gold}` : "2px solid transparent", paddingBottom: 4, transition: "all .3s" }}>{l.l}</a>
          ))}
          <LangSwitcher lang={lang} setLang={setLang} />
          <a href="https://api.whatsapp.com/send/?phone=51943539286&text=Hola" target="_blank" rel="noreferrer" style={{ ...gBtn(), padding: "9px 20px", fontSize: 11 }} onMouseEnter={hL} onMouseLeave={hR}>{t.nav.reservar}</a>
        </div>
        <div className="mNav" style={{ display: "none", alignItems: "center", gap: 10 }}>
          <LangSwitcher lang={lang} setLang={setLang} />
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: gold, fontSize: 26, cursor: "pointer" }}>{open ? "✕" : "☰"}</button>
        </div>
      </div>
      {open && <div style={{ background: "rgba(15,23,12,.98)", padding: 24, display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        {links.map(l => <a key={l.id} onClick={() => { setPage(l.id); setOpen(false); window.scrollTo(0, 0); }} style={{ color: page === l.id ? gold : "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 14, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>{l.l}</a>)}
      </div>}
    </nav>
  );
}

/* ─── PAGES ─── */
function PageInicio({ setPage, setTour }) {
  const t = useLang(); const [hov, setHov] = useState(null);
  return <>
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#0f170c,#1a2e0f 30%,#0f170c 70%,#1c1207)" }}>
      <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(166,141,73,.08),transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(64,145,108,.06),transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .03, backgroundImage: "linear-gradient(rgba(255,255,255,.5)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5)1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ maxWidth: 880, padding: "0 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <A><div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(166,141,73,.1)", border: "1px solid rgba(166,141,73,.25)", borderRadius: 40, padding: "8px 20px", marginBottom: 28 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF50", animation: "pulse 2s infinite" }} /><span style={lb}>{t.hero.badge}</span></div></A>
        <A delay={.12}><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(38px,7vw,78px)", fontWeight: 700, color: "#fff", lineHeight: 1.08, margin: "0 0 22px" }}>{t.hero.title1}{" "}<span style={{ background: "linear-gradient(135deg,#A68D49,#d4b96a,#A68D49)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>{t.hero.titleHighlight}</span></h1></A>
        <A delay={.25}><p style={{ ...bt, fontSize: "clamp(16px,2vw,19px)", maxWidth: 580, margin: "0 auto 44px" }}>{t.hero.subtitle}</p></A>
        <A delay={.38}><div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a onClick={() => { setPage("tours"); window.scrollTo(0, 0); }} style={gBtn(true)} onMouseEnter={hL} onMouseLeave={hR}>{t.hero.cta1}</a>
          <a href="https://api.whatsapp.com/send/?phone=51943539286&text=Hola" target="_blank" rel="noreferrer" style={oBtn} onMouseEnter={hL} onMouseLeave={hR}>💬 {t.hero.cta2}</a>
        </div></A>
        <A delay={.5}><div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 60, flexWrap: "wrap" }}>
          {[["500+", t.hero.stat1], ["9", t.hero.stat2], ["5★", t.hero.stat3]].map(([n, l]) => <div key={l}><div style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: gold, fontWeight: 700 }}>{n}</div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,.35)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{l}</div></div>)}
        </div></A>
      </div>
    </section>
    <section style={{ padding: "100px 24px", background: darkBg }}>
      <div style={maxW}>
        <A><div style={{ textAlign: "center", marginBottom: 56 }}><span style={lb}>{t.featured.label}</span><h2 style={hd()}>{t.featured.title}</h2></div></A>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 22 }}>
          {t.tours.slice(0, 6).map((tour, i) => (
            <A key={tour.id} delay={i * .08}><div onClick={() => { setTour(tour.id); setPage("tour-detail"); window.scrollTo(0, 0); }}
              onMouseEnter={e => { setHov(i); hC(e); }} onMouseLeave={e => { setHov(null); rC(e); }}
              style={{ ...cBg, padding: 28, cursor: "pointer", transform: hov === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hov === i ? "0 16px 48px rgba(0,0,0,.3)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, background: tourGradients[tour.id] }}>{tourEmojis[tour.id]}</div>
                <span style={{ background: "rgba(166,141,73,.12)", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: gold, fontWeight: 600 }}>{tour.duration}</span>
              </div>
              <span style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", letterSpacing: 2, textTransform: "uppercase" }}>{tour.tag}</span>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#fff", margin: "6px 0 10px", fontWeight: 700 }}>{tour.name}</h3>
              <p style={{ ...bt, fontSize: 13, margin: "0 0 22px" }}>{tour.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 18 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: gold, fontWeight: 700 }}>{t.featured.from} {tour.price}</span>
                <span style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: hov === i ? gold : "rgba(255,255,255,.4)", transition: "color .3s" }}>{t.featured.details}</span>
              </div>
            </div></A>
          ))}
        </div>
        <A delay={.3}><div style={{ textAlign: "center", marginTop: 48 }}><a onClick={() => { setPage("tours"); window.scrollTo(0, 0); }} style={oBtn} onMouseEnter={hL} onMouseLeave={hR}>{t.featured.seeAll}</a></div></A>
      </div>
    </section>
    <section style={{ padding: "100px 24px", background: "linear-gradient(180deg,#0a0f07,#0e150a,#0a0f07)" }}>
      <div style={{ ...maxW, maxWidth: 1000 }}>
        <A><div style={{ textAlign: "center", marginBottom: 56 }}><span style={lb}>{t.commitments.label}</span><h2 style={hd()}>{t.commitments.title}</h2></div></A>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 22 }}>
          {t.commitments.items.map((c, i) => <A key={i} delay={i * .1}><div style={{ ...cBg, padding: "30px 22px", textAlign: "center" }} onMouseEnter={hC} onMouseLeave={rC}><div style={{ fontSize: 34, marginBottom: 14 }}>{c.icon}</div><h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: "#fff", margin: "0 0 8px", fontWeight: 600 }}>{c.title}</h4><p style={{ ...bt, fontSize: 13, margin: 0 }}>{c.desc}</p></div></A>)}
        </div>
      </div>
    </section>
    <section style={{ padding: "100px 24px", background: darkBg }}>
      <A><div style={{ ...maxW, maxWidth: 650, textAlign: "center" }}><span style={lb}>{t.cta.label}</span><h2 style={hd()}>{t.cta.title}</h2><p style={{ ...bt, margin: "18px auto 40px", maxWidth: 500 }}>{t.cta.desc}</p>
        <a href="https://api.whatsapp.com/send/?phone=51943539286&text=Hola" target="_blank" rel="noreferrer" style={{ ...gBtn(true), background: "#25D366", boxShadow: "0 4px 24px rgba(37,211,102,.3)" }} onMouseEnter={hL} onMouseLeave={hR}>💬 {t.cta.btn}</a>
      </div></A>
    </section>
  </>;
}

function PageTours({ setPage, setTour }) {
  const t = useLang(); const [f, setF] = useState("all");
  const shown = f === "all" ? t.tours : f === "full" ? t.tours.filter(x => !x.duration.includes("D /") && !x.duration.includes("D/")) : t.tours.filter(x => x.duration.includes("D /") || x.duration.includes("D/"));
  return <section style={{ padding: "140px 24px 100px", background: darkBg, minHeight: "100vh" }}>
    <div style={maxW}>
      <A><div style={{ textAlign: "center", marginBottom: 20 }}><span style={lb}>{t.toursPage.label}</span><h2 style={hd(52)}>{t.toursPage.title}</h2><p style={{ ...bt, maxWidth: 550, margin: "16px auto 0" }}>{t.toursPage.desc}</p></div></A>
      <A delay={.15}><div style={{ display: "flex", justifyContent: "center", gap: 12, margin: "36px 0 48px", flexWrap: "wrap" }}>
        {[["all", t.toursPage.all], ["full", t.toursPage.fullDay], ["multi", t.toursPage.multiDay]].map(([id, l]) => <button key={id} onClick={() => setF(id)} style={{ background: f === id ? gold : "rgba(255,255,255,.05)", color: f === id ? "#0f170c" : "rgba(255,255,255,.6)", border: `1px solid ${f === id ? gold : "rgba(255,255,255,.1)"}`, borderRadius: 8, padding: "10px 24px", fontSize: 12, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "all .3s" }}>{l}</button>)}
      </div></A>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 22 }}>
        {shown.map((tour, i) => <A key={tour.id} delay={i * .07}><div onClick={() => { setTour(tour.id); setPage("tour-detail"); window.scrollTo(0, 0); }} style={{ ...cBg, padding: 28, cursor: "pointer" }} onMouseEnter={e => { hC(e); e.currentTarget.style.transform = "translateY(-6px)"; }} onMouseLeave={e => { rC(e); e.currentTarget.style.transform = "translateY(0)"; }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, background: tourGradients[tour.id] }}>{tourEmojis[tour.id]}</div>
            <div style={{ display: "flex", gap: 8 }}><span style={{ background: "rgba(166,141,73,.12)", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: gold, fontWeight: 600 }}>{tour.duration}</span><span style={{ background: "rgba(255,255,255,.06)", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.5)", fontWeight: 600 }}>{tour.difficulty}</span></div>
          </div>
          <span style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.3)", letterSpacing: 2, textTransform: "uppercase" }}>{tour.tag}</span>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#fff", margin: "6px 0 10px", fontWeight: 700 }}>{tour.name}</h3>
          <p style={{ ...bt, fontSize: 13, margin: "0 0 22px" }}>{tour.desc}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 18 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: gold, fontWeight: 700 }}>{t.featured.from} {tour.price}</span>
            <span style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.4)" }}>{t.featured.details}</span>
          </div>
        </div></A>)}
      </div>
    </div>
  </section>;
}

function PageTourDetail({ tourId, setPage }) {
  const t = useLang(); const td = t.tourDetail;
  const tour = t.tours.find(x => x.id === tourId) || t.tours[0];
  return <section style={{ padding: "120px 24px 100px", background: darkBg, minHeight: "100vh" }}>
    <div style={{ ...maxW, maxWidth: 900 }}>
      <A>
        <a onClick={() => { setPage("tours"); window.scrollTo(0, 0); }} style={{ ...bt, fontSize: 13, cursor: "pointer", color: gold, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>{td.back}</a>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, background: tourGradients[tour.id] }}>{tourEmojis[tour.id]}</div>
          <div><span style={{ ...lb, fontSize: 11 }}>{tour.tag}</span><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,5vw,44px)", color: "#fff", fontWeight: 700, margin: 0 }}>{tour.name}</h1></div>
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          {[`⏱ ${tour.duration}`, `📍 ${tour.altitude}`, `👥 ${tour.groupSize}`, `⚡ ${tour.difficulty}`].map(x => <span key={x} style={{ background: "rgba(255,255,255,.05)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)" }}>{x}</span>)}
        </div>
        <p style={{ ...bt, fontSize: 16, marginBottom: 48 }}>{tour.longDesc}</p>
      </A>
      <A delay={.1}><div style={{ ...cBg, padding: 36, marginBottom: 28 }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#fff", margin: "0 0 24px", fontWeight: 700 }}>{td.itinerary}</h3>
        {tour.itinerary.map((s, i) => <div key={i} style={{ display: "flex", gap: 18, marginBottom: i < tour.itinerary.length - 1 ? 20 : 0, paddingBottom: i < tour.itinerary.length - 1 ? 20 : 0, borderBottom: i < tour.itinerary.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: gold, fontWeight: 700, minWidth: 70, whiteSpace: "nowrap" }}>{s.time}</span>
          <span style={{ ...bt, fontSize: 14, margin: 0 }}>{s.text}</span>
        </div>)}
      </div></A>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22, marginBottom: 28 }}>
        <A delay={.18}><div style={{ ...cBg, padding: 32 }}><h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#fff", margin: "0 0 20px", fontWeight: 700 }}>{td.includes}</h3>
          {tour.includes.map((x, i) => <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}><span style={{ color: "#4CAF50", fontSize: 14, marginTop: 2 }}>✓</span><span style={{ ...bt, fontSize: 14, margin: 0 }}>{x}</span></div>)}</div></A>
        <A delay={.24}><div style={{ ...cBg, padding: 32 }}><h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#fff", margin: "0 0 20px", fontWeight: 700 }}>{td.notIncludes}</h3>
          {tour.notIncludes.map((x, i) => <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}><span style={{ color: "#e74c3c", fontSize: 14, marginTop: 2 }}>✗</span><span style={{ ...bt, fontSize: 14, margin: 0 }}>{x}</span></div>)}</div></A>
      </div>
      <A delay={.3}><div style={{ ...cBg, padding: 36, textAlign: "center", borderColor: "rgba(166,141,73,.2)", background: "rgba(166,141,73,.04)" }}>
        <span style={lb}>{td.priceLabel}</span>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, color: gold, fontWeight: 700, margin: "12px 0 8px" }}>{t.featured.from} {tour.price}</div>
        <p style={{ ...bt, fontSize: 13, marginBottom: 28 }}>{td.priceNote}</p>
        <a href={`https://api.whatsapp.com/send/?phone=51943539286&text=${encodeURIComponent(td.whatsappMsg + " " + tour.name)}`} target="_blank" rel="noreferrer" style={{ ...gBtn(true), background: "#25D366", boxShadow: "0 4px 24px rgba(37,211,102,.3)" }} onMouseEnter={hL} onMouseLeave={hR}>💬 {td.reserveBtn}</a>
      </div></A>
    </div>
  </section>;
}

function PageNosotros() {
  const t = useLang(); const a = t.about;
  return <section style={{ padding: "140px 24px 100px", background: darkBg, minHeight: "100vh" }}>
    <div style={{ ...maxW, maxWidth: 950 }}>
      <A><div style={{ textAlign: "center", marginBottom: 60 }}><span style={lb}>{a.label}</span><h2 style={hd(52)}>{a.title}</h2></div></A>
      <A delay={.1}><div style={{ ...cBg, padding: 40, marginBottom: 28 }}>{a.paragraphs.map((p, i) => <p key={i} style={{ ...bt, fontSize: 16, marginBottom: i < a.paragraphs.length - 1 ? 20 : 0 }}>{p}</p>)}</div></A>
      <A delay={.2}><h3 style={{ ...hd(28), textAlign: "center", marginBottom: 32, marginTop: 48 }}>{a.valuesTitle}</h3></A>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 20, marginBottom: 56 }}>
        {a.values.map((v, i) => <A key={i} delay={.25 + i * .08}><div style={{ ...cBg, padding: "28px 20px", textAlign: "center" }} onMouseEnter={hC} onMouseLeave={rC}><div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div><h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", margin: "0 0 8px", fontWeight: 600 }}>{v.title}</h4><p style={{ ...bt, fontSize: 12, margin: 0 }}>{v.desc}</p></div></A>)}
      </div>
      <A delay={.15}><h3 style={{ ...hd(28), textAlign: "center", marginBottom: 32, marginTop: 48 }}>{a.teamTitle}</h3></A>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 20 }}>
        {a.team.map((m, i) => <A key={i} delay={.2 + i * .08}><div style={{ ...cBg, padding: 28, textAlign: "center" }} onMouseEnter={hC} onMouseLeave={rC}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,rgba(166,141,73,.2),rgba(166,141,73,.05))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, margin: "0 auto 16px", border: "2px solid rgba(166,141,73,.2)" }}>{m.emoji}</div>
          <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", margin: "0 0 4px", fontWeight: 600 }}>{m.name}</h4>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: gold }}>{m.role}</span><p style={{ ...bt, fontSize: 12, margin: "8px 0 0" }}>{m.exp}</p></div></A>)}
      </div>
      <A delay={.3}><div style={{ ...cBg, padding: 36, marginTop: 56, textAlign: "center" }}><h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "#fff", margin: "0 0 16px", fontWeight: 700 }}>{a.legalTitle}</h3><p style={bt}>{a.legalDesc}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20, flexWrap: "wrap" }}>{a.legalBadges.map(b => <span key={b} style={{ background: "rgba(166,141,73,.1)", border: "1px solid rgba(166,141,73,.2)", borderRadius: 8, padding: "10px 20px", fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: gold, fontWeight: 600 }}>{b}</span>)}</div>
      </div></A>
    </div>
  </section>;
}

function PageMedia() {
  const t = useLang(); const m = t.mediaPage; const g = t.gallery;
  const [f, setF] = useState(m.all); const cats = [m.all, ...new Set(g.map(x => x.cat))];
  const shown = f === m.all ? g : g.filter(x => x.cat === f);
  return <section style={{ padding: "140px 24px 100px", background: darkBg, minHeight: "100vh" }}>
    <div style={maxW}>
      <A><div style={{ textAlign: "center", marginBottom: 20 }}><span style={lb}>{m.label}</span><h2 style={hd(52)}>{m.title}</h2><p style={{ ...bt, maxWidth: 500, margin: "16px auto 0" }}>{m.desc}</p></div></A>
      <A delay={.1}><div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "32px 0 44px", flexWrap: "wrap" }}>
        {cats.map(c => <button key={c} onClick={() => setF(c)} style={{ background: f === c ? gold : "rgba(255,255,255,.05)", color: f === c ? "#0f170c" : "rgba(255,255,255,.6)", border: `1px solid ${f === c ? gold : "rgba(255,255,255,.1)"}`, borderRadius: 8, padding: "8px 18px", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1, textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "all .3s" }}>{c}</button>)}
      </div></A>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
        {shown.map((x, i) => <A key={x.title} delay={i * .06}><div style={{ ...cBg, overflow: "hidden", aspectRatio: "4/3" }} onMouseEnter={hC} onMouseLeave={rC}>
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,rgba(166,141,73,.08),rgba(40,60,30,.15))` }}>
            <span style={{ fontSize: 56, marginBottom: 16 }}>{x.emoji}</span><h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", margin: 0, fontWeight: 600, textAlign: "center", padding: "0 16px" }}>{x.title}</h4><span style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: gold, letterSpacing: 1, marginTop: 6 }}>{x.cat}</span>
          </div></div></A>)}
      </div>
      <A delay={.2}><div style={{ ...cBg, padding: 48, marginTop: 56, textAlign: "center" }}><span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>🎬</span><h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "#fff", margin: "0 0 12px", fontWeight: 700 }}>{m.videoTitle}</h3><p style={{ ...bt, marginBottom: 28 }}>{m.videoDesc}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>{["📘 Facebook", "📸 Instagram", "🎵 TikTok"].map(n => <a key={n} href="#" style={oBtn} onMouseEnter={hL} onMouseLeave={hR}>{n}</a>)}</div>
      </div></A>
    </div>
  </section>;
}

function PageContacto() {
  const t = useLang(); const c = t.contact; const [sent, setSent] = useState(false);
  return <section style={{ padding: "140px 24px 100px", background: darkBg, minHeight: "100vh" }}>
    <div style={{ ...maxW, maxWidth: 900 }}>
      <A><div style={{ textAlign: "center", marginBottom: 56 }}><span style={lb}>{c.label}</span><h2 style={hd(48)}>{c.title}</h2><p style={{ ...bt, maxWidth: 500, margin: "16px auto 0" }}>{c.desc}</p></div></A>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28 }}>
        <A delay={.1}><div style={{ ...cBg, padding: 36 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "#fff", margin: "0 0 24px", fontWeight: 700 }}>{c.formTitle}</h3>
          {!sent ? <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[[c.name, "text"], [c.email, "email"], [c.subject, "text"]].map(([ph, ty]) => <input key={ph} type={ty} placeholder={ph} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "14px 18px", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none" }} onFocus={e => e.target.style.borderColor = "rgba(166,141,73,.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"} />)}
            <textarea placeholder={c.message} rows={4} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "14px 18px", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", resize: "vertical" }} onFocus={e => e.target.style.borderColor = "rgba(166,141,73,.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"} />
            <button onClick={() => setSent(true)} style={gBtn(true)} onMouseEnter={hL} onMouseLeave={hR}>{c.send}</button>
          </div> : <div style={{ textAlign: "center", padding: 40 }}><span style={{ fontSize: 48 }}>✅</span><p style={{ ...bt, fontSize: 16, margin: "16px 0 0", color: "#4CAF50" }}>{c.sent}</p></div>}
        </div></A>
        <A delay={.2}><div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ ...cBg, padding: 28 }} onMouseEnter={hC} onMouseLeave={rC}><h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", margin: "0 0 16px", fontWeight: 600 }}>{c.whatsappTitle}</h4>
            <a href="https://api.whatsapp.com/send/?phone=51943539286&text=Hola" target="_blank" rel="noreferrer" style={{ ...gBtn(), background: "#25D366", width: "100%", justifyContent: "center" }} onMouseEnter={hL} onMouseLeave={hR}>+51 943 539 286</a></div>
          <div style={{ ...cBg, padding: 28 }} onMouseEnter={hC} onMouseLeave={rC}><h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", margin: "0 0 10px", fontWeight: 600 }}>{c.emailTitle}</h4><p style={{ ...bt, fontSize: 14, margin: 0 }}>info@greengoldencusco.com</p><p style={{ ...bt, fontSize: 14, margin: "4px 0 0" }}>reservas@greengoldencusco.com</p></div>
          <div style={{ ...cBg, padding: 28 }} onMouseEnter={hC} onMouseLeave={rC}><h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", margin: "0 0 10px", fontWeight: 600 }}>{c.addressTitle}</h4><p style={{ ...bt, fontSize: 14, margin: 0 }}>Urb. San Antonio H5-4</p><p style={{ ...bt, fontSize: 14, margin: "4px 0 0" }}>San Sebastián, Cusco, Perú</p></div>
          <div style={{ ...cBg, padding: 28 }} onMouseEnter={hC} onMouseLeave={rC}><h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", margin: "0 0 10px", fontWeight: 600 }}>{c.hoursTitle}</h4><p style={{ ...bt, fontSize: 14, margin: 0 }}>{c.hours1}</p><p style={{ ...bt, fontSize: 14, margin: "4px 0 0" }}>{c.hours2}</p></div>
          <div style={{ ...cBg, padding: 28 }} onMouseEnter={hC} onMouseLeave={rC}><h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#fff", margin: "0 0 14px", fontWeight: 600 }}>{c.socialTitle}</h4>
            <div style={{ display: "flex", gap: 10 }}>{["Facebook", "Instagram", "TikTok"].map(s => <a key={s} href="#" style={{ background: "rgba(255,255,255,.06)", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)", textDecoration: "none", transition: "all .3s" }} onMouseEnter={e => { e.target.style.color = gold; e.target.style.background = "rgba(166,141,73,.1)"; }} onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,.6)"; e.target.style.background = "rgba(255,255,255,.06)"; }}>{s}</a>)}</div></div>
        </div></A>
      </div>
    </div>
  </section>;
}

function Footer({ setPage }) {
  const t = useLang(); const f = t.footer;
  return <footer style={{ background: darkerBg, borderTop: "1px solid rgba(255,255,255,.05)", padding: "56px 24px 32px" }}>
    <div style={{ ...maxW, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 40 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}><span style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Playfair Display',serif", color: gold }}>GG</span><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)" }}>Green Golden Cusco</span></div>
        <p style={{ ...bt, fontSize: 13 }}>{f.desc}</p>
      </div>
      <div>
        <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{f.menu}</h4>
        {["inicio", "tours", "nosotros", "media", "contacto"].map(p => <a key={p} onClick={() => { setPage(p); window.scrollTo(0, 0); }} style={{ display: "block", ...bt, fontSize: 13, textDecoration: "none", marginBottom: 8, cursor: "pointer" }}>{t.nav[p]}</a>)}
      </div>
      <div>
        <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{f.popularTours}</h4>
        {t.tours.slice(0, 4).map(x => <span key={x.id} style={{ display: "block", ...bt, fontSize: 13, marginBottom: 8 }}>{x.name}</span>)}
      </div>
      <div>
        <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{f.contactLabel}</h4>
        <p style={{ ...bt, fontSize: 13, marginBottom: 6 }}>📞 +51 943 539 286</p><p style={{ ...bt, fontSize: 13, marginBottom: 6 }}>📧 info@greengoldencusco.com</p><p style={{ ...bt, fontSize: 13 }}>📍 San Sebastián, Cusco</p>
      </div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,.2)" }}>© 2026 Green Golden Cusco. {f.rights}</span>
      <div style={{ display: "flex", gap: 16 }}>{[f.terms, f.complaints].map(l => <a key={l} href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,.25)", textDecoration: "none" }}>{l}</a>)}</div>
    </div>
  </footer>;
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = useState("inicio");
  const [tourId, setTourId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const lk = document.createElement("link"); lk.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=DM+Sans:wght@400;500;600;700&display=swap"; lk.rel = "stylesheet"; document.head.appendChild(lk);
    const st = document.createElement("style"); st.textContent = `@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:#0a0f07;overflow-x:hidden}::selection{background:rgba(166,141,73,.3);color:#fff}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0a0f07}::-webkit-scrollbar-thumb{background:#A68D49;border-radius:3px}@media(max-width:768px){.dNav{display:none!important}.mNav{display:flex!important}}input::placeholder,textarea::placeholder{color:rgba(255,255,255,.3)}`; document.head.appendChild(st);
    const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  const t = translations[lang];
  const render = () => {
    switch (page) {
      case "inicio": return <PageInicio setPage={setPage} setTour={setTourId} />;
      case "tours": return <PageTours setPage={setPage} setTour={setTourId} />;
      case "tour-detail": return <PageTourDetail tourId={tourId} setPage={setPage} />;
      case "nosotros": return <PageNosotros />;
      case "media": return <PageMedia />;
      case "contacto": return <PageContacto />;
      default: return <PageInicio setPage={setPage} setTour={setTourId} />;
    }
  };

  return (
    <LangCtx.Provider value={t}>
      <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
        <Navbar page={page} setPage={setPage} scrolled={scrolled} lang={lang} setLang={setLang} />
        {render()}
        <Footer setPage={setPage} />
      </div>
    </LangCtx.Provider>
  );
}
