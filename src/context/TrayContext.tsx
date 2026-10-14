'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { TrayItem } from '@/types/tray';

interface TrayContextType {
  items: TrayItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearTray: () => void;
  isTrayOpen: boolean;
  openTray: () => void;
  closeTray: () => void;
  isHydrated: boolean;
}

const STORAGE_KEY = 'artisana_tray_v1';

const TrayContext = createContext<TrayContextType | undefined>(undefined);

export function TrayProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Sync from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. incognito)
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist to localStorage on change once hydrated
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota/incognito errors
    }
  }, [items, isHydrated]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is TrayItem => item !== null);
    });
  };

  const clearTray = () => {
    setItems([]);
  };

  const openTray = () => setIsTrayOpen(true);
  const closeTray = () => setIsTrayOpen(false);

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0
  );

  return (
    <TrayContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearTray,
        isTrayOpen,
        openTray,
        closeTray,
        isHydrated,
      }}
    >
      {children}
    </TrayContext.Provider>
  );
}

export function useTray() {
  const context = useContext(TrayContext);
  if (!context) {
    throw new Error('useTray must be used within a TrayProvider');
  }
  return context;
}

export function useOptionalTray() {
  return useContext(TrayContext);
}
