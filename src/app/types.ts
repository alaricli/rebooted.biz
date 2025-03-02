export type Product = {
  id: number;
  name: string;
  active: boolean;
  created: string; // ISO date string (e.g., "2025-03-01T12:14:11.267443")
  brand: string;
  condition: string;
  color: string;
  blurb: string;
  description: string;
  notes: string;
  category: string;
  subCategory: string;
  unitCost: number;
  unitAmount: number;
  stripeProductId: string;
  stripePriceId: string;
  stripeTaxCodeId: string | null;
  stripeStatementDescription: string | null;
  stock: number;
  sku: string;
  modelNumber: string;
  serialNumber: string;
  tags: string[];
  productImages: string[];
  mainImage: string;
};
