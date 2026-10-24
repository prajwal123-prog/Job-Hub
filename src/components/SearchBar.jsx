import React, { useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

const SearchBar = ({ onSearch, initialKeyword = '', initialLocation = '', initialJobType = '' }) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [jobType, setJobType] = useState(initialJobType);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, location, jobType });
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: '1rem', background: '#ffffff', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--background)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
          <Search size={18} color="var(--primary)" />
          <input
            type="text"
            placeholder="Job title, skills, or company..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--background)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
          <MapPin size={18} color="var(--accent)" />
          <input
            type="text"
            placeholder="City, state, or location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--background)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
          <Briefcase size={18} color="var(--text-muted)" />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem', cursor: 'pointer' }}
          >
            <option value="">All Job Types</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" style={{ height: '100%', minHeight: '44px' }}>
          <Search size={18} /> Search Jobs
        </button>

      </div>
    </form>
  );
};

export default SearchBar;
