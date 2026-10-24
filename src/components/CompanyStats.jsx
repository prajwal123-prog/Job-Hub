import React, { useState, useEffect } from 'react';
import { companyService } from '../services/api';
import { Building2, Briefcase, Users, Layers } from 'lucide-react';

const CompanyStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await companyService.getCompanyStats();
      setStats(res.data.data);
    } catch (err) {
      console.error('Error fetching company statistics', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-4" style={{ marginBottom: '3rem' }}>
      <div className="card" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #2563eb' }}>
        <div style={{ width: '42px', height: '42px', background: '#eff6ff', color: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Building2 size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
            {loading ? '...' : (stats?.totalCompanies ?? 0)}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Companies</span>
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #7c3aed' }}>
        <div style={{ width: '42px', height: '42px', background: '#f3e8ff', color: '#7c3aed', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Users size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
            {loading ? '...' : (stats?.companiesHiring ?? 0)}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Companies Hiring</span>
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #059669' }}>
        <div style={{ width: '42px', height: '42px', background: '#dcfce7', color: '#059669', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Briefcase size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
            {loading ? '...' : (stats?.openPositions ?? 0)}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Open Positions</span>
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '4px solid #d97706' }}>
        <div style={{ width: '42px', height: '42px', background: '#fffbeb', color: '#d97706', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Layers size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
            {loading ? '...' : (stats?.industries ?? 0)}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Industries</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;
