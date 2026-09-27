import React from 'react';
import WalletConnect from './components/WalletConnect';
import CircuitCall from './components/CircuitCall';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Startup Investment Syndicate</h1>
      <p>Invest privately. Proved without revealing your identity or exact input amount.</p>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <WalletConnect />
      </div>

      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <CircuitCall />
      </div>
    </div>
  );
}

export default App;
