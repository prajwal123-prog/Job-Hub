import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const CandidateFeatures = () => {
  const features = [
    'Smart multi-criteria job search',
    'Advanced filters (Salary, Experience, Location, Job Type)',
    'Company discovery & company profile exploration',
    'Save jobs & bookmark opportunities',
    'Easy 1-click job application submission',
    'Real-time application status tracking',
    'AI-powered candidate job recommendations',
    'Automated skill gap & learning suggestions',
    'PDF Resume upload & profile customization'
  ];

  return (
    <div className="card" style={{ padding: '2.25rem', borderRadius: '20px', borderTop: '4px solid var(--primary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ padding: '0.5rem', background: '#eff6ff', color: 'var(--primary)', borderRadius: '10px' }}>
          <UserCheck size={24} />
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Built for Candidates</h3>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Designed to streamline developer job hunting with transparent tracking, automated recommendations, and PDF resume inspection.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {features.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#059669" /> {item}
          </div>
        ))}
      </div>

      <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontWeight: 800, gap: '0.4rem', borderRadius: '10px' }}>
        Find Jobs <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default CandidateFeatures;
