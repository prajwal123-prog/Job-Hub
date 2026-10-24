import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/api';
import { PlusCircle, Building2, MapPin, DollarSign, Briefcase, Code, AlertCircle, CheckCircle } from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    location: '',
    jobType: 'FULL_TIME',
    experienceLevel: '0-2 years',
    salaryMin: '',
    salaryMax: '',
    skills: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        salaryMin: formData.salaryMin ? parseFloat(formData.salaryMin) : null,
        salaryMax: formData.salaryMax ? parseFloat(formData.salaryMax) : null,
      };

      await jobService.createJob(payload);
      setSuccess('Job position posted successfully!');
      setTimeout(() => {
        navigate('/recruiter-dashboard');
      }, 1200);
    } catch (err) {
      console.error('Post job error', err);
      setError(err.response?.data?.message || 'Failed to post job. Please check input values.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '750px', margin: '2rem auto' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Post a New Job Opening</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Reach qualified software developers and engineering candidates</p>
        </div>

        {success && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#15803d', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <CheckCircle size={18} /> {success}
          </div>
        )}

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffe4e6', color: '#be123c', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g. Senior Java Backend Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                name="companyName"
                className="form-input"
                placeholder="e.g. Tech Corp Systems"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Location *</label>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="Bangalore / Remote"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Job Type *</label>
              <select name="jobType" className="form-select" value={formData.jobType} onChange={handleChange} required>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Experience Level</label>
              <input
                type="text"
                name="experienceLevel"
                className="form-input"
                placeholder="0-2 yrs / 3-5 yrs"
                value={formData.experienceLevel}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Minimum Annual Salary (INR ₹)</label>
              <input
                type="number"
                name="salaryMin"
                className="form-input"
                placeholder="e.g. 800000"
                value={formData.salaryMin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Maximum Annual Salary (INR ₹)</label>
              <input
                type="number"
                name="salaryMax"
                className="form-input"
                placeholder="e.g. 1400000"
                value={formData.salaryMax}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Required Technical Skills (Comma separated) *</label>
            <input
              type="text"
              name="skills"
              className="form-input"
              placeholder="Java, Spring Boot, MySQL, REST API, Docker"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Job Description *</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Describe candidate responsibilities, team environment, key requirements..."
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Posting Position...' : (
              <>
                <PlusCircle size={18} /> Publish Job Opening
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
