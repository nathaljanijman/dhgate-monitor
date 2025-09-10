export interface StaffelTier {
  id: string;
  minQty: number;
  maxQty?: number;
  unitPrice: number;
}

export interface CostItem {
  id: string;
  label: string;
  type: 'per_unit' | 'per_batch' | 'percent';
  value: number;
  description?: string;
}

export interface CalculationResult {
  quantity: number;
  unitCost: number;
  totalCost: number;
  margin: number;
  marginPercentage: number;
  breakEven: boolean;
}

export interface Project {
  id: string;
  name: string;
  url?: string;
  currency: string;
  staffelTiers: StaffelTier[];
  costs: CostItem[];
  sellingPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScrapedProduct {
  name: string;
  currency: string;
  staffelTiers: StaffelTier[];
  minOrderQty: number;
  shippingOptions: string[];
  success: boolean;
  error?: string;
}
