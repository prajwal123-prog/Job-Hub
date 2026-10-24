import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/api';
import { Code, Server, Database, TrendingUp, ChevronRight } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  { name: 'Software Engineering', count: 0 },
  { name: 'Java & Backend Development', count: 0 },
  { name: 'React & Frontend Development', count: 0 },
  { name: 'Data & Database Science', count: 0 },
  { name: 'DevOps & Cloud', count: 0 }
];

const Categories = () => {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const navigate = useNavigate();

  const iconMap = {
    'Software Engineering': Code,
    'Java & Backend Development': Server,
    'React & Frontend Development': TrendingUp,
    'Data & Database Science': Database,
    'DevOps & Cloud': Server
  };

  const colorMap = {
    'Software Engineering': { color: '#2563eb', bg: '#eff6ff' },
    'Java & Backend Development': { color: '#0d9488', bg: '#f0fdf4' },
    'React & Frontend Development': { color: '#d97706', bg: '#fffbeb' },
    'Data & Database Science': { color: '#7c3aed', bg: '#f3e8ff' },
    'DevOps & Cloud': { color: '#2563eb', bg: '#eff6ff' }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await jobService.getCategories();
      if (res?.data?.data && res.data.data.length > 0) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Error loading job categories', err);
    }
  };

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Popular Categories</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Browse active jobs by specialized technical domain</p>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          Job categories will appear here once jobs are posted.
        </div>
      ) : (
        <div className="grid-4">
          {categories.map((cat, idx) => {
            const IconComponent = iconMap[cat.name] || Code;
            const style = colorMap[cat.name] || { color: '#2563eb', bg: '#eff6ff' };
            const keyword = cat.name.split(' ')[0];

            return (
              <div
                key={idx}
                className="card"
                style={{
                  cursor: 'pointer',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => navigate(`/jobs?keyword=${keyword}`)}
              >
                <div style={{ width: '48px', height: '48px', background: style.bg, color: style.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>{cat.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {cat.count} {cat.count === 1 ? 'Job' : 'Jobs'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Categories;
