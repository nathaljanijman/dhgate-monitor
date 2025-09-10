import React, { useState } from 'react';
import { useCalculatorStore } from '../store/calculatorStore';
import { Calculator as CalculatorIcon, BarChart3, Download, Globe, Plus } from 'lucide-react';
import URLInput from './URLInput';
import StaffelEditor from './StaffelEditor';
import CostsEditor from './CostsEditor';
import ResultsView from './ResultsView';
import ExportPanel from './ExportPanel';

const Calculator: React.FC = () => {
  const { activeTab, setActiveTab, project } = useCalculatorStore();
  const [showURLInput, setShowURLInput] = useState(false);

  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: CalculatorIcon },
    { id: 'results', label: 'Resultaten', icon: BarChart3 },
    { id: 'export', label: 'Export', icon: Download },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
          Staffel-Marge Calculator
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Bereken automatisch je marges op basis van staffelprijzen, kosten en verkoopprijzen. 
          Perfect voor e-commerce ondernemers die inkopen via DHgate, Alibaba en AliExpress.
        </p>
        
        {/* Quick Actions */}
        <div className="flex items-center justify-center space-x-4 pt-4">
          <button 
            onClick={() => setShowURLInput(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Globe className="w-4 h-4" />
            <span>URL Invoeren</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Handmatig Invoeren</span>
          </button>
        </div>
      </div>

      {/* URL Input Modal */}
      {showURLInput && (
        <URLInput onClose={() => setShowURLInput(false)} />
      )}

      {/* Project Info */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-text-secondary text-sm">
              Laatst bijgewerkt: {project.updatedAt.toLocaleDateString('nl-NL')}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary">Valuta:</span>
            <select 
              value={project.currency}
              onChange={(e) => useCalculatorStore.getState().setProject({ currency: e.target.value })}
              className="input-field text-sm"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        {/* Selling Price Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Verkoopprijs per stuk
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
                {project.currency === 'EUR' ? '€' : project.currency === 'USD' ? '$' : '£'}
              </span>
              <input
                type="number"
                value={project.sellingPrice}
                onChange={(e) => useCalculatorStore.getState().setProject({ 
                  sellingPrice: parseFloat(e.target.value) || 0 
                })}
                className="input-field pl-8 w-full"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button className="btn-secondary w-full">
              Prijs Optimaliseren
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-light">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-light'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StaffelEditor />
            <CostsEditor />
          </div>
        )}
        
        {activeTab === 'results' && (
          <ResultsView />
        )}
        
        {activeTab === 'export' && (
          <ExportPanel />
        )}
      </div>
    </div>
  );
};

export default Calculator;
