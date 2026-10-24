import React from 'react';
import { Target, CheckCircle2, TrendingUp } from 'lucide-react';

const MissionSection = () => {
  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
        
        {/* Left Column: Mission Content */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            <Target size={18} /> Our Core Purpose
          </div>

          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Our Mission
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Job searching can be overwhelming. Candidates often have to search across multiple platforms, manually compare opportunities, and struggle to understand which jobs actually match their skills. Recruiters face equal challenges finding qualified candidates.
          </p>

          <p style={{ color: '#334155', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>
            JobHub aims to simplify recruitment by unifying:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'Unified Job Discovery & Multi-Criteria Filtering',
              'Smart Search with Skill Keyword Matching',
              'Personalized AI Recommendations & Skill Gap Analysis',
              'Live Application Status Tracking for Candidates',
              'Recruiter Management & Candidate Evaluation Tools'
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>
                <CheckCircle2 size={18} color="#059669" /> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Feature Card */}
        <div className="card" style={{ padding: '2.5rem', borderRadius: '24px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '1px solid #bfdbfe' }}>
          <div style={{ width: '56px', height: '56px', background: 'var(--primary)', color: '#ffffff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <TrendingUp size={28} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Empowering Career Growth
          </h3>

          <p style={{ color: '#334155', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            By combining full-stack database reliability with AI skill analysis, JobHub ensures candidates find roles they excel in and recruiters hire candidates who succeed.
          </p>

          <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, border: '1px solid #93c5fd' }}>
            💡 100% Data Transparency • Zero Fake Listings • Live REST API
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionSection;
