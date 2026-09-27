import React from 'react';
import { useMidnight } from '../hooks/useMidnight';

const WalletConnect: React.FC = () => {
  const { address, connectWallet, disconnectWallet, error } = useMidnight();

  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Lace Wallet</h2>
        {error && <p style={{ color: '#ef4444', margin: '0.5rem 0 0' }}>{error}</p>}
        {address ? (
          <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            {address.substring(0, 8)}...{address.substring(address.length - 8)}
          </p>
        ) : (
          <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>Not connected</p>
        )}
      </div>
      
      <div>
        {address ? (
          <button onClick={disconnectWallet} className="btn" style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white' }}>
            Disconnect
          </button>
        ) : (
          <button onClick={connectWallet} className="btn btn-primary">
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
