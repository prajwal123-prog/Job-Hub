import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', background: '#ffffff' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ width: '60%', height: '16px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '0.4rem', animation: 'pulse 1.5s infinite' }}></div>
              <div style={{ width: '40%', height: '12px', background: '#f1f5f9', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
            </div>
          </div>
          <div style={{ width: '100%', height: '12px', background: '#f1f5f9', borderRadius: '4px', marginBottom: '0.75rem', animation: 'pulse 1.5s infinite' }}></div>
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
            <div style={{ width: '60px', height: '20px', background: '#e2e8f0', borderRadius: '12px', animation: 'pulse 1.5s infinite' }}></div>
            <div style={{ width: '80px', height: '20px', background: '#e2e8f0', borderRadius: '12px', animation: 'pulse 1.5s infinite' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ width: '80px', height: '14px', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
            <div style={{ width: '90px', height: '32px', background: '#e2e8f0', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
