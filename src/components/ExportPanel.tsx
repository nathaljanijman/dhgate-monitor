import React, { useState } from 'react';
import { Download, FileText, Share2, Copy, CheckCircle } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { formatCurrency, formatPercentage } from '../utils/calculations';

const ExportPanel: React.FC = () => {
  const { project, getCalculations, getBreakEvenPoint } = useCalculatorStore();
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv'>('pdf');

  const breakEvenPoint = getBreakEvenPoint();

  const generateCSV = () => {
    const headers = [
      'Hoeveelheid',
      'Inkoopprijs per stuk',
      'Totale inkoopkosten',
      'Totale kosten (incl. overhead)',
      'Totale omzet',
      'Marge €',
      'Marge %',
      'Break-even'
    ];

    const rows = [];
    for (let qty = 1; qty <= 1000; qty += 10) {
      const result = getCalculations(qty);
      rows.push([
        qty,
        result.unitCost,
        result.unitCost * qty,
        result.totalCost,
        project.sellingPrice * qty,
        result.margin,
        result.marginPercentage,
        qty === breakEvenPoint ? 'JA' : 'NEE'
      ]);
    }

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `staffel-marge-calculator-${project.name.replace(/\s+/g, '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generatePDF = () => {
    // Mock PDF generation - in real app would use jsPDF or similar
    alert('PDF export functionaliteit wordt geïmplementeerd in de volgende versie');
  };

  const generateShareableLink = () => {
    const projectData = {
      name: project.name,
      currency: project.currency,
      staffelTiers: project.staffelTiers,
      costs: project.costs,
      sellingPrice: project.sellingPrice,
    };

    const encodedData = btoa(JSON.stringify(projectData));
    const shareableLink = `${window.location.origin}/calculator?data=${encodedData}`;
    
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const exportData = () => {
    if (exportFormat === 'csv') {
      generateCSV();
    } else {
      generatePDF();
    }
  };

  return (
    <div className="space-y-8">
      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CSV Export */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-accent-green/20 rounded-lg">
              <FileText className="w-6 h-6 text-accent-green" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">CSV Export</h3>
              <p className="text-sm text-text-secondary">Download resultaten als spreadsheet</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-bg-secondary p-4 rounded-lg">
              <h4 className="font-medium text-text-primary mb-2">Inhoud:</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Alle staffelprijzen en marges</li>
                <li>• Break-even analyse</li>
                <li>• Kosten breakdown</li>
                <li>• Geschikt voor Excel/Google Sheets</li>
              </ul>
            </div>
            
            <button
              onClick={() => {
                setExportFormat('csv');
                exportData();
              }}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>CSV Downloaden</span>
            </button>
          </div>
        </div>

        {/* PDF Export */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary-blue/20 rounded-lg">
              <FileText className="w-6 h-6 text-primary-blue" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">PDF Export</h3>
              <p className="text-sm text-text-secondary">Professioneel rapport</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-bg-secondary p-4 rounded-lg">
              <h4 className="font-medium text-text-primary mb-2">Inhoud:</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Project overzicht</li>
                <li>• Grafieken en tabellen</li>
                <li>• Gedetailleerde berekeningen</li>
                <li>• Print-vriendelijk formaat</li>
              </ul>
            </div>
            
            <button
              onClick={() => {
                setExportFormat('pdf');
                exportData();
              }}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>PDF Downloaden</span>
            </button>
          </div>
        </div>
      </div>

      {/* Shareable Link */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-primary-purple/20 rounded-lg">
            <Share2 className="w-6 h-6 text-primary-purple" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Deelbare Link</h3>
            <p className="text-sm text-text-secondary">Deel je berekening met anderen</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-bg-secondary p-4 rounded-lg">
            <p className="text-sm text-text-secondary mb-2">
              Genereer een link die je kunt delen met collega's of klanten. 
              Zij kunnen dan dezelfde berekening bekijken zonder in te loggen.
            </p>
          </div>
          
          <button
            onClick={generateShareableLink}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-accent-green" />
                <span>Link Gekopieerd!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Link Genereren & Kopiëren</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Project Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Project Samenvatting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-text-primary mb-3">Project Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Naam:</span>
                <span className="text-text-primary">{project.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Valuta:</span>
                <span className="text-text-primary">{project.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Verkoopprijs:</span>
                <span className="text-text-primary">
                  {formatCurrency(project.sellingPrice, project.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Staffels:</span>
                <span className="text-text-primary">{project.staffelTiers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Kostenposten:</span>
                <span className="text-text-primary">{project.costs.length}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-text-primary mb-3">Sleutel Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Break-even punt:</span>
                <span className="text-text-primary">
                  {breakEvenPoint > 0 ? `${breakEvenPoint} stuks` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Laagste staffelprijs:</span>
                <span className="text-text-primary">
                  {formatCurrency(
                    Math.min(...project.staffelTiers.map(t => t.unitPrice)),
                    project.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Hoogste staffelprijs:</span>
                <span className="text-text-primary">
                  {formatCurrency(
                    Math.max(...project.staffelTiers.map(t => t.unitPrice)),
                    project.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Totale batchkosten:</span>
                <span className="text-text-primary">
                  {formatCurrency(
                    project.costs
                      .filter(c => c.type === 'per_batch')
                      .reduce((sum, c) => sum + c.value, 0),
                    project.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Totale % kosten:</span>
                <span className="text-text-primary">
                  {formatPercentage(
                    project.costs
                      .filter(c => c.type === 'percent')
                      .reduce((sum, c) => sum + c.value, 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export History */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Export Geschiedenis</h3>
        <div className="bg-bg-secondary border border-border-light rounded-lg p-4">
          <p className="text-text-secondary text-sm text-center">
            Export geschiedenis wordt opgeslagen in de volgende versie
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
