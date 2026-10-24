import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { companyService, savedJobService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import JobCard from '../components/JobCard';
import Loading from '../components/Loading';
import { Building2, MapPin, Globe, Users, Calendar, Briefcase, ChevronRight, AlertCircle } from 'lucide-react';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);

  const { isAuthenticated, isCandidate } = useAuth();

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch company profile details
      const companyRes = await companyService.getCompanyById(id);
      const companyData = companyRes.data.data;
      setCompany(companyData);

      // Fetch jobs belonging to this company
      try {
        const jobsRes = await companyService.getCompanyJobs(id, 0, 10, 'createdAt', 'desc');
        setJobs(jobsRes.data.data.content || []);
      } catch (e) {
        console.error('Error fetching company jobs', e);
      }

      // Fetch saved jobs if logged in as candidate
      if (isAuthenticated && isCandidate) {
        try {
          const savedRes = await savedJobService.getSavedJobs();
          const ids = new Set((savedRes.data.data || []).map(s => s.job.id));
          setSavedJobIds(ids);
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      console.error('Error fetching company details', err);
      setError('Company profile not found or removed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading text="Loading company profile from MySQL..." />;

  if (error || !company) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', margin: '3rem auto', maxWidth: '600px', borderRadius: '16px' }}>
        <AlertCircle size={48} color="#be123c" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Company Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
        <Link to="/companies" className="btn btn-primary">Explore Hiring Companies</Link>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return 'CO';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '1rem auto 3rem' }}>
      
      {/* 1. Header Banner */}
      <div className="card" style={{ padding: '2.25rem', borderRadius: '20px', marginBottom: '2rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {company.logoUrl && !imgError ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                onError={() => setImgError(true)}
                style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '1px solid var(--border)' }}
              />
            ) : (
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem', flexShrink: 0 }}>
                {getInitials(company.name)}
              </div>
            )}

            <div>
              <span className="badge badge-jobtype" style={{ marginBottom: '0.4rem' }}>
                {company.industry || 'Software / IT'}
              </span>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '0.2rem' }}>
                {company.name}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} color="var(--primary)" /> {company.location || 'Bangalore, India'}
              </p>
            </div>
          </div>

          <a href="#open-jobs" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontWeight: 800, gap: '0.4rem', borderRadius: '12px' }}>
            <Briefcase size={18} /> View Open Jobs ({company.openJobsCount ?? jobs.length})
          </a>
        </div>

        {/* Quick Info Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.75rem', padding: '1.25rem', background: 'var(--background)', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Company Size</span>
            <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', color: '#0f172a' }}>
              <Users size={16} color="var(--primary)" /> {company.companySize || '50-200 employees'}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Founded Year</span>
            <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', color: '#0f172a' }}>
              <Calendar size={16} color="var(--accent)" /> {company.foundedYear || '2018'}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Website</span>
            <p style={{ fontWeight: 700, marginTop: '0.2rem' }}>
              {company.website ? (
                <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Globe size={16} /> {company.website.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>N/A</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Grid: Company Details + Jobs List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Left Column: Description & Open Jobs Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div className="card" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              About {company.name}
            </h2>
            <p style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.975rem', whiteSpace: 'pre-line' }}>
              {company.description || `${company.name} is a leading organization specializing in ${company.industry || 'technology solutions'}. They are committed to delivering high quality engineering products and fostering a culture of technical excellence.`}
            </p>
          </div>

          {/* Open Positions Section */}
          <div id="open-jobs">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                Open Positions at {company.name}
              </h2>
              <span className="badge badge-jobtype" style={{ fontSize: '0.85rem' }}>
                {jobs.length} Positions
              </span>
            </div>

            {jobs.length === 0 ? (
              <div className="card" style={{ padding: '2.5rem 1.5rem', textAlign: 'center', borderRadius: '16px' }}>
                <Briefcase size={36} color="var(--text-muted)" style={{ marginBottom: '0.75rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No open positions right now</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.3rem' }}>
                  Check back later or explore other hiring companies.
                </p>
              </div>
            ) : (
              <div className="grid-2">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} isSavedInitial={savedJobIds.has(job.id)} />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Company Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
              Company Overview
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Industry</span>
                <strong style={{ color: '#0f172a' }}>{company.industry || 'Software / IT'}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Location</span>
                <strong style={{ color: '#0f172a' }}>{company.location || 'Bangalore'}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Company Size</span>
                <strong style={{ color: '#0f172a' }}>{company.companySize || '50-200 employees'}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Founded</span>
                <strong style={{ color: '#0f172a' }}>{company.foundedYear || '2018'}</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CompanyDetails;
