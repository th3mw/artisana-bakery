import React from 'react';
import { Heart, Sparkles, Flame, Clock } from 'lucide-react';

export function BrandStory() {
  return (
    <section id="story" className="py-20 sm:py-28 bg-[#FDF8F3] border-b border-[#EDE0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C88A3E] block">
              Our Craft & Roots
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2A1B14] tracking-tight leading-tight">
              Made in Lagos, With <br />
              <span className="text-[#9E1B32] italic font-normal">
                Love & Obsession.
              </span>
            </h2>

            <div className="w-16 h-0.5 bg-[#C88A3E]" />

            <div className="space-y-4 text-sm sm:text-base font-light text-[#63534B] leading-relaxed">
              <p>
                Artisana Bakery was born from a simple but uncompromising standard: Lagos deserves baked goods made with real integrity, intense flavours, and absolutely zero industrial shortcuts.
              </p>
              <p>
                Whether it is our signature dark chocolate cake layered with deep ganache, warm spiced banana bread, or our zero-grain keto line — we never cut corners with cheap starches or chemical preservatives.
              </p>
              <p>
                Food tastes infinitely better when it was baked this morning. We mix, proof, bake, and dispatch fresh every single day across Lagos.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#EDE0D4]">
              <div className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-full bg-[#9E1B32]/10 flex items-center justify-center text-[#9E1B32] mb-2.5">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#2A1B14] mb-1">
                  Slow-Bake Method
                </h4>
                <p className="text-xs text-[#7E6D64] leading-relaxed">
                  Gentle oven temperatures locking in moisture for days.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-full bg-[#1A3A2A]/10 flex items-center justify-center text-[#1A3A2A] mb-2.5">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#2A1B14] mb-1">
                  Daily Fresh Batches
                </h4>
                <p className="text-xs text-[#7E6D64] leading-relaxed">
                  No warehouse freezing. Baked right before chilled dispatch.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-full bg-[#C88A3E]/10 flex items-center justify-center text-[#C88A3E] mb-2.5">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#2A1B14] mb-1">
                  Lagos Pride
                </h4>
                <p className="text-xs text-[#7E6D64] leading-relaxed">
                  Supporting Nigerian coconut growers and local kitchens.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual / Quote Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#2A1B14] to-[#1E110A] p-8 sm:p-10 text-white shadow-2xl overflow-hidden border border-[#4A3528]">
              {/* Decorative background sparkles */}
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-[#9E1B32]/20 blur-2xl" />

              <div className="relative space-y-6">
                <div className="flex items-center gap-2 text-[#E5B370]">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    The Artisana Standard
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                  &ldquo;Every loaf is a promise: real ingredients, extraordinary tenderness, zero compromises.&rdquo;
                </h3>

                <p className="text-xs text-[#D0C2B6] font-light leading-relaxed">
                  From white-flour chocolate cravings to keto health goals, we bake food that satisfies both the palate and the body.
                </p>

                <div className="pt-4 border-t border-[#4A3528] flex items-center justify-between text-xs text-[#A69588]">
                  <span>Handcrafted in Lagos</span>
                  <span className="text-[#E5B370] font-semibold">Artisana Bakery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
