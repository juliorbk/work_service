# Design System: WORK services Corporate Portal

**Project ID:** 7008125377203995348

## 1. Visual Theme & Atmosphere

Warm, sophisticated, and premium corporate aesthetic. The palette is inspired by earthy terracotta and warm neutrals, conveying trust, stability, and refined professionalism. The visual language is clean and minimal with generous whitespace, subtle shadows, and deliberate use of negative space to create a calm, premium atmosphere.

## 2. Color Palette & Roles

### Primary Family (Warm Terracotta)
- **Primary Container (`#ED9121`)** — Main interactive elements, primary CTAs, active states, icon accents
- **Primary (`#8b5000`)** — Hover states for primary container buttons, emphasized text
- **On Primary (`#ffffff`)** — Text/icon on primary backgrounds
- **On Primary Container (`#5a3200`)** — Text on primary container backgrounds
- **Primary Fixed (`#ffdcbe`)** — Light primary tint for subtle highlights
- **Primary Fixed Dim (`#ffb871`)** — Muted primary variation
- **Inverse Primary (`#ffb871`)** — Primary on dark surfaces
- **On Primary Fixed (`#2d1600`)** — Text on primary fixed
- **On Primary Fixed Variant (`#6a3c00`)** — Text on primary fixed variant

### Secondary Family (Slate Blue-Gray)
- **Secondary (`#4f606e`)** — Secondary text, secondary buttons, body copy, subtle UI elements
- **Secondary Container (`#d0e2f3`)** — Secondary background surfaces
- **On Secondary (`#ffffff`)** — Text on secondary
- **On Secondary Container (`#546573`)** — Text on secondary container
- **Secondary Fixed (`#d3e5f5`)** — Light secondary tint
- **Secondary Fixed Dim (`#b7c9d9`)** — Muted secondary variation
- **On Secondary Fixed (`#0b1d29`)** — Text on secondary fixed
- **On Secondary Fixed Variant (`#384956`)** — Text on secondary fixed variant

### Surface Family (Warm Neutrals)
- **Surface / Background (`#fff8f5`)** — Main page background
- **Surface Bright (`#fff8f5`)** — Bright surface variant
- **Surface Container Lowest (`#ffffff`)** — Cards, elevated surfaces
- **Surface Container Low (`#fff1e7`)** — Subtle container background
- **Surface Container (`#fcebde`)** — Section backgrounds, containers
- **Surface Container High (`#f6e5d9`)** — Higher elevation surfaces
- **Surface Container Highest (`#f0dfd3`)** — Highest elevation surfaces
- **Surface Variant (`#f0dfd3`)** — Variant surfaces
- **Surface Dim (`#e7d7cb`)** — Dimmed surface
- **On Surface (`#221a13`)** — Primary text, headings, high-emphasis content
- **On Surface Variant (`#544435`)** — Medium-emphasis text
- **Inverse Surface (`#382f26`)** — Dark surface for inverted sections
- **Inverse On Surface (`#ffeee1`)** — Text on inverse surface
- **Surface Tint (`#8b5000`)** — Surface tint overlay

### Tertiary Family (Bright Cyan)
- **Tertiary (`#00668a`)** — Tertiary accents
- **Tertiary Container (`#00b3f0`)** — Accent elements, highlights, info badges
- **Tertiary Fixed (`#c4e7ff`)** — Light tertiary tint
- **Tertiary Fixed Dim (`#7bd0ff`)** — Muted tertiary variation
- **On Tertiary (`#ffffff`)** — Text on tertiary
- **On Tertiary Container (`#00415a`)** — Text on tertiary container
- **On Tertiary Fixed (`#001e2c`)** — Text on tertiary fixed
- **On Tertiary Fixed Variant (`#004c69`)** — Text on tertiary fixed variant

### Outline & Border Family
- **Outline (`#877463`)** — Primary borders, dividers
- **Outline Variant (`#dac2af`)** — Subtle borders, card borders, input borders

### Feedback Family
- **Error (`#ba1a1a`)** — Error states
- **Error Container (`#ffdad6`)** — Error background
- **On Error (`#ffffff`)** — Text on error
- **On Error Container (`#93000a`)** — Text on error container

## 3. Typography Rules

### Font Family
- **Base**: `Inter` (all variants — display, headline, body, label)
- **Monospace**: `Inter` (mono variant for code if needed)

### Type Scale
| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| Display Large | 48px | Bold (700) | 1.1 | -0.02em | Hero headlines, major section titles |
| Display Large Mobile | 32px | Bold (700) | 1.2 | -0.02em | Hero headlines on mobile |
| Headline Medium | 24px | Semi-bold (600) | 1.3 | -0.01em | Section headers, card titles |
| Headline Small | 20px | Semi-bold (600) | 1.4 | normal | Subsection headers |
| Body Large | 18px | Regular (400) | 1.6 | normal | Lead paragraphs, featured text |
| Body Medium | 16px | Regular (400) | 1.5 | normal | Body copy, general content |
| Body Small | 14px | Regular (400) | 1.5 | normal | Secondary text, captions |
| Label Medium | 14px | Semi-bold (600) | 1 | 0.05em | Button labels, nav items, badges |
| Label Small | 12px | Medium (500) | 1 | normal | Small tags, metadata |

## 4. Component Stylings

### Buttons
- **Primary CTA**: Background `primary-container` (#ED9121), text `on-primary` (#fff), rounded-DEFAULT (4px), padding 12-16px vertical
- **Primary Hover**: Background `primary` (#8b5000), scale(1.05) transform, shadow lift
- **Secondary/Outline**: Transparent bg, border `outline` (#877463), text `secondary`, hover: border `primary`
- **Shape**: Slightly squared (4px radius) — clean, precise, professional
- **Micro-interaction**: Scale up on hover with cubic-bezier(0.34, 1.56, 0.64, 1) easing

### Navigation
- **Style**: Sticky top, bg `surface`, border-bottom `outline-variant`, shadow-sm
- **Height**: 80px (h-20) desktop
- **Logo**: Centered left, max 48px height
- **Nav links**: `body-medium` weight, `secondary` color, active link has bottom border in `primary`
- **Scrolled state**: Backdrop-blur(12px), bg at 90% opacity, height reduces

### Cards
- **Default**: bg `surface-container-lowest` (#fff), border `outline-variant` (#dac2af), rounded-lg (8px), padding stack-lg (32px)
- **Hover**: translateY(-8px) scale(1.02), shadow elevation, border transitions to `primary-container`
- **Featured/Premium**: Border-2 `primary-container`, subtle shadow with `primary-container` tint

### Form Inputs
- **Default**: Transparent bg, border `outline-variant`, rounded-DEFAULT (4px)
- **Focus**: Border `primary-container`, ring-1 `primary-container`
- **Labels**: `label-sm` styling, `secondary` color

### Containers
- **Section padding**: py-section-gap (80px)
- **Content max-width**: 1280px (container-max)
- **Desktop margin**: 40px horizontal
- **Mobile margin**: 16px horizontal
- **Gutter (grid gap)**: 24px

## 5. Layout Principles

- **Whitespace strategy**: Generous and deliberate — 80px section gaps, 32px card padding, 24px grid gutters
- **Content width**: Max 1280px centered, with 40px edge padding on desktop
- **Grid**: 12-column implicit grid using 3-column and 2-column sub-grids
- **Hierarchy**: Clear visual weight through size, color (on-surface vs secondary), and spacing
- **Animation**: Subtle scroll reveals (opacity + translateY), hover lifts, parallax for hero imagery
- **Elevation**: Flat design philosophy with whisper-soft shadows for depth; cards use subtle border separation rather than heavy shadows
