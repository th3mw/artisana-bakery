'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, MapPin, Calendar, User, Phone, FileText } from 'lucide-react';
import { useTray } from '@/context/TrayContext';
import { formatNaira, generateWhatsAppUrl } from '@/utils/whatsapp';
import { OrderCustomerDetails } from '@/types/tray';

interface OrderTrayDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function OrderTrayDrawer({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
}: OrderTrayDrawerProps = {}) {
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeItem,
    clearTray,
    isTrayOpen,
    closeTray,
  } = useTray();
  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isTrayOpen;
  const onClose = propsOnClose || closeTray;

  const [details, setDetails] = useState<OrderCustomerDetails>({
    customerName: '',
    phoneNumber: '',
    deliveryArea: 'Lagos Island (Lekki / Ikoyi / VI)',
    deliveryAddress: '',
    deliveryDate: '',
    specialInstructions: '',
  });

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsAppUrl = generateWhatsAppUrl(items, details);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order Tray"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FDF8F3] h-full shadow-2xl flex flex-col border-l border-[#EDE0D4] overflow-hidden animate-in slide-in-from-right duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDE0D4] bg-[#F7EFE6]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#9E1B32]" />
            <h2 className="font-serif text-xl font-bold text-[#2A1B14]">
              Your Order Tray
            </h2>
            <span className="bg-[#9E1B32] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearTray}
                title="Clear entire tray"
                className="text-[11px] text-[#7E6D64] hover:text-[#9E1B32] uppercase tracking-wider font-semibold mr-2 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close tray"
              className="p-1.5 text-[#2A1B14] hover:text-[#9E1B32] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tray Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1A3A2A]/5 text-[#C88A3E] mx-auto flex items-center justify-center animate__animated animate__pulse animate__infinite animate__slower">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2A1B14]">
                Your Tray is Empty
              </h3>
              <p className="text-xs text-[#7E6D64] max-w-xs mx-auto leading-relaxed">
                Add our signature chocolate cakes, fresh banana loaves, or upcycled coconut pantry staples to build your Lagos dispatch order.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 bg-[#9E1B32] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#7F1426] transition-colors cursor-pointer"
              >
                <span>Browse Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E6D64] block">
                  Items Selected ({items.length})
                </span>

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-xl bg-white border border-[#EDE0D4] flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#2A1B14] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#7E6D64]">
                        {item.product.unit} · {formatNaira(item.product.price)} each
                      </p>
                      <span className="text-xs font-bold text-[#9E1B32] mt-0.5 block">
                        {formatNaira(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-[#F7EFE6] px-2 py-1 rounded-full border border-[#EDE0D4]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, -1)}
                        aria-label={`Decrease quantity for ${item.product.name}`}
                        className="p-1 text-[#2A1B14] hover:text-[#9E1B32] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#2A1B14] min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, 1)}
                        aria-label={`Increase quantity for ${item.product.name}`}
                        className="p-1 text-[#2A1B14] hover:text-[#9E1B32] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove Action */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      aria-label={`Remove ${item.product.name}`}
                      className="p-1.5 text-[#7E6D64] hover:text-[#9E1B32] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="space-y-4 pt-4 border-t border-[#EDE0D4]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E6D64] block">
                  Lagos Delivery Details
                </span>

                <div className="space-y-3">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2A1B14] mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C88A3E]" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amaka Adeleke"
                      value={details.customerName}
                      onChange={(e) =>
                        setDetails({ ...details, customerName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#EDE0D4] text-base sm:text-xs text-[#2A1B14] focus:outline-none focus:border-[#9E1B32]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2A1B14] mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C88A3E]" />
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 08012345678"
                      value={details.phoneNumber}
                      onChange={(e) =>
                        setDetails({ ...details, phoneNumber: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#EDE0D4] text-base sm:text-xs text-[#2A1B14] focus:outline-none focus:border-[#9E1B32]"
                    />
                  </div>

                  {/* Delivery Area Dropdown */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2A1B14] mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C88A3E]" />
                      Delivery Zone
                    </label>
                    <select
                      value={details.deliveryArea}
                      onChange={(e) =>
                        setDetails({ ...details, deliveryArea: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#EDE0D4] text-base sm:text-xs text-[#2A1B14] focus:outline-none focus:border-[#9E1B32]"
                    >
                      <option value="Lagos Island (Lekki / Ikoyi / VI)">
                        Lagos Island (Lekki / Ikoyi / Victoria Island)
                      </option>
                      <option value="Lagos Mainland (Ikeja / Surulere / Yaba / Magodo)">
                        Lagos Mainland (Ikeja / Surulere / Yaba / Magodo)
                      </option>
                      <option value="Outside Central Lagos (Custom dispatch)">
                        Other Lagos / Greater Lagos Area
                      </option>
                    </select>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2A1B14] mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C88A3E]" />
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Plot 12 Admiralty Way, Lekki Phase 1"
                      value={details.deliveryAddress}
                      onChange={(e) =>
                        setDetails({ ...details, deliveryAddress: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#EDE0D4] text-base sm:text-xs text-[#2A1B14] focus:outline-none focus:border-[#9E1B32]"
                    />
                  </div>

                  {/* Preferred Delivery Date */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2A1B14] mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C88A3E]" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={details.deliveryDate}
                      onChange={(e) =>
                        setDetails({ ...details, deliveryDate: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#EDE0D4] text-base sm:text-xs text-[#2A1B14] focus:outline-none focus:border-[#9E1B32]"
                    />
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2A1B14] mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#C88A3E]" />
                      Special Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deliver chilled before 1:00pm"
                      value={details.specialInstructions}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          specialInstructions: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#EDE0D4] text-base sm:text-xs text-[#2A1B14] focus:outline-none focus:border-[#9E1B32]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Fixed Checkout Footer */}
        {items.length > 0 && (
          <div className="p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-[#EDE0D4] bg-[#F7EFE6] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#7E6D64] uppercase font-semibold block">
                  Estimated Subtotal
                </span>
                <span className="font-serif text-2xl font-bold text-[#2A1B14]">
                  {formatNaira(subtotal)}
                </span>
              </div>
              <span className="text-[11px] text-[#7E6D64] max-w-[160px] text-right font-light leading-tight">
                *Rider delivery fee confirmed via WhatsApp
              </span>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#9E1B32] hover:bg-[#7F1426] text-white rounded-full font-bold text-xs uppercase tracking-[0.18em] shadow-md transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99] text-center hover:animate__animated hover:animate__pulse"
            >
              <MessageCircle className="w-4 h-4 text-[#E5B370]" />
              <span>Send Order to WhatsApp</span>
            </a>

            <p className="text-[10px] text-center text-[#7E6D64]">
              Connected directly to Lagos fulfillment: +234 814 339 2377
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
