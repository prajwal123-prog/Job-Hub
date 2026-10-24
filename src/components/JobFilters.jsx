import React from 'react';
import { Filter, RotateCcw, MapPin, Briefcase, UserCheck, IndianRupee, Code } from 'lucide-react';

const JobFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Delhi', 'Remote'];
  const jobTypes = [
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Part Time', value: 'PART_TIME' },
    { label: 'Internship', value: 'INTERNSHIP' },
    { label: 'Contract', value: 'CONTRACT' },
  ];
  const experienceLevels = ['Fresher', '0-2 Years', '2-5 Years', '5+ Years'];
  const popularSkills = ['Java', 'Spring Boot', 'React', 'MySQL', 'Python', 'AWS', 'Docker'];

  const handleCheckboxToggle = (field, val) => {
    const current = filters[field] === val ? '' : val;
    onFilterChange({ [field]: current, page: 0 });
  };

  return (
    <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Filter size={18} color="var(--primary)" /> Filters
        </h3>

        <button
          onClick={onClearFilters}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
        >
          <RotateCcw size={12} /> Clear All
        </button>
      </div>

      {/* 1. Location */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <MapPin size={14} color="var(--text-muted)" /> Location
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
          {locations.map((loc, idx) => (
            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>
              <input
                type="checkbox"
                checked={filters.location === loc}
                onChange={() => handleCheckboxToggle('location', loc)}
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Job Type */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Briefcase size={14} color="var(--text-muted)" /> Job Type
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
          {jobTypes.map((type, idx) => (
            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>
              <input
                type="checkbox"
                checked={filters.jobType === type.value}
                onChange={() => handleCheckboxToggle('jobType', type.value)}
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Experience Level */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <UserCheck size={14} color="var(--text-muted)" /> Experience
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
          {experienceLevels.map((exp, idx) => (
            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>
              <input
                type="checkbox"
                checked={filters.experienceLevel === exp}
                onChange={() => handleCheckboxToggle('experienceLevel', exp)}
              />
              <span>{exp}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Minimum Salary Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <IndianRupee size={14} color="var(--text-muted)" /> Minimum Salary
        </h4>
        <select
          value={filters.minimumSalary || ''}
          onChange={(e) => onFilterChange({ minimumSalary: e.target.value, page: 0 })}
          className="form-select"
          style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem', borderRadius: '8px' }}
        >
          <option value="">Any Salary</option>
          <option value="300000">₹ 3 Lakh+ / year</option>
          <option value="600000">₹ 6 Lakh+ / year</option>
          <option value="1000000">₹ 10 Lakh+ / year</option>
          <option value="1500000">₹ 15 Lakh+ / year</option>
        </select>
      </div>

      {/* 5. Popular Skills */}
      <div>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Code size={14} color="var(--text-muted)" /> Filter by Skill
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {popularSkills.map((skill, idx) => {
            const isSelected = filters.skills === skill;
            return (
              <button
                key={idx}
                onClick={() => onFilterChange({ skills: isSelected ? '' : skill, page: 0 })}
                className="badge"
                style={{
                  background: isSelected ? 'var(--primary)' : '#f1f5f9',
                  color: isSelected ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '0.75rem',
                  padding: '0.3rem 0.65rem'
                }}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default JobFilters;
