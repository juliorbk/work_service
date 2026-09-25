# Work Service Platform - Complete Frontend Documentation

## Overview
Work Service is a premium corporate space rental platform featuring a sophisticated, minimalist aesthetic. The platform includes a customer-facing landing page (`/`), a multi-step booking flow (`/booking`), an admin dashboard (`/admin`) and legal pages (`/privacidad`, `/terminos`). Reservations are handled without a backend: booking requests are sent via WhatsApp deep links or email (`mailto`).

## Design System

### Color Palette
- **Primary CTA**: `#d99414` (Gold) - Used for all conversion actions
- **Accent**: `#bf3e21` (Terracotta) - Secondary accent color
- **Background**: `#f2f2f2` (Light gray) - Neutral surfaces
- **Text/Structure**: `#536173` (Slate) - Professional typography
- **Surfaces**: Material 3 container scales (`--surface-container-*`)

### Typography
- **Headings**: Montserrat (700/800), `tracking-tight`
- **Body**: Quicksand (400-700), `leading-relaxed`

### Spacing & Shapes
- **Extreme Whitespace**: `py-24`, `gap-16` to symbolize luxury
- **Input/Button Radius**: 8px (`rounded`)
- **Card Radius**: 16px (`rounded-2xl`)

### Interactions
- **Transitions**: Slow, deliberate (300ms ease-in-out)
- **Hover Effects**: Subtle border color shift to primary or low-opacity shadow

## Project Structure

```
app/
├── page.tsx                        # Landing page (home)
├── booking/
│   └── page.tsx                    # Booking flow
├── admin/
│   └── page.tsx                    # Admin dashboard
├── privacidad/
│   └── page.tsx                    # Política de privacidad
└── terminos/
    └── page.tsx                    # Términos y condiciones

components/work-service/
├── hero.tsx                        # Hero section with CTAs
├── spaces-coverflow.tsx            # Spaces showcase with 3D cards
├── space-details-modal.tsx         # Per-space detail modal
├── events-section.tsx              # Video gallery (paid sponsors) + Reel oficial
├── publish-event-cta.tsx           # Banner to sell ad space
├── gallery-section.tsx             # Photo gallery carousel
├── booking-flow.tsx                # Multi-step booking (3 steps)
├── admin-dashboard.tsx             # Admin operations center
├── whatsapp.ts                     # WhatsApp/mail message builders
├── whatsapp-booking-dialog.tsx     # Booking modal → WhatsApp
├── whatsapp-float-button.tsx       # Floating WhatsApp CTA
├── yoko-widget.tsx                 # Chat concierge (DISABLED by default)
└── footer.tsx                       # Work Service footer
```

## Key Features

### 1. Landing Page (`/work-service`)

#### Hero Section
- Powerful headline: "Executive Workspaces Built for Excellence"
- Subheadline about premium corporate environments
- Orange "Book Now" CTA and secondary "View Spaces" button
- Stats bar: 50+ Premium Spaces, 1000+ Corporate Clients, 100% Client Satisfaction

#### Services Showcase
3-column grid displaying:
- **Coworking Spaces** ($45/day)
  - High-speed internet, Climate control, Meeting access, Professional ambiance
  - Capacity: Desks for 1-10 professionals
  
- **Meeting Rooms** ($150/hour)
  - 4K video conferencing, Premium audio system, Whiteboard technology, Secure & private
  - Capacity: 4-20 people
  
- **Seminar Halls** ($500-2000/event)
  - Full event setup, Professional AV suite, Catering services, Flexible layout options
  - Capacity: 50-500 people

#### Booking CTA Section
- "Ready to reserve your space?" headline
- Feature list: Instant confirmation, Flexible cancellation, 24/7 support
- Stats boxes: 30s average booking time, 100% satisfaction, 24/7 availability

#### Footer
- Brand messaging
- Links: Services, Company, Legal sections
- Logout button placeholder for integration

### 2. Booking Flow (`/work-service/booking`)

**Multi-step reservation interface with 3 steps:**

#### Step 1: Space Selection
- Card-based UI for each space type (Coworking Desk, Meeting Room, Seminar Hall)
- Displays pricing and descriptions
- Clicking any card advances to Step 2

#### Step 2: Date & Time Selection
- **Calendar Grid**: 14-day date picker with day names and dates
- **Time Slots**: 09:00, 11:00, 14:00, 16:00
- **Duration Options**: 1 hour, 2 hours, 4 hours, Full day
- Selected options highlighted in orange
- Back/Continue navigation

#### Step 3: Review & Confirmation
- **Left Panel**: Booking details (space type, date, time, duration)
- **Right Panel**: Price summary with itemization
  - Base Rate: $150.00
  - Service Fee: $15.00
  - **Total: $165.00** (orange highlight)
- Back/Confirm Booking buttons

### 3. Admin Dashboard (`/work-service/admin`)

#### Sidebar Navigation
- Dark slate background (#4f606e)
- Navigation items:
  - Dashboard (active, orange highlight)
  - Bookings
  - Spaces
  - Clients
  - Settings
- Logout button at bottom

#### Dashboard Content

**Statistics Grid** (4 columns):
- Total Bookings: 247 (This month)
- Active Clients: 89 (Registered users)
- Occupancy Rate: 66% (Average utilization, orange)
- Revenue: $42.5K (This month)

**Space Occupancy Section**:
- Progress bars for each space type
- Real-time occupancy metrics:
  - Coworking Spaces: 28/40 (70% occupied)
  - Meeting Rooms: 5/8 (62% occupied)
  - Seminar Halls: 2/3 (67% occupied)

**Recent Bookings Table**:
Displays booking data with columns:
- Client name
- Space type
- Date
- Time
- Duration
- Status badge (Confirmed/Pending/Completed with color-coding)
- Action menu

**Status Badges**:
- Confirmed: Green badge
- Pending: Yellow badge
- Completed: Blue badge

## Responsive Design

All components are fully responsive with:
- Mobile-first approach
- Flexible grid layouts that collapse on smaller screens
- Touch-friendly buttons and interactive elements
- Responsive typography scaling

## Integration Points

The frontend is designed for seamless backend integration:

### Booking Flow
- Backend will receive: space type, date, time, duration
- Should return: booking confirmation, payment processing

### Admin Dashboard
- APIs needed:
  - `/api/bookings` - List and manage reservations
  - `/api/spaces` - Space availability and occupancy
  - `/api/clients` - Client management
  - `/api/stats` - Dashboard metrics and occupancy data

### User Authentication
- Navigation includes "Sign In" button (currently placeholder)
- Admin dashboard should be protected with authentication
- Support for logout functionality

## Design Tokens in CSS

Key design tokens available for use:
- `--primary`: #ED9121
- `--background`: #fff8f5
- `--foreground`: #4f606e
- `--secondary`: #516270
- `--accent`: #00b3f0
- `--muted`: Light gray backgrounds
- `--border`: Border colors

## Component Usage

### Key Components Used
- **Button**: Primary, outline, and disabled states
- **Card**: For service/booking cards with hover effects
- **Badge**: For status indicators
- **Icons**: Lucide React icons for UI elements

### Modular Architecture
Each section is a standalone component:
- Independent of others
- Easy to maintain and update
- Can be reused across pages
- Clean separation of concerns

## Next Steps for Backend Integration

1. **Authentication**: Implement login/signup for users and admin
2. **Database Schema**: Create tables for bookings, spaces, clients, occupancy
3. **API Routes**: Build endpoints for CRUD operations
4. **Payment Processing**: Integrate payment gateway for checkout
5. **Real-time Updates**: WebSocket for live occupancy updates
6. **Email Notifications**: Booking confirmations and reminders
7. **Admin Features**: Space management, pricing configuration, client management

## Customization Guide

### Changing Colors
Update design tokens in `/app/globals.css` to match your brand:
```css
--primary: your-color;
--background: your-color;
--foreground: your-color;
```

### Adding More Spaces
Modify the `services` array in `components/work-service/services-showcase.tsx`

### Adjusting Booking Time Slots
Update the time array in `components/work-service/booking-flow.tsx`

### Customizing Dashboard Widgets
Edit `components/work-service/admin-dashboard.tsx` to modify stats, occupancy data, or bookings table

## File Paths

- Landing Page: `/app/page.tsx`
- Booking Page: `/app/booking/page.tsx`
- Admin Page: `/app/admin/page.tsx`
- Legal Pages: `/app/privacidad/page.tsx`, `/app/terminos/page.tsx`
- Content/Config: `/lib/site-config.ts` (brand, pricing, FAQ, events)
- Components: `/components/work-service/`, `/components/landing/`

## Modelo comercial: Eventos como espacio publicitario de pago

La galería de videos (**Eventos Destacados**) es un espacio publicitario:
una empresa paga para que su video aparezca. El **reel oficial** de Work
Services se muestra como video destacado fijo arriba de la galería, sin sponsor.

> El bloque de agenda/calendario de eventos (`UpcomingEventsSection`) está
> **descartado temporalmente** (se quitó de la landing y se eliminaron
> `UPCOMING_EVENTS` y `UpcomingEvent` de `lib/site-config.ts`).

### Dónde vive la data
- **Galería de videos** → `EVENTS` en `components/work-service/events-section.tsx`
  (requiere `sponsor`). El reel usa `reel.mp4` / `reel.jpg` en `public/videos/gallery/`.

Regla: **sin `sponsor` no se publica** — solo aparece lo que se cobra.

### UX / UI
- Badge dorado **"Patrocinado por {empresa}"** en tarjetas y modal.
- CTA de cada evento apunta a **WhatsApp de Work Services** con mensaje prellenado
  (evento + sponsor), para que Work Services capture el lead.
- Banner de venta **"¿Quieres publicar tu evento aquí?"** al pie de ambas secciones
  (componente `PublishEventCta`) → WhatsApp para cotizar.

### Métricas
- `@vercel/analytics` (`track`): `event_view`, `event_click`, `event_select`,
  `advertise_cta_click` — cada uno con `{ title, sponsor, section }`. Sirve de
  evidencia de impresiones/clics para reportar a los anunciantes.

## Performance Considerations

- All components use React hooks for efficient state management
- Optimized re-renders with conditional rendering
- Smooth animations with CSS transitions
- Responsive images with Next.js Image component (where applicable)

---

**Built with**: Next.js 16, React 19, Tailwind CSS 4, HeroUI, Lucide React Icons

**Status**: Production landing page. Reservations are handled via WhatsApp/email (no backend).
The admin panel (`/admin`) shows example data and is optionally protected with HTTP Basic
Auth by setting the `ADMIN_PASSWORD` env var. The Yoko chat concierge remains **disabled**
until its backend is deployed (enable with `NEXT_PUBLIC_YOKO_ENABLED=true`).

---

## Bitácora de cambios

### 2026-09-24 — Fix de SEO (auditoría + implementación)

**Dominio:** https://www.workservice.site

**Críticos (indexación y seguridad):**
- `/admin` convertido a server page con metadata `noindex, nofollow, nocache`; se requiere `ADMIN_PASSWORD` en producción (sin ella queda público).
- Creado `app/robots.ts`: permite el rastreo, bloquea `/admin` y referencia el sitemap.
- Creado `app/sitemap.ts`: `/`, `/booking`, `/privacidad`, `/terminos`.
- `metadataBase` global en `app/layout.tsx` con el dominio oficial y canonical autoconsistente en `/`.
- Eliminado `public/videos/gallery/reel.MOV` (91,8 MB sin referencias).

**Alto impacto (rankings):**
- Schema JSON-LD nuevo: `LocalBusiness` (NAP, horario 24/7, `sameAs`, `makesOffer` con los 4 espacios reservables y precios) y `FAQPage` (9 preguntas desde `lib/site-config.ts`). Fuentes: `lib/seo/schema.ts` y `components/seo/json-ld.tsx`, insertados en la home.
- `og:image` y Twitter Card (`summary_large_image`) con foto real de las instalaciones.
- Título corto y posicionado: "Coworking y Oficinas en Maracaibo | Work Services" + template de marca (`%s | Work Services`).
- Description acortada a ~140 caracteres con keyword y llamada a la acción.

**On-page:**
- `/booking` con metadata propia + canonical y un único `<h1>`.
- `/privacidad` y `/terminos` con canonical y títulos limpios (la marca la agrega el template).
- `/` con canonical propio (`https://www.workservice.site/`).
- Hero: en móvil se reemplazó el video autoplay (1,4 MB) por el poster estático; el video ambient quedó solo para escritorio.

**Pendientes:**
- Publicar dirección física completa (calle/edificio) en la landing para completar el schema `LocalBusiness` y el Google Business Profile.
- Verificar en Search Console: propiedad de `workservice.site`, enviar `sitemap.xml`, revisar cobertura y CWV de campo.
- Comprimir `reel.mp4` (12,3 MB) y `publicidad-eventos.mp4` (10,9 MB).
