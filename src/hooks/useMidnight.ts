import { useState, useEffect } from 'react';
import type { DAppConnectorWalletAPI } from '@midnight-ntwrk/dapp-connector-api';

declare global {
  interface Window {
    midnight?: {
      mnLace?: {
        enable: () => Promise<DAppConnectorWalletAPI>;
      };
    };
  }
}

export const useMidnight = () => {
  const [wallet, setWallet] = useState<DAppConnectorWalletAPI | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setError(null);
      if (!window.midnight?.mnLace) {
        throw new Error('Lace wallet is not installed or not available.');
      }
      
      const api = await window.midnight.mnLace.enable();
      setWallet(api);
      
      const state = await api.state();
      setAddress(state.address);

    } catch (err: any) {
      console.error("Wallet connection error:", err);
      setError(err.message || 'Failed to connect to Lace wallet.');
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setAddress(null);
  };

  return { wallet, address, connectWallet, disconnectWallet, error };
};
