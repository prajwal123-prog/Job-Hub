import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService, savedJobService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import JobCard from './JobCard';
import { ArrowRight, Briefcase, AlertCircle } from 'lucide-react';

const LatestJobs = () => {
  const [latestJobs, setLatestJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, isCandidate } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    fetchLatestJobs().finally(() => clearTimeout(timer));
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const fetchLatestJobs = async () => {
    try {
      setError('');
      const res = await jobService.getLatestJobs();
      const jobs = res?.data?.data || [];
      setLatestJobs(jobs);

      if (isAuthenticated && isCandidate) {
        try {
          const savedRes = await savedJobService.getSavedJobs();
          const ids = new Set((savedRes?.data?.data || []).map(s => s.job?.id));
          setSavedJobIds(ids);
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      console.error('Error fetching latest jobs', err);
      setError('Unable to load jobs right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-jobtype" style={{ marginBottom: '0.3rem' }}>REAL-TIME POSITIONS</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Latest Jobs</h2>
        </div>
        <Link to="/jobs" className="btn btn-outline btn-sm" style={{ gap: '0.4rem', fontWeight: 700 }}>
          View All Jobs <ArrowRight size={16} />
        </Link>
      </div>

      {loading && latestJobs.length === 0 ? (
        <div className="grid-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="card" style={{ padding: '1.5rem', borderRadius: '16px', minHeight: '180px', background: '#f8fafc', animation: 'pulse 1.5s infinite' }}>
              <div style={{ width: '40%', height: '20px', background: '#e2e8f0', borderRadius: '6px', marginBottom: '1rem' }}></div>
              <div style={{ width: '70%', height: '16px', background: '#cbd5e1', borderRadius: '6px', marginBottom: '0.75rem' }}></div>
              <div style={{ width: '50%', height: '14px', background: '#e2e8f0', borderRadius: '6px' }}></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#be123c', background: '#ffe4e6' }}>
          <AlertCircle size={24} style={{ marginBottom: '0.5rem' }} />
          <p>{error}</p>
        </div>
      ) : latestJobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1rem', borderRadius: '16px' }}>
          <Briefcase size={44} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>No jobs available yet.</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Recruiters can publish active job roles right now using the Post Job page.
          </p>
          <Link to="/post-job" className="btn btn-primary">Post a Job Position</Link>
        </div>
      ) : (
        <div className="grid-3">
          {latestJobs.map(job => (
            <JobCard key={job.id} job={job} isSavedInitial={savedJobIds.has(job.id)} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestJobs;
