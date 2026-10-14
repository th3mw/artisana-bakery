import { describe, it, expect } from 'vitest';
import { PRODUCTS, COLLECTIONS, getProductsByCollection } from '@/data/products';

describe('Products Catalog', () => {
  it('defines 3 distinct collections', () => {
    expect(COLLECTIONS).toHaveLength(3);
    const ids = COLLECTIONS.map(c => c.id);
    expect(ids).toContain('artisan-breads');
    expect(ids).toContain('keto-fibre');
    expect(ids).toContain('coconut-pantry');
  });

  it('contains products for each collection with valid prices and descriptions', () => {
    COLLECTIONS.forEach(col => {
      const items = getProductsByCollection(col.id);
      expect(items.length).toBeGreaterThan(0);
      items.forEach(product => {
        expect(product.name).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.description).toBeTruthy();
        expect(product.ingredients.length).toBeGreaterThan(0);
      });
    });
  });

  it('includes signature bestseller Decadent Moist Chocolate Cake in artisan-breads', () => {
    const breads = getProductsByCollection('artisan-breads');
    const chocolateCake = breads.find(p => p.name.includes('Chocolate Cake'));
    expect(chocolateCake).toBeDefined();
    expect(chocolateCake?.badge).toBe('Signature Bake');
  });
});
