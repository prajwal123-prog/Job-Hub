import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService, aiService, savedJobService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, CheckCircle2, Clock, Calendar, Sparkles, Building2, 
  ExternalLink, User, ArrowRight, Bookmark, MapPin, Briefcase, 
  Check, Plus, Award, ChevronRight, Edit, AlertCircle, Zap, Trash2, Filter
} from 'lucide-react';

const CandidateDashboard = () => {
  const { user } = useAuth();
  
  // Default non-blocking initial stats (0ms instant render!)
  const [stats, setStats] = useState({
    totalApplications: 0,
    reviewingApplications: 0,
    shortlistedApplications: 0,
    selectedApplications: 0,
    rejectedApplications: 0,
    savedJobsCount: 0,
    recentApplications: []
  });
  const [aiData, setAiData] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appFilter, setAppFilter] = useState('ALL');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // 1. Fetch Candidate Dashboard Metrics (non-blocking)
    dashboardService.getCandidateDashboard().then(res => {
      if (res?.data?.data) {
        setStats(res.data.data);
      }
    }).catch(err => {
      console.error('Candidate Dashboard Error', err);
    });

    // 2. Fetch AI Recommendations & Saved Jobs asynchronously
    aiService.getRecommendations().then(res => {
      if (res?.data?.data) setAiData(res.data.data);
    }).catch(() => {});

    savedJobService.getSavedJobs().then(res => {
      if (res?.data?.data) setSavedJobs(res.data.data || []);
    }).catch(() => {});
  };

  const handleRemoveSavedJob = async (jobId) => {
    try {
      await savedJobService.removeSavedJob(jobId);
      setSavedJobs(savedJobs.filter(s => s.job?.id !== jobId));
    } catch (err) {
      console.error('Error removing saved job', err);
    }
  };

  const recommendationsList = aiData?.recommendations || [];
  const candidateSkills = user?.skills ? user.skills.split(',').map(s => s.trim()) : ['Java', 'Spring Boot', 'MySQL'];
  const recentApps = stats?.recentApplications || [];

  // Filtered applications
  const filteredApps = appFilter === 'ALL' 
    ? recentApps 
    : recentApps.filter(app => app.status === appFilter);

  // Accurate Candidate Profile Strength Calculation (10 Parameters)
  const hasName = Boolean(user?.name);
  const hasPhone = Boolean(user?.phone);
  const hasLocation = Boolean(user?.location);
  const hasSkills = Boolean(user?.skills);
  const hasBio = Boolean(user?.bio);
  const hasResume = Boolean(user?.resumeUrl);
  const hasDesignation = Boolean(user?.designation);
  const hasHeadline = Boolean(user?.headline);
  const hasEducation = Boolean(user?.education);
  const hasSocial = Boolean(user?.linkedIn || user?.gitHub || user?.portfolioUrl);

  const candidateFields = [
    hasName, hasPhone, hasLocation, hasSkills, hasBio,
    hasResume, hasDesignation, hasHeadline, hasEducation, hasSocial
  ];

  const profilePercentage = Math.round((candidateFields.filter(Boolean).length / candidateFields.length) * 100);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* 1. Header Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
        color: '#ffffff', 
        padding: '2rem 2.5rem', 
        borderRadius: 'var(--radius-lg)', 
        marginBottom: '2rem',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {user?.profilePic ? (
            <img src={user.profilePic} alt="Profile" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #38bdf8' }} />
          ) : (
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)', 
              color: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.75rem', 
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
              <span className="badge" style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 800 }}>CANDIDATE</span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
                Profile Strength: <span style={{ color: profilePercentage === 100 ? '#4ade80' : '#38bdf8' }}>{profilePercentage}%</span>
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
              Welcome back, {user?.name || 'Developer'}! 👋
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
              {user?.email} • {user?.location || 'Location Not Set'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/jobs" className="btn btn-primary" style={{ gap: '0.4rem' }}>
            <Briefcase size={16} /> Explore Jobs
          </Link>
          <Link to="/profile" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)', gap: '0.4rem' }}>
            <Edit size={16} /> Edit Profile
          </Link>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ borderTop: '4px solid #2563eb', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Applications</span>
            <div style={{ padding: '0.5rem', background: '#eff6ff', color: '#2563eb', borderRadius: '8px' }}>
              <FileText size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stats?.totalApplications || 0}</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Submitted roles</span>
        </div>

        <div className="card" style={{ borderTop: '4px solid #f59e0b', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Under Review</span>
            <div style={{ padding: '0.5rem', background: '#fef3c7', color: '#b45309', borderRadius: '8px' }}>
              <Clock size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stats?.reviewingApplications || 0}</h2>
          <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>Under evaluation</span>
        </div>

        <div className="card" style={{ borderTop: '4px solid #7c3aed', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Shortlisted</span>
            <div style={{ padding: '0.5rem', background: '#f3e8ff', color: '#6b21a8', borderRadius: '8px' }}>
              <Sparkles size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stats?.shortlistedApplications || 0}</h2>
          <span style={{ fontSize: '0.75rem', color: '#6b21a8', fontWeight: 600 }}>In hiring pipeline</span>
        </div>

        <div className="card" style={{ borderTop: '4px solid #059669', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Saved Jobs</span>
            <div style={{ padding: '0.5rem', background: '#dcfce7', color: '#15803d', borderRadius: '8px' }}>
              <Bookmark size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{savedJobs.length}</h2>
          <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>Bookmarked opportunities</span>
        </div>
      </div>

      {/* 3. Main Dashboard Grid (2 Columns: Left 2fr, Right 1fr) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column (AI Recommendations & Submitted Applications Timeline) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* AI Recommended Jobs Box */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles color="var(--primary)" size={20} /> Top AI Recommended Jobs
              </h3>
              <Link to="/jobs" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                View All →
              </Link>
            </div>

            {recommendationsList.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recommendationsList.slice(0, 3).map((rec, idx) => (
                  <div key={idx} style={{ padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{rec.job.title}</h4>
                        <span className="badge" style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.75rem' }}>
                          {rec.matchPercentage}% Match
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {rec.job.companyName} • {rec.job.location}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                        {rec.matchingSkills?.slice(0, 3).map((s, i) => (
                          <span key={i} className="badge badge-jobtype" style={{ fontSize: '0.7rem' }}>✓ {s}</span>
                        ))}
                      </div>
                    </div>

                    <Link to={`/jobs/${rec.job.id}`} className="btn btn-primary btn-sm">
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                Complete your candidate profile skills to unlock personalized AI job recommendations.{' '}
                <Link to="/profile" style={{ color: 'var(--primary)', fontWeight: 600 }}>Update Profile</Link>
              </p>
            )}
          </div>

          {/* Submitted Applications List with Status Filter Pills */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Submitted Applications</h3>
              
              {/* Filter Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', fontSize: '0.8rem' }}>
                {['ALL', 'REVIEWING', 'SHORTLISTED', 'SELECTED'].map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAppFilter(st)}
                    style={{
                      padding: '0.3rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border)',
                      background: appFilter === st ? 'var(--primary)' : 'transparent',
                      color: appFilter === st ? '#ffffff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredApps.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {filteredApps.map((app) => (
                  <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                        <Link to={`/jobs/${app.jobId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {app.jobTitle}
                        </Link>
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {app.companyName} • Applied on {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className={`badge badge-${app.status}`}>{app.status}</span>
                      {app.resumeUrl && (
                        <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" title="View Submitted Resume">
                          <ExternalLink size={14} /> Resume
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                <FileText size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                <p>No applications match the selected status.</p>
              </div>
            )}
          </div>

          {/* Saved Bookmarks Quick Widget */}
          {savedJobs.length > 0 && (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Bookmark color="var(--accent)" size={18} /> Bookmarked Jobs ({savedJobs.length})
                </h3>
                <Link to="/saved-jobs" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                  View All →
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {savedJobs.slice(0, 2).map((item) => (
                  <div key={item.id} style={{ padding: '0.85rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                        <Link to={`/jobs/${item.job?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{item.job?.title}</Link>
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.job?.companyName} • {item.job?.location}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/jobs/${item.job?.id}`} className="btn btn-primary btn-sm">Apply</Link>
                      <button onClick={() => handleRemoveSavedJob(item.job?.id)} className="btn btn-outline btn-sm" style={{ color: '#ef4444' }} title="Remove Bookmark">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Profile Completeness Checklist & Recommended Skill Growth) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Profile Completeness Checklist (10 Parameters) */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Profile Completeness</h3>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: profilePercentage === 100 ? '#15803d' : 'var(--primary)' }}>
                {profilePercentage}%
              </span>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ width: `${profilePercentage}%`, height: '100%', background: profilePercentage === 100 ? '#059669' : 'linear-gradient(90deg, #2563eb, #059669)', transition: 'width 0.3s ease' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: hasName ? '#15803d' : 'var(--text-muted)' }}>
                <span>{hasName ? '✓' : '○'}</span> Full Name & Contact
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: hasPhone ? '#15803d' : 'var(--text-muted)' }}>
                <span>{hasPhone ? '✓' : '○'}</span> Verified Phone Number
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: hasLocation ? '#15803d' : 'var(--text-muted)' }}>
                <span>{hasLocation ? '✓' : '○'}</span> Preferred Job Location
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: hasSkills ? '#15803d' : 'var(--text-muted)' }}>
                <span>{hasSkills ? '✓' : '○'}</span> Key Technical Skills
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: hasResume ? '#15803d' : 'var(--text-muted)' }}>
                <span>{hasResume ? '✓' : '○'}</span> PDF Resume Attached
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: hasDesignation ? '#15803d' : 'var(--text-muted)' }}>
                <span>{hasDesignation ? '✓' : '○'}</span> Current Designation
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: hasHeadline ? '#15803d' : 'var(--text-muted)' }}>
                <span>{hasHeadline ? '✓' : '○'}</span> Resume Headline
              </div>
            </div>

            {profilePercentage < 100 && (
              <Link to="/profile" className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
                Complete Missing Profile Details
              </Link>
            )}
          </div>

          {/* Candidate Profile Summary */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>My Skills & Summary</h3>
              <Link to="/profile" className="btn btn-outline btn-sm" style={{ gap: '0.3rem' }}>
                <Edit size={14} /> Edit
              </Link>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Skills</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem' }}>
                {candidateSkills.map((sk, idx) => (
                  <span key={idx} className="badge badge-jobtype">{sk}</span>
                ))}
              </div>
            </div>

            {user?.experience && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Experience Level</span>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginTop: '0.2rem' }}>{user.experience}</p>
              </div>
            )}

            {user?.bio && (
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Bio</span>
                <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.2rem', lineHeight: 1.5 }}>"{user.bio}"</p>
              </div>
            )}
          </div>

          {/* High Demand Career Skill Suggestions */}
          <div className="card" style={{ background: 'var(--primary-light)', border: '1px solid #bfdbfe' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Zap size={18} /> High-Demand Skills
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Adding these skills can boost your application shortlist rate:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {['Docker', 'Spring Security', 'Microservices', 'AWS', 'Redis'].map((sk, idx) => (
                <span key={idx} className="badge" style={{ background: '#ffffff', color: 'var(--primary)', border: '1px solid #93c5fd' }}>
                  + {sk}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CandidateDashboard;
