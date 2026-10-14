import { TrayItem, OrderCustomerDetails } from '@/types/tray';

export const ARTISANA_WHATSAPP_PHONE = '2348143392377';

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

export function formatWhatsAppOrderMessage(
  items: TrayItem[],
  details: OrderCustomerDetails
): string {
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const lines: string[] = [
    '🍞 *ARTISANA BAKERY — NEW ORDER*',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `*Customer:* ${details.customerName || 'N/A'}`,
    `*Phone:* ${details.phoneNumber || 'N/A'}`,
    `*Delivery Area:* ${details.deliveryArea || 'Lagos Dispatch'}`,
    `*Delivery Address:* ${details.deliveryAddress || 'N/A'}`,
    `*Delivery Date:* ${details.deliveryDate || 'Next Available Bake'}`,
    '',
    '*ORDER ITEMS:*',
  ];

  items.forEach((item) => {
    const itemTotal = item.product.price * item.quantity;
    lines.push(
      `• ${item.quantity}x ${item.product.name} (${item.product.unit}) — ${formatNaira(itemTotal)}`
    );
  });

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push(`*Estimated Subtotal:* ${formatNaira(subtotal)}`);
  lines.push('*(Delivery fee confirmed by dispatch team)*');

  if (details.specialInstructions && details.specialInstructions.trim()) {
    lines.push('');
    lines.push(`*Special Instructions:* ${details.specialInstructions.trim()}`);
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('_Sent via bakery.mohfood.com — Baked Fresh Daily in Lagos_');

  return lines.join('\n');
}

export function generateWhatsAppUrl(
  items: TrayItem[],
  details: OrderCustomerDetails
): string {
  const message = formatWhatsAppOrderMessage(items, details);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${ARTISANA_WHATSAPP_PHONE}?text=${encoded}`;
}
