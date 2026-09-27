import React from 'react';
import WalletConnect from './components/WalletConnect';
import CircuitCall from './components/CircuitCall';
import SyndicateStats from './components/SyndicateStats';

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Startup Investment Syndicate</h1>
        <p>Invest privately on the Midnight Network.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--success)' }}>
          🔒 Your identity and amount remain completely hidden.
        </p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <WalletConnect />
      </div>

      <div className="grid">
        <SyndicateStats />
        <CircuitCall />
      </div>
    </div>
  );
}

export default App;
