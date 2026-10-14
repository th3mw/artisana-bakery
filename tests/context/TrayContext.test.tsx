import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TrayProvider, useTray } from '@/context/TrayContext';
import { PRODUCTS } from '@/data/products';

describe('TrayContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <TrayProvider>{children}</TrayProvider>
  );

  it('starts with an empty tray', () => {
    const { result } = renderHook(() => useTray(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it('adds product to tray and increments quantity', () => {
    const { result } = renderHook(() => useTray(), { wrapper });
    act(() => {
      result.current.addItem(PRODUCTS[0], 1);
    });
    expect(result.current.itemCount).toBe(1);
    expect(result.current.subtotal).toBe(PRODUCTS[0].price);

    act(() => {
      result.current.addItem(PRODUCTS[0], 2);
    });
    expect(result.current.itemCount).toBe(3);
    expect(result.current.subtotal).toBe(PRODUCTS[0].price * 3);
  });

  it('removes item when quantity reaches zero', () => {
    const { result } = renderHook(() => useTray(), { wrapper });
    act(() => {
      result.current.addItem(PRODUCTS[0], 1);
    });
    act(() => {
      result.current.updateQuantity(PRODUCTS[0].id, -1);
    });
    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
  });
});
