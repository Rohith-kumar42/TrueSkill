# AtTrueSkill Academy — Master Implementation Plan

> **Design Direction:** Luxury × Playful — sophisticated dark chessboard aesthetic with warm gold accents, expressive motion, and editorial typography. One coherent system, no mixed aesthetics.

---

## 1. Visual System

### 1.1 Color Palette

```css
/* Foundations */
--color-bg-deep:       #0D0D0D;   /* near-black — primary surface */
--color-bg-board:      #1A1209;   /* dark walnut — board tone */
--color-light-square:  #EAD7B2;   /* cream — chessboard light squares */
--color-dark-square:   #8B5E3C;   /* brown mahogany — chessboard dark squares */

/* Accents */
--color-gold:          #D4A843;   /* primary accent — royalty, CTAs */
--color-gold-dim:      #9C7A2E;   /* secondary gold — hover states */
--color-ivory:         #F5F0E8;   /* body text on dark */
--color-slate:         #4A5568;   /* muted text, borders */

/* Semantic */
--color-success:       #48BB78;
--color-error:         #FC8181;
--color-highlight:     rgba(212,168,67,0.15); /* glow overlays */
```

### 1.2 Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headlines | **Playfair Display** | 700, 900 | Serif — authority + elegance |
| Subheadings | **Cinzel** | 600 | Roman inscriptional — chess royalty feel |
| Body | **Inter** | 400, 500 | High legibility at small sizes |
| Accent / Labels | **Cinzel Decorative** | 400 | Sparingly — hero badge, level chips |

Load via Google Fonts. All sizes scale via `clamp()` for fluid responsiveness.

### 1.3 Spacing Rhythm

Base unit: **8px**. Scale: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px.

### 1.4 Motion Rules

| Type | Duration | Easing |
|---|---|---|
| Hover micro | 150–200ms | `ease-out` |
| Page transitions | 400ms | `cubic-bezier(0.4,0,0.2,1)` |
| Chess piece glide | 800–1200ms | `cubic-bezier(0.25,0.46,0.45,0.94)` |
| Scroll reveals | 600ms | `ease-out` |
| Parallax backgrounds | Continuous | `linear` |

**Rule:** Every animation must serve hierarchy, staging, or a single memorable moment. No decorative noise.

### 1.5 Surface Treatment

- Primary cards: `background: rgba(255,255,255,0.04)` + `border: 1px solid rgba(212,168,67,0.2)` + `backdrop-filter: blur(12px)`
- Chessboard pattern: SVG-tiled background at `opacity: 0.06–0.12`, subtle parallax offset
- Shadows: gold-tinted drop shadows on interactive elements — `0 0 24px rgba(212,168,67,0.25)`

---

## 2. Tech Stack

```
Framework      →  Next.js 14 (App Router)         — SPA + MPA hybrid routing
Styling        →  Tailwind CSS + CSS custom props  — utility + design tokens
Animation      →  Framer Motion                   — page transitions, scroll animations
Chess SVGs     →  Custom animated SVG pieces       — inline, controllable via JS
3D Board       →  Three.js (hero only)             — or CSS 3D transform fallback
Icons          →  Lucide React + custom chess set
Fonts          →  Google Fonts (next/font)
Forms          →  React Hook Form + Zod
Email          →  Resend (or Nodemailer)
Deployment     →  Vercel
```

---

## 3. File & Folder Architecture

```
atrueskill-academy/
├── app/
│   ├── layout.tsx                    ← Root layout: fonts, nav, footer
│   ├── page.tsx                      ← Landing SPA (Hero → Intro → Approach → Vision → CTA)
│   ├── programs/
│   │   ├── page.tsx                  ← Programs Overview
│   │   ├── beginner/page.tsx
│   │   ├── post-beginner/page.tsx
│   │   ├── intermediate/page.tsx
│   │   └── advanced/page.tsx
│   ├── advantages/page.tsx           ← Benefits of Chess
│   ├── careers/page.tsx              ← Join Our Team
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── chess/
│   │   ├── ChessboardBg.tsx          ← Animated tiled background
│   │   ├── FloatingPiece.tsx         ← Reusable animated SVG wrapper
│   │   ├── pieces/                   ← King.svg, Queen.svg, Rook.svg, etc.
│   │   └── PawnToQueenButton.tsx     ← CTA button with morph animation
│   ├── sections/                     ← Landing page sections as components
│   │   ├── HeroSection.tsx
│   │   ├── IntroSection.tsx
│   │   ├── ApproachSection.tsx
│   │   └── VisionSection.tsx
│   ├── ui/
│   │   ├── GlowCard.tsx
│   │   ├── LevelCard.tsx
│   │   ├── BenefitCard.tsx
│   │   └── ContactForm.tsx
│   └── PageTransition.tsx
├── lib/
│   ├── animations.ts                 ← Shared Framer Motion variants
│   └── contact.ts                    ← Form handler
├── public/
│   └── chess/                        ← Static piece PNGs if needed
└── styles/
    └── globals.css                   ← CSS variables + base resets
```

---

## 4. Page-by-Page Implementation Plan

---

### 4.1 Landing Page (SPA) — `app/page.tsx`

**Architecture:** Single scroll page with `<section>` landmarks. Intersection Observer triggers Framer Motion `whileInView` animations. Smooth scroll between sections.

#### Section 1 — Hero

**Implementation steps:**
1. Full-viewport `<section>` with CSS 3D chessboard (8×8 grid, alternating squares via CSS Grid)
2. Animate 3–4 chess piece SVGs floating across the board using Framer Motion `animate` with `keyframes` for path-like movement
3. Overlay: centered headline stack with staggered word-reveal (`overflow: hidden` + y-translate)
4. CTA: `PawnToQueenButton` — SVG morph on hover using CSS clip-path or Framer Motion `layoutId`
5. Soft radial gradient glow (`rgba(212,168,67,0.08)`) centered behind the headline

```tsx
// Animation variant example
const heroTextVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" }
  })
}
```

#### Section 2 — Introduction ("Who We Are")

**Implementation steps:**
1. Two-column layout: left = text block, right = animated chess piece collage
2. Key words trigger a small piece animation on scroll-into-view (e.g., pawn → queen morph at the word "mastery")
3. Founding year badge: Cinzel Decorative, gold border, subtle pulse keyframe
4. Scroll reveal: staggered fade-up for each paragraph

#### Section 3 — Our Approach

**Implementation steps:**
1. Interactive horizontal timeline styled as a chess rank (row of 8 squares)
2. Each stage = a chess square with a piece icon: click/hover expands a card below via Framer Motion `AnimatePresence`
3. Active square: gold border glow, piece "lifts" (translateY + shadow)
4. Mobile: collapses to vertical accordion

#### Section 4 — Vision & Mission

**Implementation steps:**
1. Full-width section with parallax chessboard lines (two layers at different scroll speeds via `useScroll` + `useTransform`)
2. Quote-style typographic treatment: large Playfair Display quote marks, centered text
3. Key phrases get `<mark>` with `background: var(--color-highlight)` + fade-in timing

#### Section 5 — Bottom CTA

**Implementation steps:**
1. Two buttons side by side: "Explore Programs" (pawn→queen morph) + "Join Our Team" (knight hop)
2. Glassmorphism card container
3. Background: dense chess piece silhouettes at `opacity: 0.05`

---

### 4.2 Programs Overview — `app/programs/page.tsx`

**Layout:** Asymmetric 2+2 card grid with a full-width intro banner.

**Implementation steps:**
1. Page hero: 50vh banner, chessboard texture, Cinzel heading
2. Four `LevelCard` components — each contains:
   - Chess piece SVG (Pawn / Knight / Rook / Queen+King)
   - Level name + one-line teaser
   - Price chip
   - Hover: piece pulses, card border glows gold, reveal "Learn More →" link
3. Cards enter with staggered `whileInView` (60ms delay each)
4. Clicking a card navigates to the individual level page

---

### 4.3 Individual Level Pages

Each shares a `LevelPageLayout` wrapper component. Differences: piece, colors, copy.

**Shared structure:**
```
[ Page Hero — piece + title + intro ]
[ Key Objectives — icon list ]
[ Curriculum Highlights — icon list ]
[ Schedule & Pricing — info card ]
[ What's Included — icon list ]
[ CTA — Enroll button ]
```

**Implementation steps per page:**

| Page | Piece | Accent tone | Piece animation |
|---|---|---|---|
| Beginner | Pawn | Warm cream, friendly | Wink + celebratory hop |
| Post-Beginner | Knight | Teal-gold | Fork jump arc |
| Intermediate | Rook | Steel blue-gold | Decisive lateral slide |
| Advanced | King + Queen | Deep crimson-gold | Triumphant stand + glow |

1. Hero: full-width, piece SVG 30vh tall, Framer Motion entrance (scale up + fade)
2. Bullet lists: each item reveals sequentially on scroll with a small piece icon (12px) as list marker
3. Pricing card: glassmorphism, gold border, subtle shimmer keyframe on the price number
4. Enroll button: full-width on mobile, pulsing gold ring on idle

---

### 4.4 Advantages of Chess — `app/advantages/page.tsx`

**Layout:** Central brain graphic + four surrounding quadrant sections.

**Implementation steps:**
1. SVG brain illustration (simplified, stylized) — 4 regions light up in sequence on page load, then individually on hover/scroll
2. Four content blocks: Cognitive / Emotional / Educational / Social
3. Each block: chess piece icon relevant to theme (e.g., King = discipline, Pawn→Queen = growth)
4. Animated connecting lines from brain to each block (SVG `stroke-dashoffset` animation)
5. Background: extremely subtle SVG chess move notation lines (`e2-e4`, arrows) at `opacity: 0.04`
6. Mobile: brain → top banner, blocks → vertical stack

---

### 4.5 Careers — `app/careers/page.tsx`

**Implementation steps:**
1. Hero: King SVG with stylized graduation cap (custom SVG modification), animated royal entrance
2. Sections: Qualifications / Skills / Responsibilities / Why Join Us — each a glass card
3. "Why Join Us" block: gold-bordered highlight card with stronger visual weight
4. Bullet icons: small chess piece SVGs (8–12px), gold colored
5. "Apply Now" CTA: knight piece animates a small hop toward the button on hover
6. Application: prominent mailto link or embedded minimal form

---

### 4.6 Contact — `app/contact/page.tsx`

**Implementation steps:**
1. Split layout: form (left/top) + contact details (right/bottom)
2. Form fields: dark glassmorphism inputs, gold `outline` on focus, chess-corner-bracket border decorations (CSS `::before/::after`)
3. Submit button: Queen SVG slides in from left on hover via Framer Motion
4. Contact info cards: email / phone / address each with a small Lucide icon + gold accent
5. Social links: icon buttons with gold hover glow
6. Background: minimal animated chessboard corner pattern

---

## 5. Shared Components

### Navbar
- Sticky, transparent → solid dark on scroll (`useScroll`)
- Logo: stylized knight SVG + "AtTrueSkill Academy" in Cinzel
- Nav links: underline reveal on hover (width: 0 → 100%, gold)
- Mobile: hamburger → full-screen overlay menu with piece icons per link
- CTA: "Enroll Now" pill button, gold fill

### Footer
- Dark, dense, editorial layout
- Chess board corner decoration (CSS)
- Links grouped: Programs / Company / Social
- Bottom bar: copyright + tagline in Cinzel italic

### ChessboardBg
- SVG-based 8×8 grid, `position: fixed` behind content, `pointer-events: none`
- Two parallax layers: board at 0.3× scroll speed, floating pieces at 0.15× speed
- Opacity: 0.08 on dark sections, 0.04 on light sections

### PawnToQueenButton
- SVG `<clipPath>` morphing pawn silhouette → queen silhouette on hover
- Gold fill, dark text, border-radius: 4px (not rounded — deliberate, sharp)

### PageTransition
- Framer Motion `<AnimatePresence>` wrapper
- Exit: opacity 0 + slight y-up, 300ms
- Enter: opacity 1 + y from below, 400ms

---

## 6. Responsive Strategy

| Breakpoint | Behaviour |
|---|---|
| `< 640px` (mobile) | Single column, larger touch targets, condensed hero, accordion accordions |
| `640–1024px` (tablet) | 2-column grids, reduced parallax, nav collapses |
| `> 1024px` (desktop) | Full layouts, all parallax active, piece animations at full fidelity |

**Chess piece animations:** Disabled or simplified on `prefers-reduced-motion: reduce`.

---

## 7. Performance Guidelines

- Chess piece SVGs: inline, `<symbol>` reuse pattern — no HTTP requests per piece
- Chessboard CSS: pure CSS Grid + CSS variables — no canvas overhead
- Three.js (if used in hero): dynamic import with `next/dynamic`, SSR disabled
- Google Fonts: `next/font` with `display: swap`
- Images: `next/image` with WebP, explicit `width`/`height`
- Framer Motion: tree-shake — import only used hooks
- Target Lighthouse score: ≥ 90 Performance, 100 Accessibility

---

## 8. Accessibility

- All chess piece SVGs: `role="img"` + `aria-label`
- Animated elements: respect `prefers-reduced-motion`
- Color contrast: all text ≥ 4.5:1 against backgrounds (gold on dark passes)
- Focus rings: custom gold `outline` — never removed, only restyled
- Form: all inputs have visible `<label>`, error states announced via `aria-live`
- Keyboard navigation: interactive timeline/tabs fully keyboard-operable

---

## 9. Development Phases

### Phase 1 — Foundation (Week 1)
- [ ] Project scaffold: Next.js 14, Tailwind, Framer Motion
- [ ] CSS variable system + typography setup
- [ ] `ChessboardBg`, `FloatingPiece`, `PageTransition` components
- [ ] Chess SVG piece library (King, Queen, Rook, Knight, Bishop, Pawn)
- [ ] Navbar + Footer

### Phase 2 — Landing Page (Week 2)
- [ ] Hero section with piece animations
- [ ] Intro, Approach (interactive timeline), Vision sections
- [ ] Bottom CTA
- [ ] `PawnToQueenButton` morph

### Phase 3 — Inner Pages (Week 3)
- [ ] Programs Overview
- [ ] All 4 Level pages (shared layout, 4 variants)
- [ ] Advantages of Chess page (brain SVG + quadrants)

### Phase 4 — Careers + Contact + Polish (Week 4)
- [ ] Careers page
- [ ] Contact page + form handler
- [ ] Cross-browser QA
- [ ] Accessibility audit
- [ ] Performance audit + optimization
- [ ] Deployment to Vercel

---

## 10. Design Quality Gate (Pre-Launch Checklist)

- [ ] Interface has a single, committed visual point of view (Luxury × Playful — no drift)
- [ ] Typography hierarchy is clear and intentional at every breakpoint
- [ ] Every animation serves a purpose (hierarchy, staging, or one memorable moment)
- [ ] No generic SaaS card pile — layout is compositionally deliberate
- [ ] Chess theme is deeply integrated, not decorative sticker-on-top
- [ ] Dark mode is the primary mode — all surfaces tested
- [ ] Reduced-motion variant verified
- [ ] All CTAs are prominent, clear, and animated without being distracting
- [ ] Site does not read like generic AI-generated UI

---

*Plan version 1.0 — AtTrueSkill Academy website, April 2026*
