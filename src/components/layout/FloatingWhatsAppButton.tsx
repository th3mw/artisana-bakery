'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ARTISANA_WHATSAPP_PHONE } from '@/utils/whatsapp';

export function FloatingWhatsAppButton() {
  const defaultMessage = encodeURIComponent(
    'Hello Artisana Bakery! 🍞 I would like to inquire about your fresh bakes and daily Lagos delivery.'
  );
  const whatsappUrl = `https://wa.me/${ARTISANA_WHATSAPP_PHONE}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed z-40 bottom-20 md:bottom-8 right-4 md:right-8 animate__animated animate__bounceIn animate__delay-1s"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Us on WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-lg hover:shadow-xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-sans text-xs md:text-sm font-bold tracking-wide uppercase">
          Message Us
        </span>
      </a>
    </aside>
  );
}
