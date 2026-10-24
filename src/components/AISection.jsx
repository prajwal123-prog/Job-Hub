import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

const AISection = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      color: '#ffffff',
      padding: '3.5rem 2.5rem',
      borderRadius: '24px',
      marginBottom: '4rem',
      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
        
        {/* Left Column: Conceptual Overview */}
        <div>
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
            marginBottom: '1.25rem',
            border: '1px solid rgba(56, 189, 248, 0.3)'
          }}>
            <Sparkles size={16} /> AI-POWERED ENGINE
          </div>

          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '1rem', color: '#ffffff', lineHeight: 1.2 }}>
            Smarter Job Discovery With AI
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            JobHub uses AI-assisted recommendations to help candidates discover opportunities that align with their skills, experience and career preferences.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
              <CheckCircle2 size={16} color="#4ade80" /> Candidate skill set tokenization & vector analysis
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
              <CheckCircle2 size={16} color="#4ade80" /> Automated Match Percentage calculation (`92% Match`)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
              <CheckCircle2 size={16} color="#4ade80" /> Skill Gap suggestions for continuous career growth
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Example Card */}
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', padding: '1.75rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800 }}>SIMULATED MATCH ANALYSIS</span>
            <span className="badge" style={{ background: '#dcfce7', color: '#15803d', fontWeight: 800 }}>92% MATCH</span>
          </div>

          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.3rem' }}>
            Java Backend Developer
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Candidate Profile: Java, Spring Boot, MySQL, React
          </p>

          <div style={{ marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Matching Skills:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              <span className="badge" style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', fontSize: '0.75rem' }}>✓ Java</span>
              <span className="badge" style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', fontSize: '0.75rem' }}>✓ Spring Boot</span>
              <span className="badge" style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', fontSize: '0.75rem' }}>✓ MySQL</span>
            </div>
          </div>

          <div style={{ marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#fb7185', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Skill Gap / Missing Requirements:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              <span className="badge" style={{ background: 'rgba(251, 113, 133, 0.2)', color: '#fb7185', fontSize: '0.75rem' }}>! Docker</span>
              <span className="badge" style={{ background: 'rgba(251, 113, 133, 0.2)', color: '#fb7185', fontSize: '0.75rem' }}>! AWS Fundamentals</span>
            </div>
          </div>

          <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
            ⚡ <strong>Recommended Learning:</strong> Learning Docker & AWS fundamentals will increase your match score to 100%!
          </div>
        </div>

      </div>
    </section>
  );
};

export default AISection;
