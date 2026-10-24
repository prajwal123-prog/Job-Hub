import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, PlusCircle } from 'lucide-react';

const RecruiterCTA = () => {
  const { isAuthenticated, isRecruiter } = useAuth();
  const navigate = useNavigate();

  const handlePostJobClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isRecruiter) {
      navigate('/post-job');
    } else {
      alert('Only recruiters can post jobs. Please register or switch to a recruiter account.');
    }
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#ffffff',
      padding: '3.5rem 2.5rem',
      borderRadius: '24px',
      marginBottom: '4rem',
      boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      flexWrap: 'wrap',
      gap: '2rem'
    }}>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          <Building2 size={20} /> FOR EMPLOYERS & RECRUITERS
        </div>

        <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Looking for great talent?
        </h2>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Post your jobs and connect with candidates who match your exact technical requirements.
        </p>
      </div>

      <div>
        <button
          onClick={handlePostJobClick}
          className="btn btn-primary"
          style={{ padding: '0.9rem 2.25rem', fontSize: '1rem', fontWeight: 800, borderRadius: '12px', gap: '0.5rem', background: '#2563eb' }}
        >
          <PlusCircle size={20} /> Post a Job
        </button>
      </div>
    </section>
  );
};

export default RecruiterCTA;
