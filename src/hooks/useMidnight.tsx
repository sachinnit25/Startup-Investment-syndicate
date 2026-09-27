import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MidnightContextType {
  wallet: any | null;
  address: string | null;
  error: string | null;
  connectWallet: () => Promise<void>;
  connectDemoWallet: () => void;
  disconnectWallet: () => void;
  totalCommitted: number;
  investorCount: number;
  addInvestment: (amt: number) => void;
}

const MidnightContext = createContext<MidnightContextType | undefined>(undefined);

export const MidnightProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<any | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalCommitted, setTotalCommitted] = useState<number>(65000);
  const [investorCount, setInvestorCount] = useState<number>(12);

  const connectWallet = async () => {
    try {
      setError(null);
      const win = window as any;

      // 1. Check for Midnight-native DApp Connector (window.midnight)
      if (win.midnight) {
        const provider = win.midnight.mnLace || Object.values(win.midnight)[0];
        if (provider) {
          if (typeof provider.connect === 'function') {
            const api = await provider.connect('undeployed');
            setWallet(api);
            let addr = '';
            if (api.getShieldedAddresses) {
              const res = await api.getShieldedAddresses();
              addr = res?.shieldedAddress || '';
            } else if (api.getUnshieldedAddress) {
              const res = await api.getUnshieldedAddress();
              addr = res?.unshieldedAddress || '';
            }
            if (addr) {
              setAddress(addr);
              return;
            }
          } else if (typeof provider.enable === 'function') {
            const api = await provider.enable();
            setWallet(api);
            const state = api.state ? await api.state() : null;
            setAddress(state?.address || 'mn_addr_preprod1h3ssm5ru2t6eqy4g3she78zlxn96e36ms6pq996aduvmateh9p9sk96u7s');
            return;
          }
        }
      }

      // 2. Check for Cardano Lace (window.cardano.lace)
      if (win.cardano?.lace) {
        if (typeof win.cardano.lace.enable === 'function') {
          const api = await win.cardano.lace.enable();
          setWallet(api);
          setAddress('mn_addr_preprod1h3ssm5ru2t6eqy4g3she78zlxn96e36ms6pq996aduvmateh9p9sk96u7s');
          return;
        }
      }

      // 3. Fallback
      throw new Error(
        'Lace wallet extension not detected in this browser tab. Please ensure Lace is installed, or use Demo Mode below.'
      );
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect to Lace wallet.');
    }
  };

  const connectDemoWallet = () => {
    setError(null);
    setWallet({ isDemo: true });
    setAddress('mn_addr_preprod1h3ssm5ru2t6eqy4g3she78zlxn96e36ms6pq996aduvmateh9p9sk96u7s');
  };

  const disconnectWallet = () => {
    setWallet(null);
    setAddress(null);
    setError(null);
  };

  const addInvestment = (amt: number) => {
    setTotalCommitted(prev => prev + amt);
    setInvestorCount(prev => prev + 1);
  };

  return (
    <MidnightContext.Provider
      value={{
        wallet,
        address,
        error,
        connectWallet,
        connectDemoWallet,
        disconnectWallet,
        totalCommitted,
        investorCount,
        addInvestment
      }}
    >
      {children}
    </MidnightContext.Provider>
  );
};

export const useMidnight = () => {
  const context = useContext(MidnightContext);
  if (!context) {
    throw new Error('useMidnight must be used within a MidnightProvider');
  }
  return context;
};
