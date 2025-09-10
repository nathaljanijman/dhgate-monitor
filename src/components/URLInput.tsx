import React, { useState } from 'react';
import { X, Globe, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { mockScrapeDHgate } from '../utils/calculations';

interface URLInputProps {
  onClose: () => void;
}

const URLInput: React.FC<URLInputProps> = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  
  const { setProject, setScraping } = useCalculatorStore();

  const handleScrape = async () => {
    if (!url.trim()) {
      setError('Voer een geldige URL in');
      return;
    }

    setIsScraping(true);
    setError('');
    setScrapedData(null);
    setScraping(true);

    try {
      const data = await mockScrapeDHgate(url);
      
      if (data.success) {
        setScrapedData(data);
        setError('');
      } else {
        setError(data.error || 'Scraping mislukt');
      }
    } catch (err) {
      setError('Er is een fout opgetreden tijdens het scrapen');
    } finally {
      setIsScraping(false);
      setScraping(false);
    }
  };

  const handleApplyData = () => {
    if (!scrapedData) return;

    const newProject = {
      name: scrapedData.name,
      currency: scrapedData.currency,
      staffelTiers: scrapedData.staffelTiers.map((tier: any) => ({
        ...tier,
        id: Math.random().toString(36).substr(2, 9),
      })),
    };

    setProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-card border border-border-light rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Globe className="w-5 h-5 text-primary-blue" />
            <span>Product URL Invoeren</span>
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Product URL
            </label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.dhgate.com/product/..."
                className="input-field flex-1"
                disabled={isScraping}
              />
              <button
                onClick={handleScrape}
                disabled={isScraping || !url.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isScraping ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Scraping...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Scrapen</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Ondersteunde platforms: DHgate, Alibaba, AliExpress
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-400">Scraping Fout</h4>
                <p className="text-red-300 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Scraped Data Preview */}
          {scrapedData && (
            <div className="bg-bg-secondary border border-border-light rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-accent-green" />
                <h3 className="font-medium text-accent-green">Data Succesvol Opgehaald</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Product Informatie</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Naam:</span>
                      <span className="text-text-primary">{scrapedData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Valuta:</span>
                      <span className="text-text-primary">{scrapedData.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Min. Bestelling:</span>
                      <span className="text-text-primary">{scrapedData.minOrderQty}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Staffelprijzen</h4>
                  <div className="space-y-1 text-sm">
                    {scrapedData.staffelTiers.map((tier: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-text-secondary">
                          {tier.minQty}-{tier.maxQty || '∞'} stuks:
                        </span>
                        <span className="text-text-primary">
                          {tier.unitPrice} {scrapedData.currency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border-light">
                <button
                  onClick={handleApplyData}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Data Toepassen</span>
                </button>
              </div>
            </div>
          )}

          {/* Supported Platforms */}
          <div className="bg-bg-secondary border border-border-light rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Ondersteunde Platforms</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-bg-card rounded-lg border border-border-light">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">DH</span>
                </div>
                <span className="text-sm text-text-secondary">DHgate</span>
              </div>
              <div className="text-center p-3 bg-bg-card rounded-lg border border-border-light">
                <div className="w-8 h-8 bg-orange-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AL</span>
                </div>
                <span className="text-sm text-text-secondary">Alibaba</span>
              </div>
              <div className="text-center p-3 bg-bg-card rounded-lg border border-border-light">
                <div className="w-8 h-8 bg-red-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AE</span>
                </div>
                <span className="text-sm text-text-secondary">AliExpress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border-light">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Annuleren
          </button>
          {scrapedData && (
            <button
              onClick={handleApplyData}
              className="btn-primary"
            >
              Toepassen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default URLInput;
