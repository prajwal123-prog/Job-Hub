import React, { useState, useEffect } from 'react';
import { homeService } from '../services/api';
import { Briefcase, Building2, GraduationCap, Users } from 'lucide-react';

const StatsSection = () => {
  const [stats, setStats] = useState({ totalJobs: 0, totalCompanies: 0, internships: 0, activeRecruiters: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await homeService.getHomeStats();
      if (res?.data?.data) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Error loading live home statistics', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>JobHub at a Glance</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Real-time statistics fetched directly from our Spring Boot & MySQL database</p>
      </div>

      <div className="grid-4">
        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '4px solid #2563eb' }}>
          <div style={{ width: '48px', height: '48px', background: '#eff6ff', color: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
              {stats.totalJobs}
            </h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Jobs</span>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ width: '48px', height: '48px', background: '#f3e8ff', color: '#7c3aed', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
              {stats.totalCompanies}
            </h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Companies</span>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '4px solid #059669' }}>
          <div style={{ width: '48px', height: '48px', background: '#dcfce7', color: '#059669', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
              {stats.internships}
            </h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Internships</span>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '4px solid #d97706' }}>
          <div style={{ width: '48px', height: '48px', background: '#fffbeb', color: '#d97706', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
              {stats.activeRecruiters}
            </h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Recruiters</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
