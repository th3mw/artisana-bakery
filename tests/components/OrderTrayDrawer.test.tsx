import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrderTrayDrawer } from '@/components/tray/OrderTrayDrawer';
import { TrayProvider, useTray } from '@/context/TrayContext';
import { PRODUCTS } from '@/data/products';

const TestApp = () => {
  const { addItem } = useTray();
  return (
    <div>
      <button onClick={() => addItem(PRODUCTS[0], 2)}>Add Items</button>
      <OrderTrayDrawer isOpen={true} onClose={() => {}} />
    </div>
  );
};

describe('OrderTrayDrawer', () => {
  it('renders order summary and WhatsApp checkout button when items exist', () => {
    render(
      <TrayProvider>
        <TestApp />
      </TrayProvider>
    );
    fireEvent.click(screen.getByText('Add Items'));
    expect(screen.getByText(PRODUCTS[0].name)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Send Order to WhatsApp/i })
    ).toBeInTheDocument();
  });
});
