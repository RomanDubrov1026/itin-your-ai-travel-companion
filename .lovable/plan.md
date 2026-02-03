
# Itin — AI Trip Planner (Phase 1: Core Flow)

## Overview
Build a responsive, mobile-first trip planning wizard with the dark/blue glassmorphism design from your mockup. This phase covers the complete user journey: Landing → 3-step wizard → Results page.

---

## Design System

**Visual Style (matching mockup):**
- Dark blue gradient background (`#0f172a` → `#1e3a5a`)
- Glassmorphism cards with blur, subtle white borders, soft shadows
- Lime-green primary buttons (`#a3e635`) with subtle glow
- Clean white/gray typography on dark backgrounds
- Rounded corners on all interactive elements

**UI Components:**
- Custom glass card component with backdrop blur
- Lime CTA button variant
- Progress stepper for wizard navigation
- Styled form inputs with dark theme

---

## Pages & Features

### 1. Landing Page (`/`)
- **Header:** "Itin" brand text + hamburger menu icon
- **Hero:** "Podróż. Zaplanowana." headline with subtext
- **CTA:** Lime-green "Stwórz plan podróży" button
- **Features:** Transport • Hotel • Atrakcje • Budżet bullets
- **Credibility:** "Graph-RAG • AI • 40 języków" microcopy
- **Background:** Dark gradient with decorative city image

### 2. Step 1 — Destination (`/plan/step-1`)
- **Title:** "Dokąd chcesz pojechać?"
- **Fields:**
  - Destination autocomplete (Barcelona, Rome, Paris, Lisbon, Prague)
  - Origin city input
  - Date range picker (start + end)
  - Flexibility selector (Sztywne / Elastyczne)
  - Travelers count (1–10)
- **Navigation:** Back arrow, Next button (disabled until valid)

### 3. Step 2 — Interests (`/plan/step-2`)
- **Title:** "Co jest dla Ciebie ważne?"
- **Multi-select checkboxes:** Jedzenie, Architektura, Muzea, Spokojne tempo, Nightlife, Natura
- **Pace selector:** Chill / Balanced / Intensive
- **Navigation:** Back/Next buttons

### 4. Step 3 — Budget (`/plan/step-3`)
- **Title:** "Budżet i preferencje"
- **Fields:**
  - Budget range slider (displays "Budżet: 3 000 – 4 000 zł")
  - Accommodation type (Apartment / Hotel / Any)
  - Hotel quality (3★ / 4★ / 5★ / Any)
  - Transport preference (Cheapest / Fastest / Best value)
- **Submit:** "Wygeneruj plan" button
- **Loading modal:** "Analizujemy transport, noclegi i atrakcje…" with animated dots

### 5. Results Page (`/result`)
- **Header:** "{Destination} • {N} dni" + "Plan dopasowany do Ciebie"
- **Summary cards:** Transport option, Hotel recommendation, Total budget
- **Itinerary:** Day-by-day cards with attractions (toggleable checkboxes)
- **Map placeholder:** Static map image area
- **Actions:**
  - "Pobierz PDF" (primary) — print-to-PDF functionality
  - "Edytuj preferencje" (secondary) — back to step 1 with state preserved
  - "Zacznij od nowa" (tertiary) — clear and restart

---

## Data & State

**Zustand Store with localStorage:**
- Destination, origin, dates, travelers
- Selected interests and pace
- Budget range, accommodation preferences
- Generated itinerary data

**Mock Data Services (typed interfaces):**
- `getAttractions()` — 15+ Barcelona attractions with tags, duration, price
- `searchTransport()` — 3 options (cheapest/fastest/balanced)
- `searchHotels()` — 5 hotel options with ratings and prices
- `buildItinerary()` — Groups attractions by day based on pace
- `estimateTotal()` — Calculates trip total

**Demo Pre-fill:**
Barcelona trip, 12–16 May, 2 travelers, 3000–4000 PLN budget

---

## Technical Approach

- **Routing:** React Router with `/`, `/plan/step-1`, `/plan/step-2`, `/plan/step-3`, `/result`
- **Forms:** React Hook Form + Zod validation
- **Styling:** Tailwind CSS with custom CSS variables for the dark theme
- **Accessibility:** Focus states, aria labels, keyboard navigation
- **PDF:** Browser print-to-PDF (`window.print()` with print stylesheet)

---

## Phase 2 (Future)
- Real API integrations for hotels/transport
- Interactive map component
- More destinations and attractions data
- User accounts and saved trips
