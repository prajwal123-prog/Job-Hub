import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, UserPlus } from 'lucide-react';

const AboutHero = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
      color: '#ffffff',
      padding: '4.5rem 2rem 5rem',
      borderRadius: '24px',
      marginBottom: '3.5rem',
      boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.3)',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(56, 189, 248, 0.15)',
        color: '#38bdf8',
        padding: '0.4rem 1.25rem',
        borderRadius: '30px',
        fontSize: '0.85rem',
        fontWeight: 700,
        marginBottom: '1.75rem',
        border: '1px solid rgba(56, 189, 248, 0.3)'
      }}>
        <Sparkles size={16} /> RECRUITMENT PLATFORM VISION
      </div>

      <h1 style={{
        fontSize: '3.25rem',
        fontWeight: 900,
        lineHeight: 1.15,
        marginBottom: '1.25rem',
        color: '#ffffff',
        letterSpacing: '-0.02em'
      }}>
        Connecting Talent With Opportunity
      </h1>

      <p style={{
        fontSize: '1.15rem',
        color: '#cbd5e1',
        maxWidth: '720px',
        margin: '0 auto 2.5rem',
        lineHeight: 1.6
      }}>
        JobHub is a modern job discovery and recruitment platform designed to make finding the right opportunity and hiring the right talent simpler, smarter and more personalized.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 800, borderRadius: '12px', gap: '0.5rem' }}>
          Explore Jobs <ArrowRight size={18} />
        </Link>
        <Link to="/register" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 700, borderRadius: '12px', gap: '0.5rem' }}>
          <UserPlus size={18} /> Create Account
        </Link>
      </div>
    </div>
  );
};

export default AboutHero;
