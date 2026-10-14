# Artisana Bakery (by Mohfood) 🍞

> Dedicated, high-performance luxury Single Page Application (SPA) for the Artisana Bakery line by Mohfood, separated from the Greek yoghurt parfait catalog.

[![Runtime](https://img.shields.io/badge/Runtime-Bun%20v1.3+-FBF0DF?logo=bun&logoColor=black)](https://bun.sh)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2015%20App%20Router-black?logo=next.js)](https://nextjs.org)
[![Styling](https://img.shields.io/badge/CSS-Tailwind%20CSS%20v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Testing](https://img.shields.io/badge/Tests-Vitest%20%2B%20RTL-6E9F18?logo=vitest)](https://vitest.dev)
[![Fulfillment](https://img.shields.io/badge/Dispatch-WhatsApp%20Lagos-25D366?logo=whatsapp&logoColor=white)](https://wa.me/2347010731559)

---

## 1. Overview & Heritage

Artisana Bakery represents the artisanal baking arm of Mohfood. Previously co-located with parfait offerings in `mohfood_desktop (2).html`, this dedicated application provides an editorial, warm-luxury web experience designed for Lagos epicures and health-conscious food lovers.

### Core Value Pillars
- **Zero Preservatives & 100% Real Ingredients:** Freshly baked daily in Lagos; pure butter, real cocoa, ripe bananas, organic eggs.
- **Dietary Inclusivity:** Dedicated collections for indulgent traditional bakes alongside zero-grain Keto & Fibre essentials.
- **Waste-to-Wealth Circularity:** Fresh coconut meat pulp generated daily from Mohfood's Greek yoghurt parfaits is gently sun-dried and cold-milled into pure coconut flour, toasted flakes, cold-pressed virgin oil, and traditional coconut candy.

---

## 2. Curated Product Collections

| Collection | Slug | Description | Signature Items |
| :--- | :--- | :--- | :--- |
| **Artisan Breads & Cakes** | `artisan-breads` | Traditional white-flour handcrafted luxury bakes and bestsellers. | *Decadent Moist Chocolate Cake (₦18,000)*, *Moist Banana Bread (₦7,500)*, *Red Velvet Cake (₦16,500)* |
| **Keto & Fibre Line** | `keto-fibre` | Grain-free, gluten-free, blood-sugar-conscious alternatives with clean fibre binders. | *Coconut Flour Banana Bread (₦8,500)*, *Cabbage Swallow Mix (₦4,500)*, *Okro Binder (₦3,500)* |
| **The Coconut Pantry** | `coconut-pantry` | Circular upcycled coconut staples direct from Mohfood parfaits. | *Desiccated Coconut (₦3,500)*, *Toasted Coconut Flakes (₦3,800)*, *Virgin Cold-Pressed Coconut Oil (₦5,500)* |

---

## 3. Design System & Palette

The visual identity embodies **Warm Artisanal Luxury**:
- **Warm Cream (`#FDF8F3`):** Editorial parchment background.
- **Golden Crust (`#C88A3E`):** Oven-bloom accent and badge highlight.
- **Velvet Crimson (`#9E1B32`):** Primary action buttons and tray indicators.
- **Deep Cocoa (`#2A1B14`):** High-contrast editorial typography.
- **Forest Green (`#1A3A2A`):** Sustainable circularity & health badge tone.

### Typography
- **Headings & Accents:** `Playfair Display` (Serif) & `Cormorant Garamond` (Italic quotes).
- **Body & Controls:** `Montserrat` (Sans-serif) for high legibility across mobile viewports.

---

## 4. WhatsApp Ordering Engine

The application does not require database account creation or payment gateway fees. Checkout flows directly to the dedicated Lagos Dispatch Center:

- **Fulfillment Hotline:** `+234 701 073 1559`
- **Delivery Zones:** Lagos Island (Lekki / Ikoyi / VI), Lagos Mainland (Ikeja / Surulere / Yaba / Magodo), Greater Lagos.
- **Structured Payload:** Automatically formats items, quantities, subtotal, delivery zone, customer details, and custom delivery notes with full URL encoding.

---

## 5. Development & Verification

All operations use the **Bun** runtime:

### Prerequisites
- [Bun](https://bun.sh) (v1.2+)

### Commands

```bash
# Install dependencies
bun install

# Run local development server (http://localhost:3000)
bun run dev

# Run Vitest unit & component test suite
bun run test

# Run strict TypeScript typechecking
bun run typecheck

# Run Next.js ESLint validation
bun run lint

# Build optimized static production bundle
bun run build
```

---

## 6. Architecture & Lighthouse Defenses

- **Static Generation (SSG):** Pre-rendered static pages with 19.9 kB HTML payload and zero server-side cold start latency.
- **Hydration Safety:** `TrayContext` hydration guard prevents SSR hydration mismatches by deferring `localStorage` sync until client mount.
- **Self-Hosted Web Fonts:** Zero external Google Font network roundtrips using `next/font/google`.
- **Responsive Layout:** Safe-area insets (`env(safe-area-inset-bottom)`) and 16px minimum mobile input font-sizes prevent iOS Safari viewport auto-zoom and home-indicator collisions.
- **Schema.org Structured Data:** Valid `schema.org/Bakery` JSON-LD embedded on homepage for rich Lagos search results.
