import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, CheckCircle2, PlusCircle } from 'lucide-react';

const RecruiterFeatures = () => {
  const { isAuthenticated, isRecruiter } = useAuth();
  const navigate = useNavigate();

  const handlePostJobClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isRecruiter) {
      navigate('/post-job');
    } else {
      alert('Only recruiters can post jobs.');
    }
  };

  const features = [
    'Create & manage company profile',
    'Post & publish job openings live in database',
    'Manage posted job positions (Edit / Delete)',
    'Inspect candidate applicants & cover letters',
    'One-click candidate PDF Resume inspection',
    'Update application status (APPLIED ➔ SHORTLISTED)',
    'Track hiring activity across job roles',
    'Streamlined end-to-end recruiter workflow'
  ];

  return (
    <div className="card" style={{ padding: '2.25rem', borderRadius: '20px', borderTop: '4px solid #7c3aed' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ padding: '0.5rem', background: '#f3e8ff', color: '#7c3aed', borderRadius: '10px' }}>
          <Building2 size={24} />
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Built for Recruiters</h3>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Empowers employers and hiring teams to publish positions, inspect candidate PDF resumes, and update applicant statuses in real-time.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {features.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>
            <CheckCircle2 size={16} color="#7c3aed" /> {item}
          </div>
        ))}
      </div>

      <button onClick={handlePostJobClick} className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontWeight: 800, gap: '0.4rem', borderRadius: '10px', background: '#7c3aed' }}>
        <PlusCircle size={16} /> Post a Job
      </button>
    </div>
  );
};

export default RecruiterFeatures;
