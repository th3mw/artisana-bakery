import React from 'react';
import { Phone, MessageCircle, MapPin, Heart, ArrowUp } from 'lucide-react';
import { ARTISANA_WHATSAPP_PHONE } from '@/utils/whatsapp';

export function Footer() {
  return (
    <footer className="bg-[#2A1B14] text-[#E8DDD0] pt-16 pb-12 border-t border-[#4A3528]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#4A3528]/80">
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
              ARTISANA <span className="text-[#C88A3E] font-normal">BAKERY</span>
            </h3>
            <p className="text-xs leading-relaxed text-[#D0C2B6] font-light max-w-sm">
              Premium handcrafted artisan bakes, diabetic & keto-friendly lines, and sustainable coconut pantry staples. Made fresh daily in Lagos with zero shortcuts.
            </p>
            <p className="text-[11px] text-[#C88A3E] tracking-wider uppercase font-semibold">
              A MOHFOOD Enterprise
            </p>
          </div>

          {/* Collections Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C88A3E]">
              Our Bakes
            </h4>
            <ul className="space-y-2 text-xs text-[#D0C2B6]">
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Decadent Chocolate Cake
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Moist Banana Bread
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Keto Coconut Flour Loaf
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Cabbage Swallow Flour
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Upcycled Coconut Flakes & Oil
                </a>
              </li>
            </ul>
          </div>

          {/* Lagos Delivery & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C88A3E]">
              Lagos Dispatch
            </h4>
            <div className="text-xs text-[#D0C2B6] space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C88A3E] shrink-0 mt-0.5" />
                <span>Daily Chilled Delivery across Lagos Island, Lekki, Ikoyi, Ikeja & Mainland.</span>
              </p>
              <p>
                <strong className="text-white">Bake Hours:</strong> Mon – Sat, 7:00am – 6:00pm
              </p>
              <p className="text-[11px] text-[#A69588]">
                *Orders placed before 2:00pm dispatched next morning.
              </p>
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C88A3E]">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#D0C2B6]">
              <a
                href="tel:08143392377"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C88A3E]" />
                <span>0814 339 2377</span>
              </a>
              <a
                href={`https://wa.me/${ARTISANA_WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#E5B370] hover:text-white transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order Line</span>
              </a>
              <p className="text-[11px] text-[#A69588] pt-2">
                Lagos, Nigeria · Fresh Batch Guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A69588]">
          <p>© {new Date().getFullYear()} Artisana Bakery by Mohfood. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#9E1B32] fill-current" />
            <span>in Lagos</span>
            <span className="mx-2">·</span>
            <a
              href="#"
              aria-label="Back to top"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              Back to top <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
