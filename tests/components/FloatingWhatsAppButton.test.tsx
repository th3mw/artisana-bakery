import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { FloatingWhatsAppButton } from '@/components/layout/FloatingWhatsAppButton';
import { ARTISANA_WHATSAPP_PHONE } from '@/utils/whatsapp';

describe('FloatingWhatsAppButton Component', () => {
  it('renders floating message button with correct link to WhatsApp phone', () => {
    render(<FloatingWhatsAppButton />);

    const link = screen.getByRole('link', { name: /Message Us on WhatsApp/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining(`wa.me/${ARTISANA_WHATSAPP_PHONE}`));
    expect(link).toHaveAttribute('href', expect.stringContaining('2348143392377'));
    expect(screen.getByText(/Message Us/i)).toBeInTheDocument();
  });
});
