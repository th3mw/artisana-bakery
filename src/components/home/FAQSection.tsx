'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { ARTISANA_WHATSAPP_PHONE } from '@/utils/whatsapp';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does ordering and delivery work across Lagos?',
    answer:
      'We bake fresh daily! You can browse our 3 collections, add items to your Order Tray, and tap "Send Order to WhatsApp". Your order details are sent directly to our Lagos fulfillment team (+234 814 339 2377), who confirm delivery slot and dispatch chilled riders across both Lagos Island and Mainland.',
  },
  {
    question: 'How long do the cakes and banana bread stay fresh?',
    answer:
      'Because we never add artificial preservatives, our moist banana breads stay fresh for 4 days at room temperature or up to 10 days refrigerated. The Decadent Chocolate Cake and Red Velvet stay exceptionally moist for 5 days refrigerated.',
  },
  {
    question: 'Are the Keto & Fibre products truly 100% white-flour free?',
    answer:
      'Yes, absolutely. Our Keto & Fibre range uses zero wheat or white flour. We formulate exclusively with our own upcycled coconut flour, almond meal, prebiotic psyllium, and monk fruit / stevia sweetening to keep glycemic impact minimal.',
  },
  {
    question: 'What does "Waste-to-Wealth" mean for the Coconut Pantry?',
    answer:
      'Mohfood produces thousands of fresh Greek yoghurt parfaits weekly, requiring fresh coconut milk. Instead of throwing away the pressed pulp, Artisana Bakery recovers this clean, fibrous coconut meat, sun-drying and cold-pressing it into fine keto flour, crispy flakes, and virgin coconut oil. It is 100% circular upcycling.',
  },
  {
    question: 'Can I order for parties, events, or corporate gifting in Lagos?',
    answer:
      'Yes! We cater whole cakes, artisan loaf gift hampers, and pantry bundles for events and corporate gifts. Reach out via WhatsApp or call us on 0814 339 2377 at least 48 hours before your event.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#F7EFE6] border-b border-[#EDE0D4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C88A3E] block mb-2">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A1B14] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#7E6D64] mt-2 font-light">
            Everything you need to know about our daily bakes, storage, and Lagos delivery.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-[#EDE0D4] overflow-hidden transition-shadow shadow-xs hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#2A1B14] leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C88A3E] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#9E1B32]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#63534B] font-light leading-relaxed border-t border-[#F7EFE6] animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick contact banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#EDE0D4] text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-base font-bold text-[#2A1B14]">
              Have a special dietary question?
            </h4>
            <p className="text-xs text-[#7E6D64] mt-0.5">
              Chat directly with our Lagos head baker on WhatsApp.
            </p>
          </div>
          <a
            href={`https://wa.me/${ARTISANA_WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#1A3A2A] hover:bg-[#2D5842] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#E5B370]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
