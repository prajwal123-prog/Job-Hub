import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { aiService } from '../services/api';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

const AIRecommendation = () => {
  const { isAuthenticated, isCandidate } = useAuth();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await aiService.getRecommendations();
      setRecommendations(res.data.data);
    } catch (err) {
      console.error('Error fetching AI recommendations', err);
      setError('Unable to fetch AI recommendations at this moment.');
    } finally {
      setLoading(false);
    }
  };

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
      <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
        
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
          <Sparkles size={16} /> AI JOB MATCHING ENGINE
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Let AI find jobs that fit you.
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '2rem' }}>
          Get personalized job recommendations based on your skills, experience, and career preferences.
        </p>

        {!isAuthenticated ? (
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', marginBottom: '1.5rem', fontWeight: 600 }}>
              Login to get personalized recommendations.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontWeight: 800 }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', padding: '0.75rem 2rem', fontWeight: 700 }}>
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={fetchRecommendations}
              disabled={loading}
              className="btn btn-primary"
              style={{ padding: '0.85rem 2.25rem', fontSize: '1rem', fontWeight: 800, borderRadius: '12px', gap: '0.5rem', background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }}
            >
              {loading ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} />}
              {loading ? 'Analyzing Matches...' : 'Find My Matches'}
            </button>

            {error && (
              <div style={{ marginTop: '1.5rem', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                {error}
              </div>
            )}

            {recommendations && recommendations.recommendations && (
              <div style={{ marginTop: '2.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#38bdf8', fontWeight: 800, textAlign: 'center' }}>
                  Matched Jobs ({recommendations.totalRecommendations})
                </h3>

                {recommendations.recommendations.map((rec, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>{rec.job.title}</h4>
                      <span className="badge" style={{ background: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '0.9rem', padding: '0.35rem 0.85rem' }}>
                        {rec.matchPercentage}% Match
                      </span>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
                      {rec.job.companyName} • {rec.job.location}
                    </p>

                    {rec.matchingSkills && rec.matchingSkills.length > 0 && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 700, marginRight: '0.5rem' }}>Matching Skills:</span>
                        {rec.matchingSkills.map((sk, k) => (
                          <span key={k} className="badge" style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', marginRight: '0.3rem', fontSize: '0.75rem' }}>
                            ✓ {sk}
                          </span>
                        ))}
                      </div>
                    )}

                    {rec.missingSkills && rec.missingSkills.length > 0 && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#fb7185', fontWeight: 700, marginRight: '0.5rem' }}>Missing Skills:</span>
                        {rec.missingSkills.map((sk, k) => (
                          <span key={k} className="badge" style={{ background: 'rgba(251, 113, 133, 0.15)', color: '#fb7185', marginRight: '0.3rem', fontSize: '0.75rem' }}>
                            ! {sk}
                          </span>
                        ))}
                      </div>
                    )}

                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.5rem', fontStyle: 'italic' }}>
                      💡 {rec.reason}
                    </p>

                    <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                      <Link to={`/jobs/${rec.job.id}`} className="btn btn-primary btn-sm" style={{ gap: '0.3rem' }}>
                        View Job Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default AIRecommendation;
