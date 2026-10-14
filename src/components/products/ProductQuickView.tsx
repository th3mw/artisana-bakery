'use client';

import React from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Clock, PackageCheck } from 'lucide-react';
import { Product } from '@/types/product';
import { useTray } from '@/context/TrayContext';
import { formatNaira } from '@/utils/whatsapp';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addItem } = useTray();
  const [added, setAdded] = React.useState(false);

  React.useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FDF8F3] rounded-2xl shadow-2xl overflow-hidden border border-[#EDE0D4] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDE0D4] bg-[#F7EFE6]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-[#C88A3E] text-white">
              {product.badge || 'Artisana'}
            </span>
            <span className="text-xs text-[#7E6D64] font-medium">{product.unit}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="p-1.5 text-[#2A1B14] hover:text-[#9E1B32] rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h2
              id="quick-view-title"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B14] mb-2"
            >
              {product.name}
            </h2>
            <p className="font-serif italic text-base text-[#C88A3E] mb-3">
              {product.tagline}
            </p>
            <p className="text-sm font-light text-[#63534B] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Dietary Badges */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#7E6D64] mb-2">
              Dietary & Craft
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.dietary.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#1A3A2A]/8 text-[#1A3A2A] border border-[#1A3A2A]/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EDE0D4]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A1B14] mb-2 flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-[#C88A3E]" />
              Real Ingredients (No Preservatives)
            </h4>
            <p className="text-xs text-[#63534B] leading-relaxed">
              {product.ingredients.join(', ')}
            </p>
          </div>

          {/* Storage & Shelf life */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#63534B]">
            <div className="p-3.5 rounded-lg bg-[#F7EFE6] border border-[#EDE0D4]">
              <span className="font-semibold text-[#2A1B14] block mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C88A3E]" />
                Shelf Life
              </span>
              <span>{product.shelfLife}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#F7EFE6] border border-[#EDE0D4]">
              <span className="font-semibold text-[#2A1B14] block mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C88A3E]" />
                Storage Advice
              </span>
              <span>{product.storage}</span>
            </div>
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="p-6 border-t border-[#EDE0D4] bg-[#F7EFE6] flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] text-[#7E6D64] uppercase font-semibold">
              Price
            </span>
            <span className="text-2xl font-bold font-serif text-[#9E1B32]">
              {formatNaira(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 max-w-xs py-3 px-6 bg-[#9E1B32] hover:bg-[#7F1426] text-white rounded-full font-semibold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-[#E5B370]" />
                <span>Added to Tray</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Tray</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
