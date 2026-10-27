
import React, { useState } from 'react';
import { companyService } from '../services/api';

const initialForm = {
  name: '',
  logoUrl: '',
  description: '',
  industry: '',
  website: '',
  location: '',
  companySize: '',
  foundedYear: '',
};

const CompanyProfile = () => {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      const payload = {
        ...form,
        foundedYear: form.foundedYear
          ? Number(form.foundedYear)
          : null,
      };

      const response =
        await companyService.createOrUpdateCompany(payload);

      if (response.data?.success === false) {
        throw new Error(
          response.data.message || 'Unable to save company profile.'
        );
      }

      setSuccess(
        response.data?.message || 'Company profile saved successfully!'
      );
    } catch (err) {
      console.error('Error saving company profile:', err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Unable to save company profile. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
    background: '#fff',
    color: '#0f172a',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '7px',
    fontWeight: 600,
    color: '#334155',
  };

  const fieldStyle = {
    marginBottom: '20px',
  };

  return (
    <div
      style={{
        maxWidth: '850px',
        margin: '35px auto',
        padding: '0 20px',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 'clamp(20px, 4vw, 36px)',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
          border: '1px solid #e2e8f0',
        }}
      >
        <h1 style={{ marginTop: 0, color: '#0f172a' }}>
          Company Profile
        </h1>

        <p style={{ color: '#64748b', marginBottom: '28px' }}>
          Add your company information so candidates can learn
          more about your organization.
        </p>

        {success && (
          <div
            role="status"
            style={{
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '8px',
              background: '#dcfce7',
              color: '#166534',
            }}
          >
            {success}
          </div>
        )}

        {error && (
          <div
            role="alert"
            style={{
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '8px',
              background: '#fee2e2',
              color: '#991b1b',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label htmlFor="name" style={labelStyle}>
              Company Name *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Demo Technologies"
              required
              maxLength={150}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="industry" style={labelStyle}>
              Industry
            </label>
            <input
              id="industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              placeholder="e.g. Software / IT"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="description" style={labelStyle}>
              Company Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell candidates about your company..."
              rows={5}
              style={{
                ...inputStyle,
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="website" style={labelStyle}>
              Company Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={form.website}
              onChange={handleChange}
              placeholder="https://example.com"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="logoUrl" style={labelStyle}>
              Logo URL
            </label>
            <input
              id="logoUrl"
              name="logoUrl"
              type="url"
              value={form.logoUrl}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="location" style={labelStyle}>
              Location
            </label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Bengaluru"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="companySize" style={labelStyle}>
              Company Size
            </label>
            <select
              id="companySize"
              name="companySize"
              value={form.companySize}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="foundedYear" style={labelStyle}>
              Founded Year
            </label>
            <input
              id="foundedYear"
              name="foundedYear"
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              value={form.foundedYear}
              onChange={handleChange}
              placeholder="e.g. 2020"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '9px',
              background: saving ? '#64748b' : '#2563eb',
              color: '#fff',
              fontWeight: 700,
              fontSize: '16px',
              cursor: saving ? 'wait' : 'pointer',
            }}
          >
            {saving ? 'Saving...' : 'Save Company Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
