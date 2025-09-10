import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, Package, Truck, Percent, DollarSign } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { CostItem } from '../types';

const CostsEditor: React.FC = () => {
  const { project, addCost, updateCost, removeCost } = useCalculatorStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCost, setEditingCost] = useState<Partial<CostItem>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCost, setNewCost] = useState<Partial<CostItem>>({
    label: '',
    type: 'per_unit',
    value: 0,
    description: '',
  });

  const getCostIcon = (type: string) => {
    switch (type) {
      case 'per_unit':
        return <Package className="w-4 h-4" />;
      case 'per_batch':
        return <Truck className="w-4 h-4" />;
      case 'percent':
        return <Percent className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getCostTypeLabel = (type: string) => {
    switch (type) {
      case 'per_unit':
        return 'Per stuk';
      case 'per_batch':
        return 'Per batch';
      case 'percent':
        return 'Percentage';
      default:
        return 'Onbekend';
    }
  };

  const handleEdit = (cost: CostItem) => {
    setEditingId(cost.id);
    setEditingCost({ ...cost });
  };

  const handleSave = () => {
    if (editingId && editingCost.label && editingCost.value !== undefined) {
      updateCost(editingId, editingCost);
      setEditingId(null);
      setEditingCost({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingCost({});
  };

  const handleAdd = () => {
    if (newCost.label && newCost.value !== undefined) {
      addCost({
        label: newCost.label,
        type: newCost.type || 'per_unit',
        value: newCost.value,
        description: newCost.description,
      });
      setNewCost({ label: '', type: 'per_unit', value: 0, description: '' });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id: string) => {
    removeCost(id);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Kosten</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Toevoegen</span>
        </button>
      </div>

      {/* Costs List */}
      <div className="space-y-3">
        {project.costs.map((cost) => (
          <div
            key={cost.id}
            className="flex items-center space-x-3 p-3 bg-bg-secondary border border-border-light rounded-lg"
          >
            {editingId === cost.id ? (
              // Edit Mode
              <>
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editingCost.label || ''}
                      onChange={(e) => setEditingCost({ ...editingCost, label: e.target.value })}
                      className="input-field text-sm"
                      placeholder="Kosten label"
                    />
                    <select
                      value={editingCost.type || 'per_unit'}
                      onChange={(e) => setEditingCost({ ...editingCost, type: e.target.value as any })}
                      className="input-field text-sm"
                    >
                      <option value="per_unit">Per stuk</option>
                      <option value="per_batch">Per batch</option>
                      <option value="percent">Percentage</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      {editingCost.type === 'percent' ? (
                        <input
                          type="number"
                          value={editingCost.value || ''}
                          onChange={(e) => setEditingCost({ ...editingCost, value: parseFloat(e.target.value) || 0 })}
                          className="input-field text-sm pr-8"
                          step="0.01"
                          min="0"
                          max="100"
                        />
                      ) : (
                        <input
                          type="number"
                          value={editingCost.value || ''}
                          onChange={(e) => setEditingCost({ ...editingCost, value: parseFloat(e.target.value) || 0 })}
                          className="input-field text-sm pr-8"
                          step="0.01"
                          min="0"
                        />
                      )}
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted text-sm">
                        {editingCost.type === 'percent' ? '%' : project.currency === 'EUR' ? '€' : project.currency === 'USD' ? '$' : '£'}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={editingCost.description || ''}
                      onChange={(e) => setEditingCost({ ...editingCost, description: e.target.value })}
                      className="input-field text-sm"
                      placeholder="Beschrijving (optioneel)"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="p-2 text-accent-green hover:bg-accent-green/20 rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 text-text-muted hover:bg-text-muted/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              // View Mode
              <>
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-primary-blue/20 rounded-lg">
                    {getCostIcon(cost.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary">{cost.label}</span>
                      <span className="text-xs bg-bg-tertiary text-text-secondary px-2 py-1 rounded">
                        {getCostTypeLabel(cost.type)}
                      </span>
                    </div>
                    {cost.description && (
                      <p className="text-sm text-text-secondary mt-1">{cost.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-text-primary">
                    {cost.type === 'percent' ? `${cost.value}%` : `${cost.value} ${project.currency}`}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {cost.type === 'percent' ? 'van verkoopprijs' : cost.type === 'per_batch' ? 'per bestelling' : 'per stuk'}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(cost)}
                    className="p-2 text-primary-blue hover:bg-primary-blue/20 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cost.id)}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add New Cost Form */}
      {showAddForm && (
        <div className="mt-4 p-4 bg-bg-secondary border border-border-light rounded-lg">
          <h4 className="font-medium text-text-primary mb-3">Nieuwe Kosten Toevoegen</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={newCost.label}
                onChange={(e) => setNewCost({ ...newCost, label: e.target.value })}
                className="input-field text-sm"
                placeholder="Kosten label"
              />
              <select
                value={newCost.type}
                onChange={(e) => setNewCost({ ...newCost, type: e.target.value as any })}
                className="input-field text-sm"
              >
                <option value="per_unit">Per stuk</option>
                <option value="per_batch">Per batch</option>
                <option value="percent">Percentage</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                {newCost.type === 'percent' ? (
                  <input
                    type="number"
                    value={newCost.value}
                    onChange={(e) => setNewCost({ ...newCost, value: parseFloat(e.target.value) || 0 })}
                    className="input-field text-sm pr-8"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="0.00"
                  />
                ) : (
                  <input
                    type="number"
                    value={newCost.value}
                    onChange={(e) => setNewCost({ ...newCost, value: parseFloat(e.target.value) || 0 })}
                    className="input-field text-sm pr-8"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                )}
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted text-sm">
                  {newCost.type === 'percent' ? '%' : project.currency === 'EUR' ? '€' : project.currency === 'USD' ? '$' : '£'}
                </span>
              </div>
              <input
                type="text"
                value={newCost.description || ''}
                onChange={(e) => setNewCost({ ...newCost, description: e.target.value })}
                className="input-field text-sm"
                placeholder="Beschrijving (optioneel)"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAdd}
              className="btn-primary text-sm"
            >
              Toevoegen
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-secondary text-sm"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-6 p-3 bg-bg-secondary border border-border-light rounded-lg">
        <h4 className="font-medium text-text-primary mb-2">💡 Kosten Types</h4>
        <ul className="text-text-secondary text-sm space-y-1">
          <li>• <strong>Per stuk:</strong> Kosten die per eenheid worden toegevoegd</li>
          <li>• <strong>Per batch:</strong> Vaste kosten per bestelling</li>
          <li>• <strong>Percentage:</strong> Kosten als percentage van verkoopprijs</li>
        </ul>
      </div>
    </div>
  );
};

export default CostsEditor;
