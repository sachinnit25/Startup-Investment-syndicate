import React from 'react';
import { useMidnight } from '../hooks/useMidnight';

const WalletConnect: React.FC = () => {
  const { address, connectWallet, disconnectWallet, error } = useMidnight();

  return (
    <div>
      <h2>Wallet Connection</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {address ? (
        <div>
          <p><strong>Connected Address:</strong> {address}</p>
          <button onClick={disconnectWallet} style={{ padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <p>Not connected to any wallet.</p>
          <button onClick={connectWallet} style={{ padding: '8px 16px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Connect Lace Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
