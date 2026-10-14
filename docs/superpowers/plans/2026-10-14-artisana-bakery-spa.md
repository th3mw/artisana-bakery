# Artisana Bakery SPA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a luxury, high-performance Single Page Application for Artisana Bakery using Next.js App Router and Bun runtime, featuring 3 curated collections, waste-to-wealth circular storytelling, an interactive order tray, and structured WhatsApp checkout.

**Architecture:** Static-first Next.js SPA shell utilizing React Server Components for critical pre-rendering and isolated Client Islands for stateful interactions (order tray, collection tabs, quick view). Product catalog embedded as static TypeScript fixtures for instant FCP/LCP performance with zero runtime database latency.

**Tech Stack:** Next.js (latest), Bun runtime, React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion for React (Framer Motion), Vitest, React Testing Library, Playwright.

**Spec:** [docs/superpowers/specs/2026-10-14-artisana-bakery-site-design.md](file:///home/th3mw/DEV/Artisana%20Bakery/docs/superpowers/specs/2026-10-14-artisana-bakery-site-design.md)

---

## Global Constraints

- Runtime & Package Manager: Always use `bun` (`bun --bun run dev`, `bun test`, `bun run build`).
- Target performance: Mobile FCP < 0.9s, LCP < 1.5s, CLS = 0.00, Lighthouse Score >= 95.
- Target phone number for WhatsApp dispatch: `+234 701 073 1559`.
- Color tokens: Warm Cream Canvas (`#FDF8F3`), Crust Gold (`#C88A3E`), Velvet Crimson (`#9E1B32`), Deep Cocoa (`#2A1B14`), Forest Green (`#1A3A2A`).
- Strict TypeScript: No `any` types; all product records and tray states strongly typed.
- Git commit convention: Conventional Commits for each atomic task.

## Review Focus

1. **Hydration Mismatch in Tray State:** Client tray stored in `localStorage` must not trigger SSR hydration errors when server renders empty tray.
2. **Special Characters in WhatsApp Message:** Product names, Nigerian Naira symbols (₦), emojis, and delivery notes must be safely URL-encoded.
3. **Empty Tray Submission Protection:** WhatsApp trigger button must be disabled when tray is empty, with helpful guidance to add items.
4. **Mobile Drawer Viewport & Safe Areas:** Tray drawer must handle iOS home bar padding and virtual keyboard opening without breaking layouts.
5. **Layout Shift from Custom Fonts / Images:** Google fonts must use `display: swap` via `next/font/google` and images must declare explicit aspect ratios.

---

## File Structure

```
.
├── docs/superpowers/
│   ├── specs/2026-10-14-artisana-bakery-site-design.md
│   └── plans/2026-10-14-artisana-bakery-spa.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── types/
│   │   ├── product.ts
│   │   └── tray.ts
│   ├── data/
│   │   └── products.ts
│   ├── context/
│   │   └── TrayContext.tsx
│   ├── utils/
│   │   └── whatsapp.ts
│   └── components/
│       ├── layout/
│       │   ├── AnnouncementBar.tsx
│       │   ├── HeaderNav.tsx
│       │   └── Footer.tsx
│       ├── home/
│       │   ├── HeroSection.tsx
│       │   ├── WasteToWealth.tsx
│       │   ├── BrandStory.tsx
│       │   └── FAQSection.tsx
│       ├── products/
│       │   ├── CollectionSwitcher.tsx
│       │   ├── ProductCard.tsx
│       │   ├── ProductGrid.tsx
│       │   └── ProductQuickView.tsx
│       └── tray/
│           ├── OrderTrayDrawer.tsx
│           └── MobileBottomBar.tsx
├── tests/
│   ├── data/products.test.ts
│   ├── utils/whatsapp.test.ts
│   ├── context/TrayContext.test.tsx
│   └── components/
│       ├── HeaderNav.test.tsx
│       ├── HeroSection.test.tsx
│       └── OrderTrayDrawer.test.tsx
├── public/
│   ├── images/products/
│   └── favicon.ico
├── next.config.ts
├── postcss.config.mjs
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

### Task 1: Project Scaffolding & Bun Toolchain Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Test: `tests/smoke.test.ts`

**Interfaces:**
- Produces: Runnable Bun development environment, TypeScript check (`bun tsc --noEmit`), test runner (`bun test`), and build command (`bun run build`).

- [ ] **Step 1: Write the smoke test**

```ts
// tests/smoke.test.ts
import { describe, it, expect } from 'vitest';

describe('Toolchain Smoke Test', () => {
  it('runs tests successfully under Bun', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 2: Configure package.json and toolchain configuration**

Setup `package.json` with dependencies:
`next`, `react`, `react-dom`, `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`.
DevDependencies:
`typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `@types/bun`, `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.

- [ ] **Step 3: Run bun install and run the smoke test**

Run: `bun test`
Expected: PASS with 1 passed test.

- [ ] **Step 4: Verify Next.js build setup**

Run: `bun run build`
Expected: Verification that next build runs without syntax errors.

- [ ] **Step 5: Commit**

```bash
git add package.json bun.lock tsconfig.json next.config.ts postcss.config.mjs vitest.config.ts tests/
git commit -m "chore: scaffold Next.js App Router project with Bun and Vitest"
```

---

### Task 2: Product Catalog & Type Definitions

**Files:**
- Create: `src/types/product.ts`
- Create: `src/data/products.ts`
- Test: `tests/data/products.test.ts`

**Interfaces:**
- Produces: `CollectionId`, `Product`, `COLLECTIONS`, `PRODUCTS`, `getProductsByCollection(id: CollectionId)`.

- [ ] **Step 1: Write the failing test for product catalog**

```ts
// tests/data/products.test.ts
import { describe, it, expect } from 'vitest';
import { PRODUCTS, COLLECTIONS, getProductsByCollection } from '@/data/products';

describe('Products Catalog', () => {
  it('defines 3 distinct collections', () => {
    expect(COLLECTIONS).toHaveLength(3);
    const ids = COLLECTIONS.map(c => c.id);
    expect(ids).toContain('artisan-breads');
    expect(ids).toContain('keto-fibre');
    expect(ids).toContain('coconut-pantry');
  });

  it('contains products for each collection with valid prices and descriptions', () => {
    COLLECTIONS.forEach(col => {
      const items = getProductsByCollection(col.id);
      expect(items.length).toBeGreaterThan(0);
      items.forEach(product => {
        expect(product.name).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.description).toBeTruthy();
        expect(product.ingredients.length).toBeGreaterThan(0);
      });
    });
  });

  it('includes signature bestseller Decadent Moist Chocolate Cake in artisan-breads', () => {
    const breads = getProductsByCollection('artisan-breads');
    const chocolateCake = breads.find(p => p.name.includes('Chocolate Cake'));
    expect(chocolateCake).toBeDefined();
    expect(chocolateCake?.badge).toBe('Signature Bake');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/data/products.test.ts`
Expected: FAIL with "Cannot find module '@/data/products'".

- [ ] **Step 3: Implement product types and catalog fixtures**

Implement `src/types/product.ts` with `Product` interface and `src/data/products.ts` containing the full 3 collections and 13 authentic products extracted from `mohfood_desktop (2).html` and user requirements.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/data/products.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/types/product.ts src/data/products.ts tests/data/products.test.ts
git commit -m "feat: add product catalog data model and fixtures for all collections"
```

---

### Task 3: WhatsApp Order Formatter & Utility Engine

**Files:**
- Create: `src/types/tray.ts`
- Create: `src/utils/whatsapp.ts`
- Test: `tests/utils/whatsapp.test.ts`

**Interfaces:**
- Consumes: `Product` from `src/types/product.ts`.
- Produces: `TrayItem`, `OrderCustomerDetails`, `formatWhatsAppOrderMessage(items, details)`, `generateWhatsAppUrl(items, details)`.

- [ ] **Step 1: Write the failing test for WhatsApp formatter**

```ts
// tests/utils/whatsapp.test.ts
import { describe, it, expect } from 'vitest';
import { formatWhatsAppOrderMessage, generateWhatsAppUrl } from '@/utils/whatsapp';
import type { TrayItem, OrderCustomerDetails } from '@/types/tray';

describe('WhatsApp Formatter', () => {
  const dummyItems: TrayItem[] = [
    {
      product: {
        id: 'chocolate-cake',
        name: 'Decadent Moist Chocolate Cake',
        collectionId: 'artisan-breads',
        tagline: 'Signature bake',
        description: 'Moist cake',
        price: 18000,
        unit: 'Whole Loaf',
        dietary: ['Signature'],
        isAvailable: true,
        ingredients: ['Cocoa'],
        shelfLife: '5 days',
        image: '/images/products/chocolate-cake.jpg',
      },
      quantity: 2,
    },
  ];

  const dummyDetails: OrderCustomerDetails = {
    customerName: 'Chidi Okafor',
    phoneNumber: '08012345678',
    deliveryArea: 'Lagos Island (Lekki / Ikoyi / VI)',
    deliveryAddress: '14 Admiralty Way, Lekki Phase 1',
    deliveryDate: '2026-10-16',
    specialInstructions: 'Please deliver chilled before noon',
  };

  it('formats clean structured order text with correct totals', () => {
    const text = formatWhatsAppOrderMessage(dummyItems, dummyDetails);
    expect(text).toContain('ARTISANA BAKERY — NEW ORDER');
    expect(text).toContain('Chidi Okafor');
    expect(text).toContain('2x Decadent Moist Chocolate Cake');
    expect(text).toContain('₦36,000');
    expect(text).toContain('14 Admiralty Way, Lekki Phase 1');
  });

  it('generates wa.me URL targeting +234 701 073 1559', () => {
    const url = generateWhatsAppUrl(dummyItems, dummyDetails);
    expect(url).toContain('https://wa.me/2347010731559?text=');
    expect(url).toContain(encodeURIComponent('Chidi Okafor'));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/utils/whatsapp.test.ts`
Expected: FAIL with "Cannot find module '@/utils/whatsapp'".

- [ ] **Step 3: Implement WhatsApp formatting functions**

Implement `src/types/tray.ts` and `src/utils/whatsapp.ts`. Include phone formatting, safe URI encoding, item multiplication, Nigerian currency formatting (`₦XX,XXX`), and empty input guards.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/utils/whatsapp.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/types/tray.ts src/utils/whatsapp.ts tests/utils/whatsapp.test.ts
git commit -m "feat: implement WhatsApp order formatting and URL generator"
```

---

### Task 4: Order Tray State Management (`TrayContext`)

**Files:**
- Create: `src/context/TrayContext.tsx`
- Test: `tests/context/TrayContext.test.tsx`

**Interfaces:**
- Consumes: `Product`, `TrayItem`, `OrderCustomerDetails`.
- Produces: `TrayContext`, `TrayProvider`, `useTray()`.

- [ ] **Step 1: Write the failing test for TrayContext**

```tsx
// tests/context/TrayContext.test.tsx
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TrayProvider, useTray } from '@/context/TrayContext';
import { PRODUCTS } from '@/data/products';

describe('TrayContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <TrayProvider>{children}</TrayProvider>
  );

  it('starts with an empty tray', () => {
    const { result } = renderHook(() => useTray(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it('adds product to tray and increments quantity', () => {
    const { result } = renderHook(() => useTray(), { wrapper });
    act(() => {
      result.current.addItem(PRODUCTS[0], 1);
    });
    expect(result.current.itemCount).toBe(1);
    expect(result.current.subtotal).toBe(PRODUCTS[0].price);

    act(() => {
      result.current.addItem(PRODUCTS[0], 2);
    });
    expect(result.current.itemCount).toBe(3);
    expect(result.current.subtotal).toBe(PRODUCTS[0].price * 3);
  });

  it('removes item when quantity reaches zero', () => {
    const { result } = renderHook(() => useTray(), { wrapper });
    act(() => {
      result.current.addItem(PRODUCTS[0], 1);
    });
    act(() => {
      result.current.updateQuantity(PRODUCTS[0].id, -1);
    });
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/context/TrayContext.test.tsx`
Expected: FAIL with "Cannot find module '@/context/TrayContext'".

- [ ] **Step 3: Implement TrayContext with hydration protection**

Create `src/context/TrayContext.tsx` with:
- `addItem(product, qty)`
- `removeItem(productId)`
- `updateQuantity(productId, delta)`
- `clearTray()`
- `isHydrated` flag to prevent SSR divergence
- Sync to `localStorage.getItem('artisana_tray_v1')`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/context/TrayContext.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/context/TrayContext.tsx tests/context/TrayContext.test.tsx
git commit -m "feat: implement TrayContext with localStorage sync and hydration guard"
```

---

### Task 5: Design Tokens, Fonts & Layout Components

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/components/layout/AnnouncementBar.tsx`
- Create: `src/components/layout/HeaderNav.tsx`
- Create: `src/components/layout/Footer.tsx`
- Test: `tests/components/HeaderNav.test.tsx`

**Interfaces:**
- Consumes: `useTray()`.
- Produces: Complete root layout with fonts, announcement banner, header with interactive tray trigger, and responsive footer.

- [ ] **Step 1: Write test for HeaderNav and AnnouncementBar**

```tsx
// tests/components/HeaderNav.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { TrayProvider } from '@/context/TrayContext';

describe('HeaderNav Component', () => {
  it('renders brand logo and collection links', () => {
    render(
      <TrayProvider>
        <HeaderNav onOpenTray={() => {}} />
      </TrayProvider>
    );
    expect(screen.getByText(/ARTISANA/i)).toBeInTheDocument();
    expect(screen.getByText(/Collections/i)).toBeInTheDocument();
    expect(screen.getByText(/Story/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/components/HeaderNav.test.tsx`
Expected: FAIL with "Cannot find module '@/components/layout/HeaderNav'".

- [ ] **Step 3: Implement design tokens, layout and navigation**

- Add Google Fonts (`Playfair_Display`, `Cormorant_Garamond`, `Montserrat`) in `src/app/layout.tsx`.
- Configure Tailwind tokens in `src/app/globals.css` (`--cream`, `--gold`, `--crimson`, `--cocoa`, `--forest`).
- Create `AnnouncementBar.tsx`, `HeaderNav.tsx`, and `Footer.tsx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/components/HeaderNav.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/layout/ tests/components/HeaderNav.test.tsx
git commit -m "feat: implement luxury theme tokens, font loading, and layout navigation"
```

---

### Task 6: Hero Section & Trust Badges

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Test: `tests/components/HeroSection.test.tsx`

**Interfaces:**
- Produces: `HeroSection` with headline, CTA links to collections and tray, and 5 value badges.

- [ ] **Step 1: Write test for HeroSection**

```tsx
// tests/components/HeroSection.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/home/HeroSection';

describe('HeroSection', () => {
  it('renders hero title and core trust badges', () => {
    render(<HeroSection onExplore={() => {}} onOrderClick={() => {}} />);
    expect(screen.getByText(/Baked With Obsession/i)).toBeInTheDocument();
    expect(screen.getByText(/No Preservatives/i)).toBeInTheDocument();
    expect(screen.getByText(/Chilled Lagos Delivery/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/components/HeroSection.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement HeroSection**

Implement `HeroSection.tsx` with editorial typography, radial warm glow background, quick action buttons, and trust pillars.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/components/HeroSection.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/HeroSection.tsx tests/components/HeroSection.test.tsx
git commit -m "feat: implement hero section with brand badges and fast CTAs"
```

---

### Task 7: Collection Switcher, Product Grid & Quick View Modal

**Files:**
- Create: `src/components/products/CollectionSwitcher.tsx`
- Create: `src/components/products/ProductCard.tsx`
- Create: `src/components/products/ProductGrid.tsx`
- Create: `src/components/products/ProductQuickView.tsx`
- Test: `tests/components/ProductCard.test.tsx`

**Interfaces:**
- Consumes: `Product`, `COLLECTIONS`, `useTray()`.
- Produces: Interactive filtering tabs, responsive cards with instant "Add to Tray", and detail modals.

- [ ] **Step 1: Write test for ProductCard and CollectionSwitcher**

```tsx
// tests/components/ProductCard.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/products/ProductCard';
import { TrayProvider } from '@/context/TrayContext';
import { PRODUCTS } from '@/data/products';

describe('ProductCard', () => {
  it('displays product info and adds item to tray on button click', () => {
    render(
      <TrayProvider>
        <ProductCard product={PRODUCTS[0]} onQuickView={() => {}} />
      </TrayProvider>
    );
    expect(screen.getByText(PRODUCTS[0].name)).toBeInTheDocument();
    const addBtn = screen.getByRole('button', { name: /Add to Tray/i });
    fireEvent.click(addBtn);
    expect(screen.getByText(/Added/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/components/ProductCard.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement CollectionSwitcher, ProductCard, ProductGrid & QuickView**

- Implement tab switcher with animated indicator pill.
- Implement `ProductCard` with price formatting in ₦, dietary pills, quick view trigger, and feedback state.
- Implement `ProductQuickView` dialog with ingredients and storage tips.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/components/ProductCard.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/products/ tests/components/ProductCard.test.tsx
git commit -m "feat: implement collection tabs, product card grid, and quick view dialog"
```

---

### Task 8: Circular Waste-to-Wealth Spotlight, Story & FAQ

**Files:**
- Create: `src/components/home/WasteToWealth.tsx`
- Create: `src/components/home/BrandStory.tsx`
- Create: `src/components/home/FAQSection.tsx`
- Test: `tests/components/WasteToWealth.test.tsx`

**Interfaces:**
- Produces: Dedicated sustainability feature, brand story narrative, and accordion FAQ.

- [ ] **Step 1: Write test for WasteToWealth section**

```tsx
// tests/components/WasteToWealth.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WasteToWealth } from '@/components/home/WasteToWealth';

describe('WasteToWealth Component', () => {
  it('highlights the circular coconut upcycling story', () => {
    render(<WasteToWealth onExplorePantry={() => {}} />);
    expect(screen.getByText(/Waste-to-Wealth/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcycled Coconut Pulp/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/components/WasteToWealth.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement WasteToWealth, BrandStory, and FAQSection**

Build the editorial sustainability feature, brand story with Lagos pride, and interactive FAQ accordion.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/components/WasteToWealth.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/WasteToWealth.tsx src/components/home/BrandStory.tsx src/components/home/FAQSection.tsx tests/components/WasteToWealth.test.tsx
git commit -m "feat: implement waste-to-wealth circular story, brand history, and FAQ"
```

---

### Task 9: Interactive Order Tray Drawer & WhatsApp Dispatch Flow

**Files:**
- Create: `src/components/tray/OrderTrayDrawer.tsx`
- Create: `src/components/tray/MobileBottomBar.tsx`
- Test: `tests/components/OrderTrayDrawer.test.tsx`

**Interfaces:**
- Consumes: `useTray()`, `generateWhatsAppUrl()`.
- Produces: Interactive slide-over tray, customer form inputs, and WhatsApp order trigger button.

- [ ] **Step 1: Write test for OrderTrayDrawer**

```tsx
// tests/components/OrderTrayDrawer.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrderTrayDrawer } from '@/components/tray/OrderTrayDrawer';
import { TrayProvider, useTray } from '@/context/TrayContext';
import { PRODUCTS } from '@/data/products';

const TestApp = () => {
  const { addItem } = useTray();
  return (
    <div>
      <button onClick={() => addItem(PRODUCTS[0], 2)}>Add Items</button>
      <OrderTrayDrawer isOpen={true} onClose={() => {}} />
    </div>
  );
};

describe('OrderTrayDrawer', () => {
  it('renders order summary and WhatsApp checkout button when items exist', () => {
    render(
      <TrayProvider>
        <TestApp />
      </TrayProvider>
    );
    fireEvent.click(screen.getByText('Add Items'));
    expect(screen.getByText(PRODUCTS[0].name)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Send Order to WhatsApp/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/components/OrderTrayDrawer.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement OrderTrayDrawer and MobileBottomBar**

- Slide-over drawer with backdrop blur.
- Quantity adjustment controls (`+`, `-`, remove).
- Delivery details form: Customer Name, Phone, Delivery Area (Island vs Mainland), Delivery Address, Date, Notes.
- Dynamic WhatsApp link generator button opening WhatsApp web/app.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/components/OrderTrayDrawer.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/tray/ tests/components/OrderTrayDrawer.test.tsx
git commit -m "feat: implement interactive order tray drawer and WhatsApp checkout flow"
```

---

### Task 10: Page Assembly, SEO Metadata, Build & Lighthouse Verification

**Files:**
- Create: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Create: `tests/e2e/page.spec.ts`

**Interfaces:**
- Consumes: All components.
- Produces: Fully integrated Next.js Single Page Application, verified production build, and clean test run.

- [ ] **Step 1: Assemble src/app/page.tsx**

Integrate all sections (`AnnouncementBar`, `HeaderNav`, `HeroSection`, `CollectionSwitcher`, `ProductGrid`, `WasteToWealth`, `BrandStory`, `FAQSection`, `Footer`, `OrderTrayDrawer`, `MobileBottomBar`). Add SEO metadata, OpenGraph cards, and schema.org JSON-LD structured data for Bakery.

- [ ] **Step 2: Run all unit and integration tests**

Run: `bun test`
Expected: All tests pass (0 failures).

- [ ] **Step 3: Run TypeScript typecheck**

Run: `bun tsc --noEmit`
Expected: 0 type errors.

- [ ] **Step 4: Run production build verification**

Run: `bun run build`
Expected: Successful build with static page optimization.

- [ ] **Step 5: Browser and responsive verification with Playwright**

Verify layout on desktop (1440px) and mobile viewport (375px), confirming zero layout shift, smooth drawer opening, and complete order workflow.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx tests/
git commit -m "feat: assemble complete Artisana Bakery single page application"
```
