'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useTray } from '@/context/TrayContext';
import { formatNaira } from '@/utils/whatsapp';

interface MobileBottomBarProps {
  onOpenTray?: () => void;
}

export function MobileBottomBar({ onOpenTray }: MobileBottomBarProps = {}) {
  const { itemCount, subtotal, openTray } = useTray();
  const handleOpenTray = onOpenTray || openTray;

  if (itemCount === 0) return null;

  return (
    <aside
      aria-label="Mobile Order Summary"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-[#EDE0D4] shadow-lg animate-in slide-in-from-bottom duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#9E1B32] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 bg-[#C88A3E] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center border-2 border-white">
              {itemCount}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#7E6D64] uppercase font-semibold block leading-tight">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in Tray
            </span>
            <span className="font-serif text-sm font-bold text-[#2A1B14]">
              {formatNaira(subtotal)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenTray}
          className="px-5 py-2.5 bg-[#9E1B32] hover:bg-[#7F1426] active:scale-[0.96] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>View Tray</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
