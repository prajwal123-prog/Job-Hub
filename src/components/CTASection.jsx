import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';

const CTASection = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      color: '#ffffff',
      padding: '4rem 2.5rem',
      borderRadius: '24px',
      textAlign: 'center',
      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.85rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
        Ready to Find Your Next Opportunity?
      </h2>
      <p style={{ color: '#cbd5e1', maxWidth: '620px', margin: '0 auto 2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
        Explore jobs, discover companies and take the next step in your developer career.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 800, borderRadius: '12px', gap: '0.5rem' }}>
          Explore Jobs <ArrowRight size={18} />
        </Link>
        <Link to="/register" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 700, borderRadius: '12px', gap: '0.5rem' }}>
          <UserPlus size={18} /> Create Account
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
