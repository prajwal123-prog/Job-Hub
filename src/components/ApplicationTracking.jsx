import React from 'react';
import { BarChart2, CheckCircle2, Clock, ChevronRight } from 'lucide-react';

const ApplicationTracking = () => {
  const statuses = [
    { label: 'APPLIED', desc: 'Application submitted to recruiter', color: 'badge-APPLIED' },
    { label: 'REVIEWING', desc: 'Recruiter inspecting resume & profile', color: 'badge-REVIEWING' },
    { label: 'SHORTLISTED', desc: 'Profile selected for technical round', color: 'badge-SHORTLISTED' },
    { label: 'SELECTED', desc: 'Offer letter issued to candidate', color: 'badge-SELECTED' },
  ];

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          TRANSPARENT RECRUITMENT PIPELINE
        </span>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.3rem' }}>
          Stay On Top of Your Applications
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
          Track your application progress live from your Candidate Dashboard at every stage.
        </p>
      </div>

      <div className="card" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          {statuses.map((item, idx) => (
            <div key={idx} style={{ background: 'var(--background)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <span className={`badge ${item.color}`} style={{ fontSize: '0.85rem', marginBottom: '0.75rem', padding: '0.35rem 0.85rem' }}>
                {item.label}
              </span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationTracking;
