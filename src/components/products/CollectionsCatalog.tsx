'use client';

import React, { useState } from 'react';
import { CollectionSwitcher } from './CollectionSwitcher';
import { ProductGrid } from './ProductGrid';
import { ProductQuickView } from './ProductQuickView';
import { CollectionId, Product } from '@/types/product';
import { getProductsByCollection } from '@/data/products';

export function CollectionsCatalog() {
  const [activeCollection, setActiveCollection] = useState<CollectionId>('artisan-breads');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const currentProducts = getProductsByCollection(activeCollection);

  return (
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

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
