'use client';

import React from 'react';
import { COLLECTIONS } from '@/data/products';
import { CollectionId } from '@/types/product';
import { Sparkles, Leaf, Wheat } from 'lucide-react';

interface CollectionSwitcherProps {
  activeCollection: CollectionId;
  onSelectCollection: (id: CollectionId) => void;
}

export function CollectionSwitcher({
  activeCollection,
  onSelectCollection,
}: CollectionSwitcherProps) {
  const getCollectionIcon = (id: CollectionId) => {
    switch (id) {
      case 'artisan-breads':
        return <Wheat className="w-4 h-4" />;
      case 'keto-fibre':
        return <Leaf className="w-4 h-4" />;
      case 'coconut-pantry':
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-10">
      {/* Pills Container with hidden scrollbars and smooth touch ergonomics */}
      <div className="w-full max-w-full overflow-hidden flex justify-center px-4">
        <div
          role="tablist"
          aria-label="Artisana Collections"
          className="inline-flex p-1.5 rounded-full bg-[#EDE0D4] border border-[#DFCFC1] max-w-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory shadow-inner touch-pan-x"
        >
          {COLLECTIONS.map((col) => {
            const isActive = activeCollection === col.id;
            return (
              <button
                key={col.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`collection-panel-${col.id}`}
                onClick={() => onSelectCollection(col.id)}
                className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 ease-out whitespace-nowrap flex items-center gap-2 cursor-pointer snap-center select-none active:scale-[0.96] ${
                  isActive
                    ? 'bg-[#9E1B32] text-white shadow-md scale-[1.02]'
                    : 'text-[#2A1B14] hover:text-[#9E1B32] hover:bg-white/40 active:bg-white/60'
                }`}
              >
                <span className={`transition-transform duration-200 ${isActive ? 'scale-110 text-[#E5B370]' : ''}`}>
                  {getCollectionIcon(col.id)}
                </span>
                <span>{col.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Collection Description Strip */}
      {COLLECTIONS.map((col) => {
        if (col.id !== activeCollection) return null;
        return (
          <div
            key={col.id}
            id={`collection-panel-${col.id}`}
            role="tabpanel"
            className="mt-4 text-center max-w-xl px-4 animate-in fade-in zoom-in-95 duration-200 ease-out"
          >
            <p className="font-serif italic text-base sm:text-lg text-[#C88A3E]">
              &ldquo;{col.tagline}&rdquo;
            </p>
            <p className="text-xs text-[#7E6D64] mt-1 font-light">
              {col.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
