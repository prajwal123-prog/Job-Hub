import React, { useState } from 'react';
import { applicationService } from '../services/api';
import { X, Send, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

const ApplyJobModal = ({ job, onClose, onSuccess }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await applicationService.applyForJob({
        jobId: job.id,
        coverLetter: coverLetter.trim(),
        resumeUrl: resumeUrl.trim()
      });
      onSuccess();
    } catch (err) {
      console.error('Error submitting application', err);
      const msg = err.response?.data?.message || 'Failed to submit application. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div className="card" style={{ maxWidth: '540px', width: '100%', padding: '2rem', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
          Apply for {job.title}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {job.companyName} • {job.location || 'Remote'}
        </p>

        {error && (
          <div style={{ background: '#ffe4e6', color: '#be123c', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Resume PDF Link / URL</label>
            <input
              type="text"
              placeholder="e.g. https://drive.google.com/your-resume.pdf"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="form-input"
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Paste Google Drive or PDF link to your resume</span>
          </div>

          <div className="form-group">
            <label className="form-label">Cover Letter Note</label>
            <textarea
              rows={4}
              placeholder="Explain why you are a great fit for this position..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ gap: '0.4rem', fontWeight: 800 }}>
              {submitting ? 'Submitting...' : <><Send size={16} /> Submit Application</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;
