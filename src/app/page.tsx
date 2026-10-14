'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { WasteToWealth } from '@/components/home/WasteToWealth';
import { BrandStory } from '@/components/home/BrandStory';
import { FAQSection } from '@/components/home/FAQSection';
import { CollectionSwitcher } from '@/components/products/CollectionSwitcher';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductQuickView } from '@/components/products/ProductQuickView';
import { OrderTrayDrawer } from '@/components/tray/OrderTrayDrawer';
import { MobileBottomBar } from '@/components/tray/MobileBottomBar';
import { CollectionId, Product } from '@/types/product';
import { getProductsByCollection } from '@/data/products';
import { useTray } from '@/context/TrayContext';

export default function ArtisanaBakeryPage() {
  const [activeCollection, setActiveCollection] = useState<CollectionId>('artisan-breads');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { isTrayOpen, openTray, closeTray } = useTray();

  const currentProducts = getProductsByCollection(activeCollection);

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplorePantry = () => {
    setActiveCollection('coconut-pantry');
    scrollToCollections();
  };

  // Structured Data (JSON-LD) for SEO and Bakery Local Business
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Artisana Bakery by Mohfood',
    image: 'https://bakery.mohfood.com/og-image.jpg',
    description: 'Handcrafted luxury bakes in Lagos. Decadent chocolate cake, moist banana bread, keto line, and circular upcycled coconut pantry staples.',
    telephone: '+2348143392377',
    url: 'https://bakery.mohfood.com',
    priceRange: '₦₦',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.4698,
      longitude: 3.5852,
    },
    servesCuisine: 'Artisan Bakery, Keto, Low Carb, Circular Food',
    openingHours: 'Mo-Sa 07:00-18:00',
    paymentAccepted: 'WhatsApp Order, Bank Transfer, Card',
    currenciesAccepted: 'NGN',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F3] text-[#2A1B14] selection:bg-[#9E1B32] selection:text-white">
      {/* Schema.org Bakery Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Header Nav */}
      <HeaderNav onOpenTray={openTray} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExplore={scrollToCollections}
          onOrderClick={openTray}
        />

        {/* Collections Section */}
        <section id="collections" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C88A3E] block mb-2">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A1B14] tracking-tight">
              Our Signature Bakes
            </h2>
            <p className="text-xs sm:text-sm text-[#7E6D64] mt-2 font-light">
              Slow-baked fresh every morning in Lagos. Choose between our decadent classic cakes, low-carb keto heroes, and upcycled pantry essentials.
            </p>
          </div>

          {/* Collection Tab Switcher */}
          <CollectionSwitcher
            activeCollection={activeCollection}
            onSelectCollection={setActiveCollection}
          />

          {/* Product Grid */}
          <ProductGrid
            products={currentProducts}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        </section>

        {/* Circular Sustainability / Waste-to-Wealth Feature */}
        <WasteToWealth onExplorePantry={handleExplorePantry} />

        {/* Brand Story Section */}
        <BrandStory />

        {/* FAQ Accordion Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Order Tray Drawer */}
      <OrderTrayDrawer
        isOpen={isTrayOpen}
        onClose={closeTray}
      />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Floating Bottom Bar */}
      <MobileBottomBar onOpenTray={openTray} />
    </div>
  );
}
