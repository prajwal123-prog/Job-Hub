import React from 'react';
import { Rocket, Sparkles, CheckCircle2 } from 'lucide-react';

const FutureVision = () => {
  const futureItems = [
    'AI PDF Resume Content Parsing & Auto-Fill Profile',
    'Automated AI Mock Technical Interview Simulator',
    'Email & Browser Push Notifications for Application Updates',
    'Recruiter Advanced Applicant Ranking Analytics',
    'Cloud-Native Kubernetes & Docker Deployment Pipeline'
  ];

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div className="card" style={{ padding: '2.5rem', borderRadius: '24px', background: '#f8fafc', border: '1px solid var(--border)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0f2fe', color: '#0369a1', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1rem' }}>
          <Rocket size={14} /> FUTURE ROADMAP & IMPROVEMENTS
        </div>

        <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem' }}>
          What's Next for JobHub?
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
          We are continuously engineering next-generation capabilities to enhance full-stack developer hiring and career growth:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {futureItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#334155', fontWeight: 600, padding: '0.75rem 1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Sparkles size={16} color="var(--primary)" /> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
