'use client';

import React from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Truck, Leaf, Award } from 'lucide-react';
import { useOptionalTray } from '@/context/TrayContext';

interface HeroSectionProps {
  onExplore?: () => void;
  onOrderClick?: () => void;
}

export function HeroSection({ onExplore, onOrderClick }: HeroSectionProps = {}) {
  const tray = useOptionalTray();
  const handleOrderClick = onOrderClick || (tray ? tray.openTray : () => {});
  return (
    <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#EDE0D4]">
      {/* Decorative Warm Radial Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(200, 138, 62, 0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(158, 27, 50, 0.12) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A3A2A]/8 text-[#C88A3E] border border-[#C88A3E]/30 text-[11px] font-bold uppercase tracking-[0.25em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C88A3E]" />
          <span>Artisanal Bakery & Pantry · Lagos</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#2A1B14] tracking-tight leading-[1.08] mb-6">
          Baked With <br />
          <span className="text-[#9E1B32] italic font-normal">Obsession.</span>
        </h1>

        {/* Italic Culinary Subtitle */}
        <p className="font-serif italic text-xl sm:text-2xl text-[#1A3A2A] max-w-2xl mx-auto mb-6">
          Handcrafted Luxury Cakes, Low-Carb Keto Bakes & Circular Upcycled Staples.
        </p>

        {/* Descriptive Body */}
        <p className="text-sm sm:text-base font-light text-[#63534B] max-w-2xl mx-auto leading-relaxed mb-10">
          Slow-baked to an impossible moistness in Lagos. We take zero shortcuts — blending rich dark cocoa, ripe bananas, grain-free keto fibres, and circular coconut pulp with zero preservatives.
        </p>

        {/* Fast Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#collections"
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 bg-[#9E1B32] hover:bg-[#7F1426] active:scale-[0.97] text-white rounded-full font-semibold text-xs uppercase tracking-[0.2em] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Explore The Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            type="button"
            onClick={handleOrderClick}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#2A1B14] active:scale-[0.97] text-[#2A1B14] hover:text-white border-2 border-[#2A1B14] rounded-full font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Order Tray</span>
          </button>
        </div>

        {/* Trust Badges Strip */}
        <div className="pt-10 border-t border-[#EDE0D4] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1A3A2A]/8 flex items-center justify-center text-[#1A3A2A] mb-2">
              <ShieldCheck className="w-5 h-5 text-[#C88A3E]" />
            </div>
            <span className="text-[11px] font-bold text-[#2A1B14] uppercase tracking-wider">
              No Preservatives
            </span>
            <span className="text-[10px] text-[#7E6D64]">Baked Fresh Daily</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1A3A2A]/8 flex items-center justify-center text-[#1A3A2A] mb-2">
              <Award className="w-5 h-5 text-[#C88A3E]" />
            </div>
            <span className="text-[11px] font-bold text-[#2A1B14] uppercase tracking-wider">
              100% Real Ingredients
            </span>
            <span className="text-[10px] text-[#7E6D64]">No Artificial Flavours</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1A3A2A]/8 flex items-center justify-center text-[#1A3A2A] mb-2">
              <Leaf className="w-5 h-5 text-[#C88A3E]" />
            </div>
            <span className="text-[11px] font-bold text-[#2A1B14] uppercase tracking-wider">
              Keto & Fibre Range
            </span>
            <span className="text-[10px] text-[#7E6D64]">Grain-Free & Clean</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#1A3A2A]/8 flex items-center justify-center text-[#1A3A2A] mb-2">
              <Truck className="w-5 h-5 text-[#C88A3E]" />
            </div>
            <span className="text-[11px] font-bold text-[#2A1B14] uppercase tracking-wider">
              Chilled Lagos Delivery
            </span>
            <span className="text-[10px] text-[#7E6D64]">Island & Mainland</span>
          </div>

          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-full bg-[#1A3A2A]/8 flex items-center justify-center text-[#1A3A2A] mb-2">
              <Sparkles className="w-5 h-5 text-[#C88A3E]" />
            </div>
            <span className="text-[11px] font-bold text-[#2A1B14] uppercase tracking-wider">
              Waste-to-Wealth
            </span>
            <span className="text-[10px] text-[#7E6D64]">Upcycled Coconut Pulp</span>
          </div>
        </div>
      </div>
    </section>
  );
}
