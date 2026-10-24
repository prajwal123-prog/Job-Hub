import React from 'react';
import { Search, Target, BarChart3, Users } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: Search,
      title: 'Too Much Noise',
      description: 'Candidates struggle to find relevant opportunities among large numbers of unsorted job listings across static boards.',
      color: '#2563eb',
      bg: '#eff6ff'
    },
    {
      icon: Target,
      title: 'Poor Skill Matching',
      description: 'Technical skills and job requirements are often misaligned, resulting in low callback rates for candidates.',
      color: '#7c3aed',
      bg: '#f3e8ff'
    },
    {
      icon: BarChart3,
      title: 'Opaque Application Status',
      description: 'Candidates rarely receive updates after submitting resumes, leaving them uncertain about application progress.',
      color: '#059669',
      bg: '#dcfce7'
    },
    {
      icon: Users,
      title: 'Recruiter Hiring Friction',
      description: 'Employers receive hundreds of unqualified applications without automated skill filtering or PDF resume inspection.',
      color: '#d97706',
      bg: '#fffbeb'
    }
  ];

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Real Challenges in Job Discovery
        </span>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.3rem' }}>
          The Problems We Solve
        </h2>
      </div>

      <div className="grid-4">
        {problems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="card" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ width: '48px', height: '48px', background: item.bg, color: item.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <IconComponent size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProblemSection;
