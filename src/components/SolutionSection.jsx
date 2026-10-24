import React from 'react';
import { User, Sliders, Search, Sparkles, Send, CheckCircle2, ChevronRight } from 'lucide-react';

const SolutionSection = () => {
  const flow = [
    { title: 'Candidate Profile', icon: User, desc: 'Add tech skills, location, bio & resume PDF' },
    { title: 'Skills & Preferences', icon: Sliders, desc: 'Define salary range, role & job type preference' },
    { title: 'Smart Job Search', icon: Search, desc: 'Filter jobs by keyword, location, experience & skills' },
    { title: 'AI Recommendations', icon: Sparkles, desc: 'Get automated match scores & skill gap suggestions' },
    { title: 'Apply & Track', icon: Send, desc: 'Submit applications & monitor status live' }
  ];

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          OUR INTEGRATED APPROACH
        </span>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.3rem' }}>
          How JobHub Solves It
        </h2>
      </div>

      <div className="card" style={{ padding: '2.5rem', borderRadius: '24px', background: '#ffffff', border: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
          {flow.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ width: '52px', height: '52px', background: '#eff6ff', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '1px solid #bfdbfe' }}>
                  <IconComponent size={24} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
