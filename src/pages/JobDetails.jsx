import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobService, applicationService, savedJobService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import ApplyJobModal from '../components/ApplyJobModal';
import { MapPin, Briefcase, IndianRupee, Calendar, Building2, Heart, Send, Users, AlertCircle, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isCandidate, isRecruiter } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await jobService.getJobById(id);
      const jobData = res.data.data;
      setJob(jobData);

      if (isAuthenticated && isCandidate) {
        // Check if bookmarked
        try {
          const savedRes = await savedJobService.getSavedJobs();
          const isBookmarked = (savedRes.data.data || []).some(s => s.job.id === parseInt(id, 10));
          setIsSaved(isBookmarked);
        } catch (e) {
          // ignore
        }

        // Check if candidate already applied
        try {
          const appsRes = await applicationService.getMyApplications();

console.log('My applications API response:', appsRes.data);

const appliedList = appsRes.data.data || [];
console.log('Application list:', appliedList);
console.log('First application object:', JSON.stringify(appliedList[0], null, 2));
console.log('Current job ID:', id);

const alreadyApplied = appliedList.some(
  app => Number(app.jobId ?? app.job?.id) === Number(id)
);

console.log('Already applied:', alreadyApplied);
setHasApplied(alreadyApplied);
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      console.error('Error fetching job details', err);
      setError('Job details not found or position has been removed.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated) return navigate('/login');
    if (!isCandidate) {
      alert('Only candidate accounts can save jobs.');
      return;
    }

    try {
      if (isSaved) {
        await savedJobService.removeSavedJob(job.id);
        setIsSaved(false);
      } else {
        await savedJobService.saveJob(job.id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Bookmark toggle error', err);
    }
  };

  const handleApplyButtonClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isRecruiter) {
      alert('Only candidates can apply for jobs.');
      return;
    }
    setShowApplyModal(true);
  };

  if (loading) return <Loading text="Loading job details from MySQL..." />;

  if (error || !job) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', margin: '3rem auto', maxWidth: '600px', borderRadius: '16px' }}>
        <AlertCircle size={48} color="#be123c" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Job Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
        <Link to="/jobs" className="btn btn-primary">Browse All Jobs</Link>
      </div>
    );
  }

  const skillsList = job.skills ? job.skills.split(/[,;]+/).map(s => s.trim()).filter(Boolean) : [];
  const formatSalary = (min, max) => {
    if (!min && !max) return 'Negotiable';
    if (min && max) {
      return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L / year`;
    }
    return min ? `₹${(min / 100000).toFixed(1)}L+ / year` : `Up to ₹${(max / 100000).toFixed(1)}L / year`;
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '1rem auto 3rem' }}>
      
      {/* Top Header Card */}
      <div className="card" style={{ padding: '2.25rem', borderRadius: '20px', marginBottom: '2rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-jobtype" style={{ marginBottom: '0.75rem' }}>
              {job.jobType ? job.jobType.replace('_', ' ') : 'FULL TIME'}
            </span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.4rem', lineHeight: 1.2 }}>
              {job.title}
            </h1>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem' }}>
              <Building2 size={20} /> {job.companyName}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={handleBookmarkToggle}
              className="btn btn-outline"
              style={{ gap: '0.4rem', fontWeight: 700, borderColor: isSaved ? '#e11d48' : 'var(--border)', color: isSaved ? '#e11d48' : 'inherit' }}
            >
              <Heart size={18} fill={isSaved ? '#e11d48' : 'none'} />
              {isSaved ? 'Saved' : 'Save Job'}
            </button>

            {hasApplied ? (
              <button disabled className="btn btn-secondary" style={{ gap: '0.4rem', background: '#dcfce7', color: '#15803d', fontWeight: 800, cursor: 'default' }}>
                <CheckCircle2 size={18} /> Applied ✓
              </button>
            ) : (
              <button onClick={handleApplyButtonClick} className="btn btn-primary" style={{ gap: '0.4rem', fontWeight: 800, padding: '0.65rem 1.75rem' }}>
                <Send size={18} /> Apply Now
              </button>
            )}
          </div>
        </div>

        {/* Highlight Metadata Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', padding: '1.25rem', background: 'var(--background)', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Location</span>
            <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', color: '#0f172a' }}>
              <MapPin size={16} color="var(--primary)" /> {job.location || 'Remote'}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Experience Level</span>
            <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', color: '#0f172a' }}>
              <UserCheck size={16} color="var(--accent)" /> {job.experienceLevel || '0-2 Years'}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Salary Range</span>
            <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', color: '#059669' }}>
              <IndianRupee size={16} /> {formatSalary(job.salaryMin, job.salaryMax)}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Posted Date</span>
            <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', color: '#0f172a' }}>
              <Calendar size={16} /> {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Job Details (Left) + Information Sidebar (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Left Column: Description & Responsibilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="card" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              About the Job
            </h2>
            <div style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.975rem', whiteSpace: 'pre-line' }}>
              {job.description}
            </div>
          </div>

          {skillsList.length > 0 && (
            <div className="card" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                Required Skills & Tech Stack
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skillsList.map((skill, idx) => (
                  <span key={idx} className="badge badge-jobtype" style={{ padding: '0.55rem 1.15rem', fontSize: '0.875rem', fontWeight: 700 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Job Information Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
              Job Overview
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Job Title</span>
                <strong style={{ color: '#0f172a' }}>{job.title}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Company</span>
                <strong style={{ color: '#0f172a' }}>{job.companyName}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Employment Type</span>
                <span className="badge badge-jobtype" style={{ marginTop: '0.2rem' }}>
                  {job.jobType ? job.jobType.replace('_', ' ') : 'FULL TIME'}
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Location</span>
                <strong style={{ color: '#0f172a' }}>{job.location || 'Remote'}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Salary</span>
                <strong style={{ color: '#059669' }}>{formatSalary(job.salaryMin, job.salaryMax)}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Date Posted</span>
                <strong style={{ color: '#0f172a' }}>{new Date(job.createdAt).toLocaleDateString()}</strong>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#f8fafc', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} /> Verified Position
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              This role has been verified and posted directly by a registered recruiter on JobHub.
            </p>
          </div>
        </div>

      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <ApplyJobModal
          job={job}
          onClose={() => setShowApplyModal(false)}
          onSuccess={() => {
            setShowApplyModal(false);
            setHasApplied(true);
            alert('Application submitted successfully!');
          }}
        />
      )}

    </div>
  );
};

export default JobDetails;
