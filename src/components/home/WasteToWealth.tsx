import React from 'react';
import { Sparkles, Recycle, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface WasteToWealthProps {
  onExplorePantry?: () => void;
}

export function WasteToWealth({ onExplorePantry }: WasteToWealthProps = {}) {
  return (
    <section
      id="sustainability"
      className="relative overflow-hidden bg-[#1A3A2A] text-white py-16 sm:py-24 border-y border-[#2D5842]"
    >
      {/* Background glow and subtle mesh */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C88A3E_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C88A3E]/15 border border-[#C88A3E]/40 text-[#E5B370] text-[11px] font-bold tracking-[0.25em] uppercase">
              <Recycle className="w-3.5 h-3.5 text-[#E5B370]" />
              <span>Closed-Loop Sustainability</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Waste-to-Wealth: <br />
              <span className="text-[#C88A3E] italic font-normal">
                Upcycled Coconut Pulp
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#D0C2B6] font-light leading-relaxed">
              Every morning in our Lagos kitchen, fresh mature coconuts are pressed to make milk for Mohfood’s famous Greek yoghurts and parfaits. In traditional kitchens, this precious pressed pulp was thrown away.
            </p>

            <p className="text-sm sm:text-base text-[#D0C2B6] font-light leading-relaxed">
              At Artisana Bakery, we transformed this byproduct into our crown jewel: cold-milling it into prebiotic <strong className="text-white font-medium">keto flour</strong>, oven-toasting <strong className="text-white font-medium">crunchy coconut flakes</strong>, extracting raw <strong className="text-white font-medium">virgin oil</strong>, and simmering nostalgic chewy <strong className="text-white font-medium">Lagos coconut candy</strong>. Zero waste, maximum nourishment.
            </p>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2D5842]">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block font-serif text-2xl font-bold text-[#E5B370] mb-1">
                  100%
                </span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-0.5">
                  Circular Upcycled
                </span>
                <span className="text-[11px] text-[#A69588]">
                  From same virgin coconut meat
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block font-serif text-2xl font-bold text-[#E5B370] mb-1">
                  0%
                </span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-0.5">
                  White Flour & Starch
                </span>
                <span className="text-[11px] text-[#A69588]">
                  High natural gut-friendly fibre
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block font-serif text-2xl font-bold text-[#E5B370] mb-1">
                  Zero
                </span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-0.5">
                  Landfill Waste
                </span>
                <span className="text-[11px] text-[#A69588]">
                  Transforming pulp into staples
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#collections"
                onClick={onExplorePantry}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#C88A3E] hover:bg-[#9A6624] active:scale-[0.97] text-white rounded-full font-semibold text-xs uppercase tracking-[0.2em] shadow-md transition-all cursor-pointer group"
              >
                <span>Shop The Coconut Pantry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Editorial Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-8 border border-white/15 backdrop-blur-sm shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#C88A3E]/20 flex items-center justify-center text-[#E5B370]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    The Closed Loop Promise
                  </h3>
                  <p className="text-xs text-[#E5B370] tracking-wider uppercase font-semibold">
                    Mohfood · Artisana Ecosystem
                  </p>
                </div>
              </div>

              <blockquote className="font-serif italic text-base text-[#E8DDD0] border-l-2 border-[#C88A3E] pl-4 py-1 leading-relaxed">
                &ldquo;We don&apos;t believe in waste when working with nature&apos;s finest ingredients. What began as an operational byproduct is now Lagos&apos;s most honest keto flour and pantry line.&rdquo;
              </blockquote>

              <div className="space-y-3 pt-2 text-xs text-[#D0C2B6]">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C88A3E] shrink-0" />
                  <span>Unrefined, naturally sun-dried and cold-milled</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-[#C88A3E] shrink-0" />
                  <span>Sourced directly from local Nigerian coconut groves</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
