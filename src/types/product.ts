export type CollectionId = 'artisan-breads' | 'keto-fibre' | 'coconut-pantry';

export interface Collection {
  id: CollectionId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
}

export interface Product {
  id: string;
  name: string;
  collectionId: CollectionId;
  tagline: string;
  description: string;
  price: number; // in NGN
  unit: string;  // e.g. "500g loaf", "1 jar (250ml)"
  dietary: string[]; // ["Keto", "Gluten-Free", "Zero White Flour"]
  badge?: string; // "Signature Bake", "Bestseller", "Upcycled", "Available to Order"
  isAvailable: boolean;
  ingredients: string[];
  shelfLife: string;
  storage: string;
  image: string;
}
