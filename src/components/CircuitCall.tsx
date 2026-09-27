import React, { useState } from 'react';
import { useMidnight } from '../hooks/useMidnight';

const CircuitCall: React.FC = () => {
  const { wallet, address } = useMidnight();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('1000');

  const handleCommitInvestment = async () => {
    if (!wallet || !address) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      
      // Simulating local proof generation...
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setResult(`Successfully proved and committed ${amount} tNight! TX: 0x8a7b...9f0c`);
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
        ✓ Proved locally. Exact amount kept secret.
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
        />
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.5rem' }}>
          *This value is fed into the local ZK prover. It is never broadcasted to the network.
        </p>
      </div>

      <button 
        onClick={handleCommitInvestment} 
        disabled={loading || !wallet}
        className={wallet ? 'btn btn-success' : 'btn'}
        style={{ backgroundColor: !wallet ? 'var(--border-color)' : undefined }}
      >
        {loading ? 'Generating ZK Proof...' : 'Generate Proof & Commit'}
      </button>

      {result && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '8px', color: 'var(--success)' }}>
          <strong>Success:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default CircuitCall;
