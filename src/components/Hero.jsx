import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

const Hero = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.append('keyword', keyword.trim());
    if (location.trim()) params.append('location', location.trim());
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #1e293b 100%)',
      color: '#ffffff',
      padding: '4.5rem 2rem 5rem',
      borderRadius: '20px',
      marginBottom: '3.5rem',
      boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.3)',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div style={{
        display: 'inline-block',
        background: 'rgba(37, 99, 235, 0.2)',
        color: '#60a5fa',
        padding: '0.4rem 1.25rem',
        borderRadius: '30px',
        fontSize: '0.875rem',
        fontWeight: 700,
        marginBottom: '1.5rem',
        border: '1px solid rgba(96, 165, 250, 0.3)'
      }}>
        WELCOME TO JOBHUB
      </div>

      <h1 style={{
        fontSize: '3rem',
        fontWeight: 900,
        lineHeight: 1.2,
        marginBottom: '1.25rem',
        color: '#ffffff',
        letterSpacing: '-0.02em'
      }}>
        Find the right job. Build your future.
      </h1>

      <p style={{
        fontSize: '1.15rem',
        color: '#cbd5e1',
        maxWidth: '700px',
        margin: '0 auto 2.5rem',
        lineHeight: 1.6
      }}>
        Discover opportunities that match your skills, experience, and career goals.
      </p>

      {/* Real Backend Job Search Form */}
      <form onSubmit={handleSearch} style={{
        maxWidth: '850px',
        margin: '0 auto',
        background: '#ffffff',
        padding: '0.75rem',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 250px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '14px' }} />
          <input
            type="text"
            placeholder="Job title, skill or keyword (e.g. Java, React)..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 0.85rem 0.85rem 2.6rem', border: 'none', background: 'transparent', color: '#0f172a', fontSize: '0.95rem', outline: 'none', fontWeight: 500 }}
          />
        </div>

        <div style={{ flex: '1 1 200px', position: 'relative', display: 'flex', alignItems: 'center', borderLeft: '1px solid #e2e8f0', paddingLeft: '0.5rem' }}>
          <MapPin size={20} color="#94a3b8" style={{ position: 'absolute', left: '14px' }} />
          <input
            type="text"
            placeholder="Location (e.g. Bangalore, Remote)..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 0.85rem 0.85rem 2.6rem', border: 'none', background: 'transparent', color: '#0f172a', fontSize: '0.95rem', outline: 'none', fontWeight: 500 }}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 800, borderRadius: '12px', background: '#2563eb' }}>
          Search Jobs
        </button>
      </form>
    </div>
  );
};

export default Hero;
