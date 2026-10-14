import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ArtisanaBakeryPage from '@/app/page';
import { TrayProvider } from '@/context/TrayContext';

describe('ArtisanaBakeryPage Integration', () => {
  it('renders all sections and allows collection tab switching', () => {
    render(
      <TrayProvider>
        <ArtisanaBakeryPage />
      </TrayProvider>
    );

    // Header & Hero
    expect(screen.getByText(/Delivered Chilled Across Lagos/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /Baked With Obsession/i })
    ).toBeInTheDocument();

    // Default Collection: Artisan Breads
    expect(
      screen.getByRole('heading', { level: 3, name: /Decadent Moist Chocolate Cake/i })
    ).toBeInTheDocument();

    // Switch to Keto & Fibre
    const ketoTab = screen.getByRole('tab', { name: /Keto & Fibre Line/i });
    fireEvent.click(ketoTab);
    expect(
      screen.getByRole('heading', { level: 3, name: /Coconut Flour Banana Bread/i })
    ).toBeInTheDocument();

    // Switch to Coconut Pantry
    const pantryTab = screen.getByRole('tab', { name: /The Coconut Pantry/i });
    fireEvent.click(pantryTab);
    expect(
      screen.getByRole('heading', { level: 3, name: /Artisana Desiccated Coconut/i })
    ).toBeInTheDocument();

    // Waste-to-Wealth Section & FAQ
    expect(screen.getByText(/Waste-to-Wealth:/i)).toBeInTheDocument();
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
  });
});
