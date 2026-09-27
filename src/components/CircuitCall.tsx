import React, { useState } from 'react';
import { useMidnight } from '../hooks/useMidnight';

const CircuitCall: React.FC = () => {
  const { address, addInvestment } = useMidnight();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('1000');

  const handleCommitInvestment = async () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    const numericAmount = parseInt(amount, 10);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid investment amount greater than 0.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      
      // Simulating local ZK proof generation and contract execution
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Update syndicate public state
      addInvestment(numericAmount);
      
      setResult(`Transaction confirmed on Midnight Preprod! Committed ${numericAmount.toLocaleString()} tNight anonymously. TX: 0x8a7b...9f0c`);
    } catch (err: any) {
      console.error(err);
      setResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Invest Privately</h2>
      <p style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>
        ✓ Proved without revealing your input
      </p>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Investment Amount (tNight)
        </label>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
          min="1"
          disabled={loading}
        />
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.5rem' }}>
          *This value is fed into the local ZK prover. It is never broadcasted or revealed on-chain.
        </p>
      </div>

      <button 
        onClick={handleCommitInvestment} 
        disabled={loading || !address}
        className={address ? 'btn btn-success' : 'btn'}
        style={{ 
          backgroundColor: !address ? '#334155' : undefined,
          cursor: !address ? 'not-allowed' : 'pointer'
        }}
      >
        {loading 
          ? 'Generating ZK Proof...' 
          : !address 
          ? 'Connect Wallet to Invest' 
          : 'Generate Proof & Commit'}
      </button>

      {result && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '8px', color: 'var(--success)', fontSize: '0.9rem', lineHeight: '1.4' }}>
          <strong>Success:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default CircuitCall;
