import React from 'react';
import { useMidnight } from '../hooks/useMidnight';

const SyndicateStats: React.FC = () => {
  const { totalCommitted, investorCount } = useMidnight();
  const target = 100000;
  const percent = Math.min(100, Math.round((totalCommitted / target) * 100));

  return (
    <div className="card">
      <h2>Syndicate Overview</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Live on-chain statistics (Public Data)
      </p>

      <div className="stat-box">
        <span className="stat-label">Goal Amount</span>
        <span className="stat-value">{target.toLocaleString()} tNight</span>
      </div>
      
      <div className="stat-box">
        <span className="stat-label">Total Committed</span>
        <span className="stat-value" style={{ color: 'var(--success)' }}>
          {totalCommitted.toLocaleString()} tNight
        </span>
      </div>

      <div className="stat-box" style={{ borderBottom: 'none' }}>
        <span className="stat-label">Active Investors</span>
        <span className="stat-value">{investorCount}</span>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default SyndicateStats;
