import React from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { WasteToWealth } from '@/components/home/WasteToWealth';
import { BrandStory } from '@/components/home/BrandStory';
import { FAQSection } from '@/components/home/FAQSection';
import { CollectionsCatalog } from '@/components/products/CollectionsCatalog';
import { OrderTrayDrawer } from '@/components/tray/OrderTrayDrawer';
import { MobileBottomBar } from '@/components/tray/MobileBottomBar';

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

export default function ArtisanaBakeryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F3] text-[#2A1B14] selection:bg-[#9E1B32] selection:text-white">
      {/* Schema.org Bakery Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Announcement Bar (Server Component) */}
      <AnnouncementBar />

      {/* Sticky Header Nav (Client Island) */}
      <HeaderNav />

      <main className="flex-1">
        {/* Hero Section (Client Island) */}
        <HeroSection />

        {/* Curated Collections & Signature Bakes (Client Island) */}
        <CollectionsCatalog />

        {/* Circular Sustainability / Waste-to-Wealth Feature (Server Component) */}
        <WasteToWealth />

        {/* Brand Story Section (Server Component) */}
        <BrandStory />

        {/* FAQ Accordion Section (Client Island) */}
        <FAQSection />
      </main>

      {/* Footer (Server Component) */}
      <Footer />

      {/* Interactive Order Tray Drawer (Client Island) */}
      <OrderTrayDrawer />

      {/* Mobile Floating Bottom Bar (Client Island) */}
      <MobileBottomBar />
    </div>
  );
}
