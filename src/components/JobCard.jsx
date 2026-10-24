import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, IndianRupee, Heart, Clock, UserCheck } from 'lucide-react';
import { savedJobService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const JobCard = ({ job, isSavedInitial = false, onSaveToggle }) => {
  const [saved, setSaved] = useState(isSavedInitial);
  const [saving, setSaving] = useState(false);
  const { isAuthenticated, isCandidate } = useAuth();
  const navigate = useNavigate();

  const handleSaveToggle = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isCandidate) {
      alert('Only candidate accounts can save jobs.');
      return;
    }

    try {
      setSaving(true);
      if (saved) {
        await savedJobService.removeSavedJob(job.id);
        setSaved(false);
      } else {
        await savedJobService.saveJob(job.id);
        setSaved(true);
      }
      if (onSaveToggle) onSaveToggle(job.id, !saved);
    } catch (err) {
      console.error('Error toggling saved job status', err);
    } finally {
      setSaving(false);
    }
  };

  // Helper to format salary
  const formatSalary = (min, max) => {
    if (!min && !max) return 'Negotiable';
    if (min && max) {
      return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    }
    return min ? `₹${(min / 100000).toFixed(1)}L+` : `Up to ₹${(max / 100000).toFixed(1)}L`;
  };

  // Helper to format date
  const timeAgo = (dateString) => {
    if (!dateString) return 'Recently posted';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const hours = Math.floor(seconds / 3600);
    if (hours < 1) return 'Posted just now';
    if (hours < 24) return `Posted ${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `Posted ${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  const skillsList = job.skills ? job.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const companyInitial = (job.companyName || 'C').charAt(0).toUpperCase();

  return (
    <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
      <div>
        {/* Header: Company Logo/Initial & Job Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#ffffff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', flexShrink: 0 }}>
              {companyInitial}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem', lineHeight: 1.3 }}>
                <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {job.title}
                </Link>
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{job.companyName}</span>
            </div>
          </div>

          {/* Bookmark Save Button */}
          <button
            onClick={handleSaveToggle}
            disabled={saving}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: saved ? '#e11d48' : '#94a3b8', padding: '0.25rem', transition: 'color 0.2s ease' }}
            title={saved ? 'Remove from Saved Jobs' : 'Save Job'}
          >
            <Heart size={20} fill={saved ? '#e11d48' : 'none'} />
          </button>
        </div>

        {/* Metadata Details */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={15} color="var(--primary)" />
            <span>{job.location || 'Remote'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Briefcase size={15} color="var(--primary)" />
            <span className="badge badge-jobtype">{job.jobType ? job.jobType.replace('_', ' ') : 'FULL TIME'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <UserCheck size={15} color="var(--primary)" />
            <span>{job.experienceLevel || '0-2 Years'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: '#059669' }}>
            <IndianRupee size={15} />
            <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
          </div>
        </div>

        {/* Required Skills Pills */}
        {skillsList.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
            {skillsList.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="badge badge-jobtype" style={{ fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Posted time & View Job button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={13} /> {timeAgo(job.createdAt)}
        </span>

        <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm" style={{ fontWeight: 700, padding: '0.45rem 1rem' }}>
          View Job
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
