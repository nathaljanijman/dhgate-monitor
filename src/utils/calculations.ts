import { StaffelTier, CostItem, CalculationResult } from '../types';

export const calculateMargin = (
  quantity: number,
  staffelTiers: StaffelTier[],
  costs: CostItem[],
  sellingPrice: number
): CalculationResult => {
  // Find applicable staffel tier
  const tier = staffelTiers.find(t => 
    quantity >= t.minQty && (!t.maxQty || quantity <= t.maxQty)
  );
  
  if (!tier) {
    return {
      quantity,
      unitCost: 0,
      totalCost: 0,
      margin: 0,
      marginPercentage: 0,
      breakEven: false,
    };
  }
  
  const unitCost = tier.unitPrice;
  const totalPurchaseCost = unitCost * quantity;
  
  // Calculate costs
  let totalCosts = 0;
  
  costs.forEach(cost => {
    switch (cost.type) {
      case 'per_unit':
        totalCosts += cost.value * quantity;
        break;
      case 'per_batch':
        totalCosts += cost.value;
        break;
      case 'percent':
        totalCosts += (sellingPrice * quantity * cost.value) / 100;
        break;
    }
  });
  
  const totalCost = totalPurchaseCost + totalCosts;
  const margin = (sellingPrice * quantity) - totalCost;
  const marginPercentage = sellingPrice > 0 ? (margin / (sellingPrice * quantity)) * 100 : 0;
  
  return {
    quantity,
    unitCost,
    totalCost,
    margin,
    marginPercentage,
    breakEven: margin >= 0,
  };
};

export const calculateBreakEvenPoint = (
  staffelTiers: StaffelTier[],
  costs: CostItem[],
  sellingPrice: number
): number => {
  if (sellingPrice <= 0) return 0;
  
  // Find the tier with lowest unit price
  const lowestTier = staffelTiers.reduce((lowest, current) =>
    current.unitPrice < lowest.unitPrice ? current : lowest
  );
  
  const unitCost = lowestTier.unitPrice;
  const unitMargin = sellingPrice - unitCost;
  
  if (unitMargin <= 0) return 0;
  
  // Calculate fixed costs per unit
  let fixedCostsPerUnit = 0;
  costs.forEach(cost => {
    if (cost.type === 'per_batch') {
      fixedCostsPerUnit += cost.value;
    } else if (cost.type === 'percent') {
      fixedCostsPerUnit += (sellingPrice * cost.value) / 100;
    }
  });
  
  const breakEvenQty = Math.ceil(fixedCostsPerUnit / unitMargin);
  return Math.max(breakEvenQty, lowestTier.minQty);
};

export const generateQuantityRange = (maxQty: number, steps: number = 20): number[] => {
  const range = [];
  const step = Math.max(1, Math.floor(maxQty / steps));
  
  for (let i = 1; i <= maxQty; i += step) {
    range.push(i);
  }
  
  if (range[range.length - 1] !== maxQty) {
    range.push(maxQty);
  }
  
  return range;
};

export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const validateStaffelTiers = (tiers: StaffelTier[]): string[] => {
  const errors: string[] = [];
  
  if (tiers.length === 0) {
    errors.push('Minimaal één staffel tier is vereist');
    return errors;
  }
  
  // Check for gaps and overlaps
  const sortedTiers = [...tiers].sort((a, b) => a.minQty - b.minQty);
  
  for (let i = 0; i < sortedTiers.length; i++) {
    const current = sortedTiers[i];
    const next = sortedTiers[i + 1];
    
    if (current.minQty < 1) {
      errors.push(`Staffel ${i + 1}: Minimale hoeveelheid moet minimaal 1 zijn`);
    }
    
    if (current.unitPrice < 0) {
      errors.push(`Staffel ${i + 1}: Prijs kan niet negatief zijn`);
    }
    
    if (next && current.maxQty && next.minQty <= current.maxQty) {
      errors.push(`Staffel ${i + 1}: Overlap met volgende staffel`);
    }
    
    if (next && current.maxQty && next.minQty > current.maxQty + 1) {
      errors.push(`Staffel ${i + 1}: Gat tussen staffels`);
    }
  }
  
  return errors;
};

export const mockScrapeDHgate = async (url: string): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response based on URL
  if (url.includes('dhgate.com')) {
    return {
      success: true,
      name: 'Sample Product - DHgate',
      currency: 'USD',
      staffelTiers: [
        { minQty: 1, maxQty: 10, unitPrice: 2.50 },
        { minQty: 11, maxQty: 50, unitPrice: 2.20 },
        { minQty: 51, maxQty: 100, unitPrice: 2.00 },
        { minQty: 101, maxQty: 500, unitPrice: 1.80 },
        { minQty: 501, maxQty: undefined, unitPrice: 1.60 },
      ],
      minOrderQty: 1,
      shippingOptions: ['Free Shipping', 'Express Shipping'],
    };
  }
  
  return {
    success: false,
    error: 'Unsupported marketplace or invalid URL',
  };
};
