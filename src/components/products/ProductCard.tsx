'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { useTray } from '@/context/TrayContext';
import { formatNaira } from '@/utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useTray();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  // Generates consistent culinary gradient background based on collection
  const getGradientByCollection = () => {
    switch (product.collectionId) {
      case 'artisan-breads':
        return 'from-[#4A2E1B] via-[#2A1B14] to-[#1A110D]';
      case 'keto-fibre':
        return 'from-[#2D5842] via-[#1A3A2A] to-[#10241A]';
      case 'coconut-pantry':
        return 'from-[#7A5E28] via-[#4A3816] to-[#261C09]';
      default:
        return 'from-[#2A1B14] to-[#1E1E1E]';
    }
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-[#EDE0D4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Visual Header / Banner */}
      <div className={`relative aspect-[4/3] w-full bg-gradient-to-br ${getGradientByCollection()} overflow-hidden flex items-center justify-center p-6 text-center select-none`}>
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C88A3E_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Collection & Bestseller Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C88A3E] text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {product.badge}
            </span>
          )}
          <span className="ml-auto text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-black/40 text-white/90 backdrop-blur-xs">
            {product.unit}
          </span>
        </div>

        {/* Elegant culinary typography hero placeholder / thumbnail */}
        <div className="relative z-10 space-y-1.5 transform group-hover:scale-105 transition-transform duration-500">
          <span className="text-3xl sm:text-4xl filter drop-shadow-md">
            {product.collectionId === 'artisan-breads' ? '🍞' : product.collectionId === 'keto-fibre' ? '🥑' : '🥥'}
          </span>
          <h4 className="font-serif italic text-base sm:text-lg text-white/95 font-normal tracking-wide px-2 drop-shadow-sm">
            {product.name}
          </h4>
        </div>

        {/* Quick View Button overlay */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          aria-label={`View details for ${product.name}`}
          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-[2px] z-20 cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Dietary tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {product.dietary.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold uppercase tracking-wider text-[#C88A3E] bg-[#F7EFE6] px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A1B14] leading-snug group-hover:text-[#9E1B32] transition-colors mb-1.5">
            {product.name}
          </h3>

          <p className="text-xs text-[#63534B] font-light line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Tray Action */}
        <div className="pt-3 border-t border-[#EDE0D4] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#7E6D64] uppercase font-semibold block">
              Price
            </span>
            <span className="font-serif text-lg font-bold text-[#2A1B14]">
              {formatNaira(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to Tray`}
            className={`px-4 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
              justAdded
                ? 'bg-[#1A3A2A] text-[#E5B370]'
                : 'bg-[#9E1B32] hover:bg-[#7F1426] text-white hover:scale-105 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Tray</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
