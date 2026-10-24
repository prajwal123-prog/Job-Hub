import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { UserPlus, Mail, Lock, User, Phone, MapPin, Briefcase, AlertCircle, Sparkles, Building2 } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState('CANDIDATE');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    bio: '',
    skills: '',
    experience: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { ...formData, role };
      const res = await authService.register(payload);
      const authData = res.data.data;

      login(authData.token, authData.user);

      if (role === 'RECRUITER') {
        navigate('/recruiter-dashboard');
      } else {
        navigate('/candidate-dashboard');
      }
    } catch (err) {
      console.error('Registration error', err);
      const msg = err.response?.data?.message || 'Registration failed. Please check your information.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '2rem auto' }}>
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Create Your JobHub Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Join thousands of job seekers and employers today</p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <button
            type="button"
            onClick={() => setRole('CANDIDATE')}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid',
              borderColor: role === 'CANDIDATE' ? 'var(--primary)' : 'var(--border)',
              background: role === 'CANDIDATE' ? 'var(--primary-light)' : 'var(--surface)',
              color: role === 'CANDIDATE' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <User size={24} />
            <span>Job Seeker (Candidate)</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('RECRUITER')}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid',
              borderColor: role === 'RECRUITER' ? 'var(--primary)' : 'var(--border)',
              background: role === 'RECRUITER' ? 'var(--primary-light)' : 'var(--surface)',
              color: role === 'RECRUITER' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Building2 size={24} />
            <span>Employer (Recruiter)</span>
          </button>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffe4e6', color: '#be123c', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Password * (Min 6 chars)</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-input"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location (City, Country)</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="e.g. Bangalore, India"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {role === 'CANDIDATE' && (
            <>
              <div className="form-group">
                <label className="form-label">Key Skills (Comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  className="form-input"
                  placeholder="e.g. Java, Spring Boot, MySQL, React"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Experience Summary</label>
                <input
                  type="text"
                  name="experience"
                  className="form-input"
                  placeholder="e.g. 2 years experience in Backend Java Development"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Bio / Profile Summary</label>
            <textarea
              name="bio"
              className="form-textarea"
              placeholder="Tell recruiters or candidates about yourself..."
              value={formData.bio}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : (
              <>
                <UserPlus size={18} /> Register as {role === 'CANDIDATE' ? 'Candidate' : 'Recruiter'}
              </>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
