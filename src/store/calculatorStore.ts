import { create } from 'zustand';
import { StaffelTier, CostItem, CalculationResult, Project } from '../types';

interface CalculatorState {
  // Project data
  project: Project;
  
  // UI state
  isScraping: boolean;
  activeTab: 'calculator' | 'results' | 'export';
  
  // Actions
  setProject: (project: Partial<Project>) => void;
  addStaffelTier: (tier: Omit<StaffelTier, 'id'>) => void;
  updateStaffelTier: (id: string, updates: Partial<StaffelTier>) => void;
  removeStaffelTier: (id: string) => void;
  addCost: (cost: Omit<CostItem, 'id'>) => void;
  updateCost: (id: string, updates: Partial<CostItem>) => void;
  removeCost: (id: string) => void;
  setScraping: (isScraping: boolean) => void;
  setActiveTab: (tab: 'calculator' | 'results' | 'export') => void;
  
  // Computed values
  getCalculations: (quantity: number) => CalculationResult;
  getBreakEvenPoint: () => number;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultProject: Project = {
  id: generateId(),
  name: 'Nieuw Project',
  currency: 'EUR',
  staffelTiers: [
    { id: generateId(), minQty: 1, maxQty: 10, unitPrice: 0 },
    { id: generateId(), minQty: 11, maxQty: 50, unitPrice: 0 },
    { id: generateId(), minQty: 51, maxQty: 100, unitPrice: 0 },
    { id: generateId(), minQty: 101, maxQty: 500, unitPrice: 0 },
    { id: generateId(), minQty: 501, maxQty: undefined, unitPrice: 0 },
  ],
  costs: [
    { id: generateId(), label: 'Verzendkosten', type: 'per_batch', value: 0 },
    { id: generateId(), label: 'Importkosten', type: 'per_batch', value: 0 },
    { id: generateId(), label: 'Verpakking per stuk', type: 'per_unit', value: 0 },
    { id: generateId(), label: 'Platform fees', type: 'percent', value: 0 },
    { id: generateId(), label: 'Retourpercentage', type: 'percent', value: 0 },
  ],
  sellingPrice: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  project: defaultProject,
  isScraping: false,
  activeTab: 'calculator',
  
  setProject: (updates) => set((state) => ({
    project: { ...state.project, ...updates, updatedAt: new Date() }
  })),
  
  addStaffelTier: (tier) => set((state) => ({
    project: {
      ...state.project,
      staffelTiers: [...state.project.staffelTiers, { ...tier, id: generateId() }],
      updatedAt: new Date()
    }
  })),
  
  updateStaffelTier: (id, updates) => set((state) => ({
    project: {
      ...state.project,
      staffelTiers: state.project.staffelTiers.map(tier =>
        tier.id === id ? { ...tier, ...updates } : tier
      ),
      updatedAt: new Date()
    }
  })),
  
  removeStaffelTier: (id) => set((state) => ({
    project: {
      ...state.project,
      staffelTiers: state.project.staffelTiers.filter(tier => tier.id !== id),
      updatedAt: new Date()
    }
  })),
  
  addCost: (cost) => set((state) => ({
    project: {
      ...state.project,
      costs: [...state.project.costs, { ...cost, id: generateId() }],
      updatedAt: new Date()
    }
  })),
  
  updateCost: (id, updates) => set((state) => ({
    project: {
      ...state.project,
      costs: state.project.costs.map(cost =>
        cost.id === id ? { ...cost, ...updates } : cost
      ),
      updatedAt: new Date()
    }
  })),
  
  removeCost: (id) => set((state) => ({
    project: {
      ...state.project,
      costs: state.project.costs.filter(cost => cost.id !== id),
      updatedAt: new Date()
    }
  })),
  
  setScraping: (isScraping) => set({ isScraping }),
  setActiveTab: (activeTab) => set({ activeTab }),
  
  getCalculations: (quantity) => {
    const state = get();
    const { project } = state;
    
    // Find applicable staffel tier
    const tier = project.staffelTiers.find(t => 
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
    
    project.costs.forEach(cost => {
      switch (cost.type) {
        case 'per_unit':
          totalCosts += cost.value * quantity;
          break;
        case 'per_batch':
          totalCosts += cost.value;
          break;
        case 'percent':
          totalCosts += (project.sellingPrice * quantity * cost.value) / 100;
          break;
      }
    });
    
    const totalCost = totalPurchaseCost + totalCosts;
    const margin = (project.sellingPrice * quantity) - totalCost;
    const marginPercentage = project.sellingPrice > 0 ? (margin / (project.sellingPrice * quantity)) * 100 : 0;
    
    return {
      quantity,
      unitCost,
      totalCost,
      margin,
      marginPercentage,
      breakEven: margin >= 0,
    };
  },
  
  getBreakEvenPoint: () => {
    const state = get();
    const { project } = state;
    
    if (project.sellingPrice <= 0) return 0;
    
    // Find the tier with lowest unit price
    const lowestTier = project.staffelTiers.reduce((lowest, current) =>
      current.unitPrice < lowest.unitPrice ? current : lowest
    );
    
    const unitCost = lowestTier.unitPrice;
    const unitMargin = project.sellingPrice - unitCost;
    
    if (unitMargin <= 0) return 0;
    
    // Calculate fixed costs per unit
    let fixedCostsPerUnit = 0;
    project.costs.forEach(cost => {
      if (cost.type === 'per_batch') {
        fixedCostsPerUnit += cost.value;
      } else if (cost.type === 'percent') {
        fixedCostsPerUnit += (project.sellingPrice * cost.value) / 100;
      }
    });
    
    const breakEvenQty = Math.ceil(fixedCostsPerUnit / unitMargin);
    return Math.max(breakEvenQty, lowestTier.minQty);
  },
}));
