import React from 'react';
import { useMidnight } from '../hooks/useMidnight';

const WalletConnect: React.FC = () => {
  const { address, connectWallet, connectDemoWallet, disconnectWallet, error } = useMidnight();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Lace Wallet</h2>
          {address ? (
            <p style={{ margin: '0.5rem 0 0', color: 'var(--success)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              Connected: {address.substring(0, 16)}...{address.substring(address.length - 8)}
            </p>
          ) : (
            <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>
              Status: Disconnected
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {address ? (
            <button 
              onClick={disconnectWallet} 
              className="btn" 
              style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white', width: 'auto', padding: '0.5rem 1rem' }}
            >
              Disconnect
            </button>
          ) : (
            <button 
              onClick={connectWallet} 
              className="btn btn-primary"
              style={{ width: 'auto', padding: '0.5rem 1.25rem' }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {error && !address && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px' }}>
          <p style={{ color: '#ef4444', margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>
            {error}
          </p>
          <button 
            onClick={connectDemoWallet} 
            className="btn btn-success"
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            ⚡ Connect Preprod Testnet Wallet (Demo)
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
