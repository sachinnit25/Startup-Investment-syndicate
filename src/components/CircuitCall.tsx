import React, { useState } from 'react';
import { useMidnight } from '../hooks/useMidnight';

const CircuitCall: React.FC = () => {
  const { wallet, address } = useMidnight();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCommitInvestment = async () => {
    if (!wallet || !address) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      // We simulate compiling/calling the circuit locally. 
      // The private inputs (e.g., investor_secret and amount) would be fed directly 
      // to the prover and NEVER leave the browser.
      
      // Simulating local proof generation...
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Result simulates on-chain submission success.
      setResult("Transaction submitted successfully! TX Hash: 0x8a7b...9f0c");
      
    } catch (err: any) {
      console.error(err);
      setResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Invest Privately</h2>
      <p style={{ color: '#27ae60', fontWeight: 'bold' }}>
        🔒 Proved without revealing your input
      </p>
      <p>
        The zero-knowledge proof will be generated locally in your browser. Your private input 
        (secret key & investment amount) NEVER appears in the UI and NEVER leaves your device.
      </p>

      <button 
        onClick={handleCommitInvestment} 
        disabled={loading || !wallet}
        style={{ 
          padding: '10px 20px', 
          background: wallet ? '#2ecc71' : '#95a5a6', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: wallet ? 'pointer' : 'not-allowed'
        }}
      >
        {loading ? 'Generating Proof...' : 'Commit Investment'}
      </button>

      {result && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#ecf0f1', borderRadius: '4px' }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default CircuitCall;
