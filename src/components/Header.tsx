import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-bg-secondary border-b border-border-light">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-primary-purple rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
                DHgate Monitor
              </span>
            </Link>
            <span className="text-text-muted text-sm hidden md:block">
              Staffel-Marge Calculator
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              to="/calculator" 
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
            </Link>
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="btn-secondary text-sm">
              Export
            </button>
            <button className="btn-primary text-sm">
              Nieuw Project
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
