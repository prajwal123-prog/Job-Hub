import React from 'react';
import { Target, Cpu, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

const ValuesSection = () => {
  const values = [
    {
      icon: Target,
      title: '🎯 Relevance',
      desc: 'Help candidates discover developer opportunities that match their exact technical skills.',
      color: '#2563eb',
      bg: '#eff6ff'
    },
    {
      icon: Cpu,
      title: '🤖 Intelligence',
      desc: 'Utilize automated skill matching algorithms to remove friction from job discovery.',
      color: '#7c3aed',
      bg: '#f3e8ff'
    },
    {
      icon: ShieldCheck,
      title: '🔐 Security',
      desc: 'Protect user credentials and application documents with JWT security and BCrypt hashing.',
      color: '#059669',
      bg: '#dcfce7'
    },
    {
      icon: Zap,
      title: '⚡ Simplicity',
      desc: 'Eliminate complex application forms with 1-click apply and live status tracking.',
      color: '#d97706',
      bg: '#fffbeb'
    },
    {
      icon: HeartHandshake,
      title: '🤝 Opportunity',
      desc: 'Bridge the gap between talented developers and hiring employers with transparent communication.',
      color: '#f43f5e',
      bg: '#ffe4e6'
    }
  ];

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          OUR CORE PRINCIPLES
        </span>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.3rem' }}>
          What We Value
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {values.map((item, idx) => {
          return (
            <div key={idx} className="card" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ValuesSection;
