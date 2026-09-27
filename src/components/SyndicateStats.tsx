import React from 'react';

const SyndicateStats: React.FC = () => {
  // In a full implementation, these would be fetched from the contract state
  const target = 100000;
  const current = 65000;
  const investors = 12;
  const percent = (current / target) * 100;

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
        <span className="stat-value" style={{ color: 'var(--success)' }}>{current.toLocaleString()} tNight</span>
      </div>

      <div className="stat-box" style={{ borderBottom: 'none' }}>
        <span className="stat-label">Active Investors</span>
        <span className="stat-value">{investors}</span>
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
