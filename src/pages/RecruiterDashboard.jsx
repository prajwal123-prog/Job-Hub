import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService, jobService, applicationService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { 
  PlusCircle, Briefcase, Users, CheckCircle2, FileText, Eye, 
  Trash2, ExternalLink, Building2, Calendar, MapPin, DollarSign, Search, Filter, Phone, Mail, Share2
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalJobsPosted: 0,
    totalApplicationsReceived: 0,
    shortlistedCandidatesCount: 0,
    selectedCandidatesCount: 0,
    recentJobs: []
  });

  // Selected job applications view
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [jobApplications, setJobApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);

  // Search & Filter inside Applicant Inspector
  const [applicantSearch, setApplicantSearch] = useState('');
  const [applicantStatusFilter, setApplicantStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await dashboardService.getRecruiterDashboard();
      if (res?.data?.data) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Error loading recruiter dashboard', err);
    }
  };

  const handleViewApplications = async (jobId, jobTitle) => {
    try {
      setSelectedJobId(jobId);
      setSelectedJobTitle(jobTitle);
      setAppsLoading(true);
      const res = await applicationService.getJobApplications(jobId);
      setJobApplications(res.data.data || []);
    } catch (err) {
      console.error('Error fetching job applications', err);
    } finally {
      setAppsLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await applicationService.updateStatus(appId, newStatus);
      setJobApplications(jobApplications.map(app => app.id === appId ? { ...app, status: newStatus } : app));
      fetchDashboardStats(); // Refresh counters
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update candidate status.');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting? All candidate applications for this job will also be removed.')) return;
    try {
      await jobService.deleteJob(jobId);
      if (selectedJobId === jobId) setSelectedJobId(null);
      fetchDashboardStats();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete job.');
    }
  };

  // Filtered applicants
  const filteredApplicants = jobApplications.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(applicantSearch.toLowerCase()) ||
                          app.candidateEmail.toLowerCase().includes(applicantSearch.toLowerCase());
    const matchesStatus = applicantStatusFilter === 'ALL' || app.status === applicantStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>Recruiter Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Welcome back, <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{user?.name || 'Recruiter'}</span> 👋 Manage job postings & evaluate candidate applications
          </p>
        </div>

        <Link to="/post-job" className="btn btn-primary" style={{ gap: '0.4rem' }}>
          <PlusCircle size={18} /> Post New Job Opening
        </Link>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ borderTop: '4px solid #2563eb', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Jobs Posted</span>
            <div style={{ padding: '0.5rem', background: '#eff6ff', color: '#2563eb', borderRadius: '8px' }}>
              <Briefcase size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stats?.totalJobsPosted || 0}</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active hiring roles</span>
        </div>

        <div className="card" style={{ borderTop: '4px solid #f59e0b', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Applications Received</span>
            <div style={{ padding: '0.5rem', background: '#fef3c7', color: '#b45309', borderRadius: '8px' }}>
              <Users size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stats?.totalApplicationsReceived || 0}</h2>
          <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>Candidate submissions</span>
        </div>

        <div className="card" style={{ borderTop: '4px solid #7c3aed', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Shortlisted Candidates</span>
            <div style={{ padding: '0.5rem', background: '#f3e8ff', color: '#6b21a8', borderRadius: '8px' }}>
              <FileText size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stats?.shortlistedCandidatesCount || 0}</h2>
          <span style={{ fontSize: '0.75rem', color: '#6b21a8', fontWeight: 600 }}>In interview pipeline</span>
        </div>

        <div className="card" style={{ borderTop: '4px solid #059669', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hired / Selected</span>
            <div style={{ padding: '0.5rem', background: '#dcfce7', color: '#15803d', borderRadius: '8px' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stats?.selectedCandidatesCount || 0}</h2>
          <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>Offers extended</span>
        </div>
      </div>

      {/* Main Grid: Left Jobs List (2fr), Right Company Info (1fr) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        {/* Left Posted Jobs Section */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>My Posted Jobs ({stats?.totalJobsPosted || 0})</h3>
            <Link to="/post-job" className="btn btn-outline btn-sm" style={{ gap: '0.3rem' }}>
              <PlusCircle size={15} /> Add Position
            </Link>
          </div>

          {stats?.recentJobs && stats.recentJobs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {stats.recentJobs.map((job) => (
                <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div>
                    <span className="badge badge-jobtype" style={{ marginBottom: '0.4rem' }}>
                      {job.jobType ? job.jobType.replace('_', ' ') : 'FULL TIME'}
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      <Link to={`/jobs/${job.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{job.title}</Link>
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {job.companyName} • {job.location} • Posted {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleViewApplications(job.id, job.title)}
                      className="btn btn-primary btn-sm"
                      style={{ gap: '0.4rem' }}
                    >
                      <Eye size={15} /> View Candidates
                    </button>
                    <button onClick={() => handleDeleteJob(job.id)} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#fca5a5', gap: '0.3rem' }}>
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <Briefcase size={40} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>No job positions published yet</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                Create your first job posting to receive candidate applications.
              </p>
              <Link to="/post-job" className="btn btn-primary">Publish Job Opening</Link>
            </div>
          )}
        </div>

        {/* Right Recruiter Profile & Hiring Metrics Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Company Profile Card */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Recruiter Profile</h3>
              <Link to="/profile" className="btn btn-outline btn-sm">Edit Profile</Link>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recruiter / Organization</span>
              <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary)' }}>{user?.name}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Official Email</span>
              <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Mail size={14} color="var(--primary)" /> {user?.email}
              </p>
            </div>

            {user?.location && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hiring Location</span>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={14} color="var(--accent)" /> {user.location}
                </p>
              </div>
            )}

            {user?.phone && (
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Contact Phone</span>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Phone size={14} color="#059669" /> {user.phone}
                </p>
              </div>
            )}
          </div>

          {/* Hiring Conversion Rate Widget */}
          <div className="card" style={{ background: 'var(--primary-light)', border: '1px solid #bfdbfe' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>
              Hiring Pipeline Metrics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Shortlist Conversion Rate</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)' }}>
                  {stats?.totalApplicationsReceived ? `${Math.round(((stats.shortlistedCandidatesCount || 0) / stats.totalApplicationsReceived) * 100)}%` : '0%'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Hire Rate</span>
                <span style={{ fontWeight: 800, color: '#059669' }}>
                  {stats?.totalApplicationsReceived ? `${Math.round(((stats.selectedCandidatesCount || 0) / stats.totalApplicationsReceived) * 100)}%` : '0%'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Selected Job Applicants Inspector Box with Search & Filter */}
      {selectedJobId && (
        <div className="card" style={{ border: '2px solid var(--primary)', scrollMarginTop: '100px' }} id="applicants-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-jobtype" style={{ marginBottom: '0.3rem' }}>APPLICANTS INSPECTOR</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Candidate Applications for: <span style={{ color: 'var(--primary)' }}>{selectedJobTitle}</span>
              </h3>
            </div>
            <button onClick={() => setSelectedJobId(null)} className="btn btn-secondary btn-sm">
              Close Inspector
            </button>
          </div>

          {/* Search & Filter Bar inside Inspector */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 240px', position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                placeholder="Search candidates by name or email..."
                value={applicantSearch}
                onChange={(e) => setApplicantSearch(e.target.value)}
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            <select
              value={applicantStatusFilter}
              onChange={(e) => setApplicantStatusFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="APPLIED">APPLIED</option>
              <option value="REVIEWING">REVIEWING</option>
              <option value="SHORTLISTED">SHORTLISTED</option>
              <option value="SELECTED">SELECTED / HIRED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          {appsLoading ? (
            <Loading text="Fetching candidate applications..." />
          ) : filteredApplicants.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', padding: '2rem 0', textAlign: 'center' }}>
              No candidate applications match the search/filter criteria.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredApplicants.map((app) => (
                <div key={app.id} style={{ padding: '1.25rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{app.candidateName}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {app.candidateEmail} • Applied on {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Status Update Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span className={`badge badge-${app.status}`}>{app.status}</span>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="form-select"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.85rem', width: 'auto', fontWeight: 600 }}
                      >
                        <option value="APPLIED">APPLIED</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="SHORTLISTED">SHORTLISTED</option>
                        <option value="SELECTED">SELECTED / HIRED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </div>
                  </div>

                  {app.coverLetter && (
                    <div style={{ padding: '0.85rem 1rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: '#334155', marginBottom: '1rem', borderLeft: '3px solid var(--primary)' }}>
                      <strong>Cover Note:</strong> "{app.coverLetter}"
                    </div>
                  )}

                  <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ gap: '0.4rem' }}>
                    <ExternalLink size={14} /> Open Candidate Resume
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default RecruiterDashboard;
