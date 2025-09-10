import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-raleway">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
            Staffel-Marge Calculator
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Bereken automatisch je marges op basis van staffelprijzen, kosten en verkoopprijzen. 
            Perfect voor e-commerce ondernemers die inkopen via DHgate, Alibaba en AliExpress.
          </p>
          
          <div className="card max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Test Component</h2>
            <p className="text-text-secondary">
              Als je dit ziet, werkt de basis setup! 🎉
            </p>
            <p className="text-text-secondary mt-2">
              Nu gaan we alle componenten toevoegen...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
