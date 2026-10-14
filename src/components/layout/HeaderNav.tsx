'use client';

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useTray } from '@/context/TrayContext';

interface HeaderNavProps {
  onOpenTray: () => void;
}

export function HeaderNav({ onOpenTray }: HeaderNavProps) {
  const { itemCount } = useTray();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#FDF8F3]/95 backdrop-blur-md border-b border-[#EDE0D4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex flex-col group">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#9E1B32] group-hover:text-[#7F1426] transition-colors leading-none">
            ARTISANA
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C88A3E] uppercase mt-1">
            Bakery · Mohfood
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#collections"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1B14] hover:text-[#9E1B32] transition-colors"
          >
            Collections
          </a>
          <a
            href="#sustainability"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1B14] hover:text-[#9E1B32] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C88A3E]" />
            Waste-to-Wealth
          </a>
          <a
            href="#story"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1B14] hover:text-[#9E1B32] transition-colors"
          >
            Story
          </a>
          <a
            href="#faq"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1B14] hover:text-[#9E1B32] transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* Right CTA / Order Tray Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenTray}
            aria-label={`Order Tray with ${itemCount} items`}
            className="relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-[#9E1B32] hover:bg-[#7F1426] text-white rounded-full font-medium text-xs tracking-wider uppercase shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Order Tray</span>
            {itemCount > 0 && (
              <span className="bg-[#C88A3E] text-white font-bold text-[11px] px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-xs">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-[#2A1B14] hover:text-[#9E1B32]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EDE0D4] bg-[#FDF8F3] px-6 py-6 space-y-4">
          <a
            href="#collections"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#2A1B14] hover:text-[#9E1B32]"
          >
            Collections
          </a>
          <a
            href="#sustainability"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#2A1B14] hover:text-[#9E1B32]"
          >
            Waste-to-Wealth (Circular Pulp)
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#2A1B14] hover:text-[#9E1B32]"
          >
            Our Story & Craft
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#2A1B14] hover:text-[#9E1B32]"
          >
            Frequently Asked Questions
          </a>
          <div className="pt-4 border-t border-[#EDE0D4] text-xs text-[#7E6D64]">
            Order Line: <a href="tel:08143392377" className="font-semibold text-[#9E1B32]">0814 339 2377</a>
          </div>
        </div>
      )}
    </nav>
  );
}
