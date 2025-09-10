import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Target, DollarSign, Package } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { formatCurrency, formatPercentage, generateQuantityRange } from '../utils/calculations';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ResultsView: React.FC = () => {
  const { project, getCalculations, getBreakEvenPoint } = useCalculatorStore();
  const [selectedQuantity, setSelectedQuantity] = useState(100);
  const [maxQuantity, setMaxQuantity] = useState(1000);

  const breakEvenPoint = getBreakEvenPoint();
  
  // Generate quantity range for calculations
  const quantityRange = useMemo(() => {
    return generateQuantityRange(maxQuantity, 50);
  }, [maxQuantity]);

  // Calculate results for all quantities
  const allResults = useMemo(() => {
    return quantityRange.map(qty => getCalculations(qty));
  }, [quantityRange, getCalculations]);

  // Chart data
  const chartData = {
    labels: quantityRange.map(qty => `${qty}`),
    datasets: [
      {
        label: 'Marge %',
        data: allResults.map(result => result.marginPercentage),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Marge €',
        data: allResults.map(result => result.margin),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hoeveelheid',
          color: '#CBD5E1',
        },
        grid: {
          color: '#334155',
        },
        ticks: {
          color: '#64748B',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Marge %',
          color: '#CBD5E1',
        },
        grid: {
          color: '#334155',
        },
        ticks: {
          color: '#64748B',
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Marge €',
          color: '#CBD5E1',
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#64748B',
          callback: function(value: any) {
            return formatCurrency(value, project.currency);
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#F8FAFC',
        },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F8FAFC',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label === 'Marge %') {
              return `${label}: ${formatPercentage(value)}`;
            } else {
              return `${label}: ${formatCurrency(value, project.currency)}`;
            }
          },
        },
      },
    },
  };

  const selectedResult = getCalculations(selectedQuantity);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-blue/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-blue" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Verkoopprijs</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(project.sellingPrice, project.currency)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent-green/20 rounded-lg">
              <Target className="w-6 h-6 text-accent-green" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Break-even</p>
              <p className="text-2xl font-bold text-text-primary">
                {breakEvenPoint > 0 ? `${breakEvenPoint} stuks` : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent-orange/20 rounded-lg">
              <Package className="w-6 h-6 text-accent-orange" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Geselecteerde Qty</p>
              <p className="text-2xl font-bold text-text-primary">
                {selectedQuantity} stuks
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${
              selectedResult.margin >= 0 ? 'bg-accent-green/20' : 'bg-red-500/20'
            }`}>
              {selectedResult.margin >= 0 ? (
                <TrendingUp className="w-6 h-6 text-accent-green" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-400" />
              )}
            </div>
            <div>
              <p className="text-sm text-text-secondary">Marge</p>
              <p className={`text-2xl font-bold ${
                selectedResult.margin >= 0 ? 'text-accent-green' : 'text-red-400'
              }`}>
                {formatCurrency(selectedResult.margin, project.currency)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Hoeveelheid Selector</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Max Qty:</span>
              <input
                type="number"
                value={maxQuantity}
                onChange={(e) => setMaxQuantity(parseInt(e.target.value) || 1000)}
                className="input-field w-24 text-sm"
                min="100"
                max="10000"
                step="100"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-text-secondary">Hoeveelheid:</label>
            <input
              type="range"
              min="1"
              max={maxQuantity}
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
              className="flex-1 h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-lg font-semibold text-text-primary min-w-[80px]">
              {selectedQuantity} stuks
            </span>
          </div>
          
          {/* Quick Select Buttons */}
          <div className="flex flex-wrap gap-2">
            {[1, 10, 50, 100, 250, 500, 1000].map(qty => (
              <button
                key={qty}
                onClick={() => setSelectedQuantity(qty)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedQuantity === qty
                    ? 'bg-primary-blue text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                {qty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Selected Quantity Results */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Resultaten voor {selectedQuantity} stuks</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-secondary p-3 rounded-lg">
                <p className="text-sm text-text-secondary">Inkoopprijs per stuk</p>
                <p className="text-lg font-semibold text-text-primary">
                  {formatCurrency(selectedResult.unitCost, project.currency)}
                </p>
              </div>
              <div className="bg-bg-secondary p-3 rounded-lg">
                <p className="text-sm text-text-secondary">Totale inkoopkosten</p>
                <p className="text-lg font-semibold text-text-primary">
                  {formatCurrency(selectedResult.unitCost * selectedQuantity, project.currency)}
                </p>
              </div>
            </div>
            
            <div className="bg-bg-secondary p-3 rounded-lg">
              <p className="text-sm text-text-secondary">Totale kosten (incl. overhead)</p>
              <p className="text-lg font-semibold text-text-primary">
                {formatCurrency(selectedResult.totalCost, project.currency)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-secondary p-3 rounded-lg">
                <p className="text-sm text-text-secondary">Totale omzet</p>
                <p className="text-lg font-semibold text-text-primary">
                  {formatCurrency(project.sellingPrice * selectedQuantity, project.currency)}
                </p>
              </div>
              <div className="bg-bg-secondary p-3 rounded-lg">
                <p className="text-sm text-text-secondary">Marge percentage</p>
                <p className={`text-lg font-semibold ${
                  selectedResult.marginPercentage >= 0 ? 'text-accent-green' : 'text-red-400'
                }`}>
                  {formatPercentage(selectedResult.marginPercentage)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Break-even Analysis */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Break-even Analyse</h3>
          {breakEvenPoint > 0 ? (
            <div className="space-y-4">
              <div className="bg-accent-green/20 border border-accent-green/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-accent-green" />
                  <span className="font-medium text-accent-green">Break-even Punt</span>
                </div>
                <p className="text-2xl font-bold text-accent-green">{breakEvenPoint} stuks</p>
                <p className="text-sm text-accent-green/80 mt-1">
                  Bij deze hoeveelheid is je marge precies €0
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Hoeveelheid onder break-even:</span>
                  <span className="text-red-400 font-medium">Verlies</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Hoeveelheid boven break-even:</span>
                  <span className="text-accent-green font-medium">Winst</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-400" />
                <span className="font-medium text-red-400">Geen Break-even</span>
              </div>
              <p className="text-sm text-red-400/80">
                Met de huidige instellingen is er geen break-even punt mogelijk.
                Controleer je verkoopprijs en kosten.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-6">Marge Analyse</h3>
        <div className="h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary">
            Hover over de grafiek voor gedetailleerde informatie per hoeveelheid
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
