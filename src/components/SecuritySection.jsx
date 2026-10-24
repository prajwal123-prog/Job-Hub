import React from 'react';
import { ShieldCheck, Lock, Key, CheckCircle2 } from 'lucide-react';

const SecuritySection = () => {
  const securityItems = [
    'Secure Spring Security stateless authentication',
    'JSON Web Token (JWT) Bearer Authorization',
    'BCrypt password hashing for user credentials',
    'Role-Based Access Control (CANDIDATE vs RECRUITER)',
    'Global exception handling & secure error responses',
    'Protected API endpoints & environment secret isolation'
  ];

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div className="card" style={{ padding: '2.5rem', borderRadius: '24px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#38bdf8' }}>
          <ShieldCheck size={28} />
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#ffffff' }}>Security & Data Privacy</h2>
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '750px' }}>
          JobHub prioritizes user security and data privacy. Every API request is authenticated using industry-standard JWT tokens and protected against unauthorized access.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {securityItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
              <CheckCircle2 size={18} color="#4ade80" /> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
