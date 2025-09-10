import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { StaffelTier } from '../types';
import { validateStaffelTiers } from '../utils/calculations';

const StaffelEditor: React.FC = () => {
  const { project, addStaffelTier, updateStaffelTier, removeStaffelTier } = useCalculatorStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTier, setEditingTier] = useState<Partial<StaffelTier>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTier, setNewTier] = useState<Partial<StaffelTier>>({
    minQty: 1,
    maxQty: undefined,
    unitPrice: 0,
  });

  const validationErrors = validateStaffelTiers(project.staffelTiers);

  const handleEdit = (tier: StaffelTier) => {
    setEditingId(tier.id);
    setEditingTier({ ...tier });
  };

  const handleSave = () => {
    if (editingId && editingTier.minQty !== undefined && editingTier.unitPrice !== undefined) {
      updateStaffelTier(editingId, editingTier);
      setEditingId(null);
      setEditingTier({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingTier({});
  };

  const handleAdd = () => {
    if (newTier.minQty !== undefined && newTier.unitPrice !== undefined) {
      addStaffelTier({
        minQty: newTier.minQty,
        maxQty: newTier.maxQty,
        unitPrice: newTier.unitPrice,
      });
      setNewTier({ minQty: 1, maxQty: undefined, unitPrice: 0 });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id: string) => {
    if (project.staffelTiers.length > 1) {
      removeStaffelTier(id);
    }
  };

  const sortedTiers = [...project.staffelTiers].sort((a, b) => a.minQty - b.minQty);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Staffelprijzen</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Toevoegen</span>
        </button>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          <h4 className="font-medium text-red-400 mb-2">Validatie Fouten:</h4>
          <ul className="text-red-300 text-sm space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Staffel Tiers Table */}
      <div className="space-y-3">
        {sortedTiers.map((tier) => (
          <div
            key={tier.id}
            className="flex items-center space-x-3 p-3 bg-bg-secondary border border-border-light rounded-lg"
          >
            {editingId === tier.id ? (
              // Edit Mode
              <>
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    value={editingTier.minQty || ''}
                    onChange={(e) => setEditingTier({ ...editingTier, minQty: parseInt(e.target.value) || 0 })}
                    className="input-field text-sm"
                    min="1"
                  />
                  <input
                    type="number"
                    value={editingTier.maxQty || ''}
                    onChange={(e) => setEditingTier({ ...editingTier, maxQty: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="input-field text-sm"
                    min="1"
                    placeholder="∞"
                  />
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-text-muted text-sm">
                      {project.currency === 'EUR' ? '€' : project.currency === 'USD' ? '$' : '£'}
                    </span>
                    <input
                      type="number"
                      value={editingTier.unitPrice || ''}
                      onChange={(e) => setEditingTier({ ...editingTier, unitPrice: parseFloat(e.target.value) || 0 })}
                      className="input-field text-sm pl-6"
                      step="0.01"
                      min="0"
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
                <div className="flex-1 grid grid-cols-3 gap-3 text-sm">
                  <span className="text-text-secondary">
                    {tier.minQty} stuks
                  </span>
                  <span className="text-text-secondary">
                    {tier.maxQty ? `${tier.maxQty} stuks` : '∞'}
                  </span>
                  <span className="text-text-primary font-medium">
                    {tier.unitPrice} {project.currency}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(tier)}
                    className="p-2 text-primary-blue hover:bg-primary-blue/20 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(tier.id)}
                    disabled={project.staffelTiers.length <= 1}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add New Tier Form */}
      {showAddForm && (
        <div className="mt-4 p-4 bg-bg-secondary border border-border-light rounded-lg">
          <h4 className="font-medium text-text-primary mb-3">Nieuwe Staffel Toevoegen</h4>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-xs text-text-secondary mb-1">Min. Hoeveelheid</label>
              <input
                type="number"
                value={newTier.minQty || ''}
                onChange={(e) => setNewTier({ ...newTier, minQty: parseInt(e.target.value) || 0 })}
                className="input-field text-sm"
                min="1"
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">Max. Hoeveelheid</label>
              <input
                type="number"
                value={newTier.maxQty || ''}
                onChange={(e) => setNewTier({ ...newTier, maxQty: e.target.value ? parseInt(e.target.value) : undefined })}
                className="input-field text-sm"
                min="1"
                placeholder="∞"
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">Prijs per stuk</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-text-muted text-xs">
                  {project.currency === 'EUR' ? '€' : project.currency === 'USD' ? '$' : '£'}
                </span>
                <input
                  type="number"
                  value={newTier.unitPrice || ''}
                  onChange={(e) => setNewTier({ ...newTier, unitPrice: parseFloat(e.target.value) || 0 })}
                  className="input-field text-sm pl-6"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
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
        <h4 className="font-medium text-text-primary mb-2">💡 Tips</h4>
        <ul className="text-text-secondary text-sm space-y-1">
          <li>• Staffels moeten elkaar niet overlappen</li>
          <li>• Zorg dat er geen gaten zijn tussen staffels</li>
          <li>• Laatste staffel kan oneindig zijn (maxQty leeg)</li>
          <li>• Minimaal één staffel is vereist</li>
        </ul>
      </div>
    </div>
  );
};

export default StaffelEditor;
