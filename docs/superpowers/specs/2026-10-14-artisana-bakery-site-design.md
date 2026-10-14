# Artisana Bakery (by Mohfood) — Website Architecture & Design Specification

- **Date:** 2026-10-14
- **Project:** Artisana Bakery Single Page Application
- **Domain Target:** `bakery.mohfood.com` / `mohfoodbakery.com`
- **Stack:** Next.js (App Router, latest), Bun runtime, React 19, Tailwind CSS v4, Lucide Icons, Framer Motion
- **Dispatch Channel:** Lagos Chilled Delivery (+234 701 073 1559)

---

## 1. Executive Summary & Purpose

Artisana Bakery is the artisanal bakery line of Mohfood, previously presented alongside the parfait collection in `mohfood_desktop (2).html`. This project establishes a standalone, high-performance web experience for the bakery line, focusing on craft, indulgence, health-conscious dietary options, and sustainable circular ingredients.

The web application is designed as an ultra-fast, mobile-first Single Page Application (SPA) with rich animations, artisanal warm luxury branding, instant interactive collection filtering, an order tray, and seamless WhatsApp dispatch to the Lagos fulfillment team.

---

## 2. Product Collections & Catalog Structure

The site features three core collections:

### Collection 1: Artisan Breads & Cakes (`artisan-breads`)
Traditional white-flour handcrafted luxury bakes and bestsellers:
- **Decadent Moist Chocolate Cake:** Impossibly moist, intensely dark, rich ganache layers. Signature bake.
- **Moist Banana Bread:** Warm, fragrant, perfectly ripe bananas.
- **Red Velvet Cake:** Velvety crimson sponge crowned with cream cheese frosting.
- **Banana Coconut Bread:** Tropical depth meets classic comfort.
- **Oreos Chocolate Cake:** Signature dark chocolate cake elevated with Oreo crumble and cream.

### Collection 2: Keto & Fibre Line (`keto-fibre`)
Specialized health-conscious, low-carb, and prebiotic grain-free bakes:
- **Coconut Flour Banana Bread:** Zero white flour, sweetened naturally, low carb and keto-friendly.
- **Cabbage Swallow:** Nutrient-dense, grain-free traditional swallow alternative.
- **Okro Binder Mix:** Natural fibre binder for gluten-free and low-carb African cooking and baking.
- **Stevia Sweetened Pancakes:** High-fibre, keto-approved breakfast stack (Future / Coming Soon).

### Collection 3: The Coconut Pantry (`coconut-pantry`)
Circular "Waste-to-Wealth" staples upcycling the high-quality coconut pulp from Mohfood's yoghurt line:
- **Desiccated Coconut:** Finely shredded, naturally dried bakery staple.
- **Coconut Flakes:** Crispy golden toasted flakes for snacking and topping.
- **Cold-Pressed Coconut Oil:** Pure, unrefined, multi-purpose culinary and wellness oil.
- **Coconut Candy:** Traditional artisanal chewy coconut treat made with zero artificial preservatives.

---

## 3. System Architecture & Performance Targets

### 3.1 Performance Goals (Lighthouse Targets)
- **FCP (First Contentful Paint):** < 0.9s (mobile) / < 0.5s (desktop).
- **LCP (Largest Contentful Paint):** < 1.5s (mobile) / < 0.8s (desktop).
- **CLS (Cumulative Layout Shift):** 0.00.
- **FID / INP (Interaction to Next Paint):** < 100ms.
- **Overall Lighthouse Performance Score:** 95–100.

### 3.2 Architectural Pattern
- **Static Pre-Rendering (SSG/RSC):** The initial page shell, hero banner, announcement strip, and full product catalog are rendered to static HTML at build time. No client-side waterfall blocks the initial render.
- **Client Islands:** Interactive widgets (collection filter tabs, product quick view dialogs, order tray drawer, WhatsApp formatter) hydrate as lightweight client components.
- **Font & Asset Strategy:** Playfair Display, Cormorant Garamond, and Montserrat loaded via `next/font/google` with zero layout shift (`display: swap`). Product images use responsive sizes, WebP formats, explicit aspect ratios, and hero preloading (`priority={true}`).

---

## 4. UI/UX Design System & Color Tokens

### 4.1 Color Palette
- **Warm Cream Canvas:** `#FDF8F3` (page background), `#F7EFE6` (card tint).
- **Crust Gold:** `#C88A3E` (accent, icons, eyebrow badges), `#9A6624` (hover).
- **Velvet Crimson:** `#9E1B32` (CTAs, primary brand accents), `#7F1426` (dark hover).
- **Deep Cocoa:** `#2A1B14` (primary headings and high-contrast text).
- **Forest Green:** `#1A3A2A` (Keto & Fibre and circular sustainability accents).
- **Border & Dividers:** `#EDE0D4`.

### 4.2 Typography Hierarchy
- **Primary Editorial Headings:** `Playfair Display` (serif, bold, luxury feel).
- **Accents, Captions & Quotes:** `Cormorant Garamond` (italic serif, artisanal craft tone).
- **Body, Badges & Interactive Controls:** `Montserrat` (geometric sans-serif, high legibility).

### 4.3 Motion & Transitions
- Spring physics via Motion for React (`stiffness: 300, damping: 30`).
- Animated layout tabs with shared layout transition pill.
- Slide-over order tray drawer (right on desktop, bottom sheet on mobile).
- `prefers-reduced-motion` fully respected with non-animated instant fallback.

---

## 5. Component Breakdown & Page Layout

1. **`AnnouncementBar`:** Top strip highlighting daily fresh baking, zero preservatives, and chilled delivery across Lagos.
2. **`HeaderNav`:** Sticky navigation with brand identity (`Artisana Bakery by Mohfood`), anchor links (`Collections`, `Waste-to-Wealth`, `Our Story`, `FAQ`), and an interactive `Order Tray` trigger with live item count pill.
3. **`HeroSection`:** Headline *"Baked With Obsession"*, brand proposition, primary CTA *"Explore The Bakes"*, secondary CTA *"Build WhatsApp Order"*, and 5 trust badges (No Preservatives, 100% Real Ingredients, Handcrafted in Lagos, Chilled Delivery, Waste-to-Wealth Upcycled).
4. **`CollectionSwitcher`:** Animated tab selector between *Artisan Breads*, *Keto & Fibre*, and *The Coconut Pantry*.
5. **`ProductGrid` & `ProductCard`:** Responsive card grid (1 col mobile, 2 col tablet, 3-4 col desktop) showing product photo, diet/health tags, title, description, price (in ₦), and an interactive *"Add to Tray"* button.
6. **`ProductQuickViewModal`:** Modal displaying complete ingredient lists, allergen notes, and optimal storage instructions.
7. **`WasteToWealthSection`:** Editorial feature explaining how Artisana Bakery upcycles coconut pulp from Mohfood's yoghurt processing into high-fibre flour, flakes, and cold-pressed oil.
8. **`OrderTrayDrawer`:**
   - Slide-over drawer displaying selected items and quantities.
   - Increment (`+`), decrement (`-`), and remove actions.
   - Order metadata inputs: Customer Name, Phone Number, Delivery Area (`Lagos Island` / `Lagos Mainland`), Delivery Address, Delivery Date, and Special Notes.
   - Subtotal calculation in Nigerian Naira (₦).
   - Direct button: *"Send Order to WhatsApp (+234 701 073 1559)"*.
9. **`BrandStorySection`:** Founder craft narrative and Lagos roots.
10. **`FAQSection`:** Frequently asked questions regarding ordering lead times, shelf life, delivery zones, and dietary questions.
11. **`Footer`:** Contact info (`07010731559`), hours, location, Instagram/WhatsApp links, and copyright.

---

## 6. Data Modeling & State Management

### 6.1 Product Schema (`src/data/products.ts`)
```ts
export type CollectionId = 'artisan-breads' | 'keto-fibre' | 'coconut-pantry';

export interface Product {
  id: string;
  name: string;
  collectionId: CollectionId;
  tagline: string;
  description: string;
  price: number; // in NGN
  unit: string;  // e.g. "500g loaf", "250ml jar"
  dietary: string[]; // e.g. ["Keto", "Zero White Flour", "Upcycled"]
  badge?: string;    // e.g. "Bestseller", "Pre-Order", "New"
  isAvailable: boolean;
  ingredients: string[];
  shelfLife: string;
  image: string;
}
```

### 6.2 Order Tray State (`src/context/TrayContext.tsx`)
- Stores `items: { product: Product; quantity: number }[]`.
- Synced to `localStorage` key `artisana_tray_v1` with hydration protection.
- Actions: `addItem`, `removeItem`, `updateQuantity`, `clearTray`, `subtotal`, `totalCount`.

### 6.3 WhatsApp Order Formatter (`src/utils/whatsapp.ts`)
Generates an encoded WhatsApp message URL:
```
https://wa.me/2347010731559?text=[ENCODED_MESSAGE]
```
Payload format:
```
🍞 *ARTISANA BAKERY — NEW ORDER*
━━━━━━━━━━━━━━━━━━━━━━
*Customer:* [Customer Name]
*Phone:* [Customer Phone]
*Delivery Zone:* [Lagos Island / Mainland]
*Address:* [Full Address]
*Delivery Date:* [Selected Date]

*ORDER ITEMS:*
• [Qty]x [Product Name] — ₦[Item Total]
...

━━━━━━━━━━━━━━━━━━━━━━
*Subtotal:* ₦[Total Amount]
*Notes:* [Special Instructions]
━━━━━━━━━━━━━━━━━━━━━━
_Sent from bakery.mohfood.com_
```

---

## 7. Testing & Quality Assurance Plan

1. **Type Checking:** Strict mode TypeScript (`bun tsc --noEmit`) with zero errors.
2. **Linting:** ESLint standard Next.js configuration.
3. **Unit Tests (Vitest):**
   - Tray calculation tests: adding items, quantity increments, zero-quantity removal, subtotal math.
   - WhatsApp URL builder test: correct phone number formatting (`2347010731559`), URL encoding, and item layout.
   - Collection filter predicate tests.
4. **End-to-End & Responsiveness (Playwright):**
   - Desktop and mobile viewport runs.
   - Verifying collection switching, tray drawer open/close, and order link generation.
5. **Lighthouse Verification:**
   - Audit run measuring FCP, LCP, CLS, Accessibility, and Best Practices.
