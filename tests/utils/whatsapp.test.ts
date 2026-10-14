import { describe, it, expect } from 'vitest';
import { formatWhatsAppOrderMessage, generateWhatsAppUrl } from '@/utils/whatsapp';
import type { TrayItem, OrderCustomerDetails } from '@/types/tray';

describe('WhatsApp Formatter', () => {
  const dummyItems: TrayItem[] = [
    {
      product: {
        id: 'chocolate-cake',
        name: 'Decadent Moist Chocolate Cake',
        collectionId: 'artisan-breads',
        tagline: 'Signature bake',
        description: 'Moist cake',
        price: 18000,
        unit: 'Whole Loaf',
        dietary: ['Signature'],
        isAvailable: true,
        ingredients: ['Cocoa'],
        shelfLife: '5 days',
        storage: 'Room temp',
        image: '/images/products/chocolate-cake.jpg',
      },
      quantity: 2,
    },
  ];

  const dummyDetails: OrderCustomerDetails = {
    customerName: 'Chidi Okafor',
    phoneNumber: '08012345678',
    deliveryArea: 'Lagos Island (Lekki / Ikoyi / VI)',
    deliveryAddress: '14 Admiralty Way, Lekki Phase 1',
    deliveryDate: '2026-10-16',
    specialInstructions: 'Please deliver chilled before noon',
  };

  it('formats clean structured order text with correct totals', () => {
    const text = formatWhatsAppOrderMessage(dummyItems, dummyDetails);
    expect(text).toContain('ARTISANA BAKERY — NEW ORDER');
    expect(text).toContain('Chidi Okafor');
    expect(text).toContain('2x Decadent Moist Chocolate Cake');
    expect(text).toContain('₦36,000');
    expect(text).toContain('14 Admiralty Way, Lekki Phase 1');
  });

  it('generates wa.me URL targeting +234 814 339 2377', () => {
    const url = generateWhatsAppUrl(dummyItems, dummyDetails);
    expect(url).toContain('https://wa.me/2348143392377?text=');
    expect(url).toContain(encodeURIComponent('Chidi Okafor'));
  });
});
