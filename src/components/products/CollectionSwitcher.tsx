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
      {/* Pills Container */}
      <div
        role="tablist"
        aria-label="Artisana Collections"
        className="inline-flex p-1.5 rounded-full bg-[#EDE0D4] border border-[#DFCFC1] max-w-full overflow-x-auto"
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
              className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#9E1B32] text-white shadow-md'
                  : 'text-[#2A1B14] hover:text-[#9E1B32] hover:bg-white/40'
              }`}
            >
              <span>{getCollectionIcon(col.id)}</span>
              <span>{col.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Collection Description Strip */}
      {COLLECTIONS.map((col) => {
        if (col.id !== activeCollection) return null;
        return (
          <div
            key={col.id}
            id={`collection-panel-${col.id}`}
            role="tabpanel"
            className="mt-4 text-center max-w-xl px-4 animate-in fade-in duration-300"
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
