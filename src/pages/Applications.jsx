import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationService } from '../services/api';
import Loading from '../components/Loading';
import { FileText, ExternalLink, Trash2, Calendar, Building2, AlertCircle } from 'lucide-react';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationService.getMyApplications();
      setApplications(res.data.data || []);
    } catch (err) {
      console.error('Error fetching applications', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (id) => {
    if (!window.confirm('Are you sure you want to withdraw this job application?')) return;
    try {
      await applicationService.withdrawApplication(id);
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to withdraw application.');
    }
  };

  if (loading) return <Loading text="Fetching your submitted applications..." />;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>My Job Applications</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track real-time status of your job applications</p>
      </div>

      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <FileText size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>No applications submitted yet</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Browse active job postings and start applying today.</p>
          <Link to="/jobs" className="btn btn-primary">Find Jobs</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {applications.map((app) => (
            <div key={app.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    <Link to={`/jobs/${app.jobId}`} style={{ color: 'inherit' }}>
                      {app.jobTitle}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                    <Building2 size={16} /> {app.companyName}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className={`badge badge-${app.status}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}>
                    {app.status}
                  </span>
                  <button onClick={() => handleWithdraw(app.id)} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#fca5a5' }} title="Withdraw Application">
                    <Trash2 size={15} /> Withdraw
                  </button>
                </div>
              </div>

              {app.coverLetter && (
                <div style={{ padding: '0.85rem 1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', color: '#475569' }}>
                  <strong>Cover Note:</strong> "{app.coverLetter}"
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </span>
                <a href={app.resumeUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ExternalLink size={14} /> View Submitted Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
