import React from 'react';
import { UserPlus, Search, Send } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Add your skills, experience, and career preferences.',
      icon: UserPlus,
      color: '#2563eb',
      bg: '#eff6ff'
    },
    {
      number: '02',
      title: 'Discover Jobs',
      description: 'Search and explore jobs that match your profile.',
      icon: Search,
      color: '#7c3aed',
      bg: '#f3e8ff'
    },
    {
      number: '03',
      title: 'Apply & Get Hired',
      description: 'Apply to jobs and track your application status.',
      icon: Send,
      color: '#059669',
      bg: '#dcfce7'
    }
  ];

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>How JobHub Works</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Simple 3-step process to launch your career or hire tech talent</p>
      </div>

      <div className="grid-3">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div key={idx} className="card" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-light)', position: 'absolute', top: '1rem', right: '1.25rem' }}>
                {step.number}
              </span>

              <div style={{ width: '48px', height: '48px', background: step.bg, color: step.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <IconComponent size={24} />
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                {step.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
