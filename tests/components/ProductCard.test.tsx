import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/products/ProductCard';
import { TrayProvider } from '@/context/TrayContext';
import { PRODUCTS } from '@/data/products';

describe('ProductCard', () => {
  it('displays product info and adds item to tray on button click', () => {
    render(
      <TrayProvider>
        <ProductCard product={PRODUCTS[0]} onQuickView={() => {}} />
      </TrayProvider>
    );
    expect(
      screen.getByRole('heading', { level: 3, name: PRODUCTS[0].name })
    ).toBeInTheDocument();
    const addBtn = screen.getByRole('button', { name: /Add.*to Tray/i });
    fireEvent.click(addBtn);
    expect(screen.getByText(/Added/i)).toBeInTheDocument();
  });
});
