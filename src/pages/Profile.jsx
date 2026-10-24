import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import { 
  User, Mail, Phone, MapPin, Briefcase, Code, CheckCircle, 
  AlertCircle, Save, Camera, FileText, ExternalLink, DollarSign, Clock, 
  GraduationCap, Linkedin, Github, Globe, Upload, Building2
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const isCandidate = user?.role === 'CANDIDATE';

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    skills: user?.skills || '',
    experience: user?.experience || '',
    profilePic: user?.profilePic || '',
    
    // Naukri.com & Recruiter Profile Fields
    designation: user?.designation || '',
    headline: user?.headline || '',
    resumeUrl: user?.resumeUrl || '',
    currentCtc: user?.currentCtc || '',
    expectedCtc: user?.expectedCtc || '',
    noticePeriod: user?.noticePeriod || 'Immediate Joiner',
    education: user?.education || '',
    linkedIn: user?.linkedIn || '',
    gitHub: user?.gitHub || '',
    portfolioUrl: user?.portfolioUrl || '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Upload handler for Base64 Data URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Profile picture size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Direct PDF Resume Upload Handler
  const handlePdfResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a valid PDF format document (.pdf)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('PDF Resume file size must be less than 5MB');
        return;
      }
      setResumeFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, resumeUrl: reader.result }));
        setSuccess(`PDF Resume "${file.name}" attached! Click save to update.`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: user.email,
        role: user.role,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        skills: formData.skills,
        experience: formData.experience,
        profilePic: formData.profilePic,
        designation: formData.designation,
        headline: formData.headline,
        resumeUrl: formData.resumeUrl,
        currentCtc: formData.currentCtc,
        expectedCtc: formData.expectedCtc,
        noticePeriod: formData.noticePeriod,
        education: formData.education,
        linkedIn: formData.linkedIn,
        gitHub: formData.gitHub,
        portfolioUrl: formData.portfolioUrl,
      };

      const res = await userService.updateUser(user.id, payload);
      const updatedUserData = res.data.data;

      // Synchronize updated user object across application state
      updateUser(updatedUserData);
      setSuccess(`${isCandidate ? 'Candidate Naukri Profile' : 'Recruiter Company Profile'} updated successfully!`);
    } catch (err) {
      console.error('Update profile error', err);
      setError(err.response?.data?.message || 'Failed to update profile details.');
    } finally {
      setLoading(false);
    }
  };

  // Role-based Dynamic Profile Strength calculation
  const candidateFields = [
    Boolean(formData.name),
    Boolean(formData.phone),
    Boolean(formData.location),
    Boolean(formData.skills),
    Boolean(formData.bio),
    Boolean(formData.resumeUrl),
    Boolean(formData.designation),
    Boolean(formData.headline),
    Boolean(formData.education),
    Boolean(formData.linkedIn || formData.gitHub || formData.portfolioUrl)
  ];

  const recruiterFields = [
    Boolean(formData.name),
    Boolean(formData.phone),
    Boolean(formData.location),
    Boolean(formData.bio),
    Boolean(formData.designation),
    Boolean(formData.skills),
    Boolean(formData.linkedIn || formData.portfolioUrl)
  ];

  const activeFields = isCandidate ? candidateFields : recruiterFields;
  const profilePercentage = Math.round((activeFields.filter(Boolean).length / activeFields.length) * 100);

  return (
    <div style={{ maxWidth: '900px', margin: '1.5rem auto' }}>
      
      {/* 1. Role-Tailored Header Profile Banner */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', borderTop: `5px solid ${isCandidate ? 'var(--primary)' : '#7c3aed'}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              {formData.profilePic ? (
                <img
                  src={formData.profilePic}
                  alt="Profile Avatar"
                  style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${isCandidate ? 'var(--primary)' : '#7c3aed'}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              ) : (
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: isCandidate ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 800 }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}

              <label style={{ position: 'absolute', bottom: '0', right: '0', background: isCandidate ? 'var(--primary)' : '#7c3aed', color: '#ffffff', padding: '0.45rem', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} title="Change Profile Picture">
                <Camera size={16} />
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{formData.name || user?.name}</h1>
                <span className="badge" style={{ background: isCandidate ? '#eff6ff' : '#f3e8ff', color: isCandidate ? '#2563eb' : '#7c3aed', fontWeight: 800 }}>
                  {user?.role}
                </span>

                <span className="badge" style={{ background: '#dcfce7', color: '#15803d', fontWeight: 700 }}>
                  Strength: {profilePercentage}%
                </span>
                
                {isCandidate && formData.noticePeriod && (
                  <span className="badge" style={{ background: '#fef3c7', color: '#b45309', fontWeight: 700 }}>
                    ⚡ {formData.noticePeriod}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '1rem', fontWeight: 700, color: isCandidate ? 'var(--primary)' : '#7c3aed', marginBottom: '0.4rem' }}>
                {formData.designation || (isCandidate ? 'Software Developer' : 'Senior HR / Technical Recruiter')}
              </p>

              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {formData.location || 'Location Not Set'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={14} /> {formData.phone || 'Phone Not Set'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={14} /> {formData.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {isCandidate && formData.resumeUrl && (
              <a href={formData.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
                <FileText size={14} /> View PDF Resume
              </a>
            )}
            {formData.portfolioUrl && (
              <a href={formData.portfolioUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ gap: '0.4rem' }}>
                <Globe size={14} /> {isCandidate ? 'Portfolio Site' : 'Company Website'}
              </a>
            )}
          </div>
        </div>

        {/* Profile Strength Progress Bar */}
        <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155' }}>
              {isCandidate ? 'Candidate Job Profile Strength' : 'Recruiter Company Profile Strength'}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: profilePercentage === 100 ? '#15803d' : 'var(--primary)' }}>
              {profilePercentage}% {profilePercentage === 100 ? '✓ Complete' : ''}
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${profilePercentage}%`, height: '100%', background: profilePercentage === 100 ? '#059669' : 'linear-gradient(90deg, #2563eb, #7c3aed)', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>

        {/* Resume Headline Box for Candidate */}
        {isCandidate && formData.headline && (
          <div style={{ marginBottom: '1.5rem', padding: '0.85rem 1.25rem', background: '#eff6ff', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)', fontSize: '0.9rem', color: '#1e3a8a', fontWeight: 500 }}>
            <strong>Resume Headline:</strong> "{formData.headline}"
          </div>
        )}
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

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        
        {/* CANDIDATE SPECIFIC SECTION: PDF Resume & Headline */}
        {isCandidate && (
          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText color="var(--primary)" size={20} /> PDF Resume Upload & Headline
            </h3>

            <div style={{ padding: '1.25rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border)', marginBottom: '1.25rem', textAlign: 'center' }}>
              <FileText size={32} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>Upload Resume File (.PDF format)</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Select a PDF resume file from your computer (Max size 5MB)</p>
              
              <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', gap: '0.4rem' }}>
                <Upload size={14} /> Choose PDF File
                <input type="file" accept=".pdf,application/pdf" onChange={handlePdfResumeUpload} style={{ display: 'none' }} />
              </label>

              {resumeFileName && (
                <p style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 600, marginTop: '0.6rem' }}>
                  ✓ Selected PDF: {resumeFileName}
                </p>
              )}

              {formData.resumeUrl && (
                <div style={{ marginTop: '0.75rem' }}>
                  <a href={formData.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ gap: '0.3rem' }}>
                    <ExternalLink size={14} /> Open / Download Current PDF Resume
                  </a>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Or Paste PDF Resume Cloud Link (Google Drive / Dropbox)</label>
              <input
                type="text"
                name="resumeUrl"
                className="form-input"
                placeholder="https://drive.google.com/file/d/your-resume-pdf/view"
                value={formData.resumeUrl}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Resume Headline (1-2 Line Professional Summary)</label>
              <input
                type="text"
                name="headline"
                className="form-input"
                placeholder="e.g. Passionate Java & Spring Boot Engineer with 2 Yrs experience building REST APIs & MySQL databases"
                value={formData.headline}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* BASIC CONTACT & ROLE DETAILS */}
        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User color="var(--accent)" size={20} /> {isCandidate ? 'Basic & Contact Details' : 'Recruiter & Contact Details'}
          </h3>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">{isCandidate ? 'Full Name *' : 'Recruiter Full Name *'}</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{isCandidate ? 'Current Designation / Title' : 'HR Title / Designation'}</label>
              <input
                type="text"
                name="designation"
                className="form-input"
                placeholder={isCandidate ? 'e.g. Java Backend Developer' : 'e.g. Talent Acquisition Manager / HR Lead'}
                value={formData.designation}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Email Address (Read Only)</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                disabled
                style={{ background: 'var(--background)', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-input"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{isCandidate ? 'Preferred Job Location' : 'Hiring Location'}</label>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="Bangalore, India"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* RECRUITER SPECIFIC SECTION: Organization / Company Details */}
        {!isCandidate && (
          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 color="#7c3aed" size={20} /> Organization & Hiring Company Info
            </h3>

            <div className="form-group">
              <label className="form-label">Company / Organization Name</label>
              <input
                type="text"
                name="skills"
                className="form-input"
                placeholder="e.g. Tech Solutions Pvt Ltd"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company Overview / Description</label>
              <textarea
                name="bio"
                className="form-textarea"
                placeholder="Describe your company culture, technology stack, and hiring vision..."
                value={formData.bio}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* CANDIDATE SPECIFIC SECTION: Salary & Career Preferences */}
        {isCandidate && (
          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign color="#059669" size={20} /> Salary & Notice Period Preferences
            </h3>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Current Annual CTC (₹ INR / LPA)</label>
                <input
                  type="text"
                  name="currentCtc"
                  className="form-input"
                  placeholder="e.g. 6.5 LPA"
                  value={formData.currentCtc}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expected Annual CTC (₹ INR / LPA)</label>
                <input
                  type="text"
                  name="expectedCtc"
                  className="form-input"
                  placeholder="e.g. 10.0 LPA"
                  value={formData.expectedCtc}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notice Period</label>
                <select
                  name="noticePeriod"
                  className="form-select"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                >
                  <option value="Immediate Joiner">Immediate Joiner</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Highest Education / Degree</label>
              <input
                type="text"
                name="education"
                className="form-input"
                placeholder="e.g. B.Tech Computer Science (2024)"
                value={formData.education}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* CANDIDATE SPECIFIC SECTION: Technical Skills & Experience */}
        {isCandidate && (
          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code color="var(--primary)" size={20} /> Key Skills & Work Experience
            </h3>

            <div className="form-group">
              <label className="form-label">Key Technical Skills (Comma separated)</label>
              <input
                type="text"
                name="skills"
                className="form-input"
                placeholder="Java, Spring Boot, MySQL, REST API, React, Microservices"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Work Experience Summary</label>
              <textarea
                name="experience"
                className="form-textarea"
                placeholder="Detail your key software development experience and projects..."
                value={formData.experience}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio / Profile Overview</label>
              <textarea
                name="bio"
                className="form-textarea"
                placeholder="Write a brief overview about your career goals and background..."
                value={formData.bio}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* SOCIAL & PORTFOLIO LINKS FOR BOTH ROLES */}
        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe color="#059669" size={20} /> {isCandidate ? 'Portfolio & Social Profile Links' : 'Company Website & Social Links'}
          </h3>

          <div className="form-group">
            <label className="form-label">{isCandidate ? 'Personal Portfolio Website URL' : 'Company Official Website URL'}</label>
            <input
              type="text"
              name="portfolioUrl"
              className="form-input"
              placeholder={isCandidate ? 'https://myportfolio.dev' : 'https://techsolutions.com'}
              value={formData.portfolioUrl}
              onChange={handleChange}
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">{isCandidate ? 'LinkedIn Profile URL' : 'LinkedIn Company Page'}</label>
              <input
                type="text"
                name="linkedIn"
                className="form-input"
                placeholder="https://linkedin.com/in/your-profile"
                value={formData.linkedIn}
                onChange={handleChange}
              />
            </div>

            {isCandidate && (
              <div className="form-group">
                <label className="form-label">GitHub Profile URL</label>
                <input
                  type="text"
                  name="gitHub"
                  className="form-input"
                  placeholder="https://github.com/your-username"
                  value={formData.gitHub}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', background: isCandidate ? 'var(--primary)' : '#7c3aed' }} disabled={loading}>
          {loading ? 'Saving Profile Changes...' : (
            <>
              <Save size={18} style={{ marginRight: '0.5rem' }} /> Save {isCandidate ? 'Candidate Profile' : 'Recruiter Company Profile'}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;
