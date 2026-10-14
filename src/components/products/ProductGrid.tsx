'use client';

import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export function ProductGrid({ products, onQuickView }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white/60 rounded-2xl border border-dashed border-[#EDE0D4]">
        <p className="font-serif italic text-lg text-[#7E6D64]">
          No products currently available in this collection.
        </p>
      </div>
    );
  }

  return (
    <div
      key={products[0]?.collectionId || 'product-grid'}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-300 ease-out"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
