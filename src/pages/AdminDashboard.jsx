import React from 'react';
import { Users, Building2, User, Briefcase, TrendingUp, PieChart } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome back, Admin 👋 System overview & user analytics</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="dash-grid-top">
        <div className="stat-card">
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Users</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.2rem 0' }}>1,250</h2>
          </div>
          <div className="stat-icon-wrapper" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <Users size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recruiters</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.2rem 0' }}>320</h2>
          </div>
          <div className="stat-icon-wrapper" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Building2 size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Candidates</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.2rem 0' }}>930</h2>
          </div>
          <div className="stat-icon-wrapper" style={{ background: '#dcfce7', color: '#059669' }}>
            <User size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Jobs</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.2rem 0' }}>850</h2>
          </div>
          <div className="stat-icon-wrapper" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
            <Briefcase size={22} />
          </div>
        </div>
      </div>

      {/* Main Grid: Users Overview & Jobs Overview Donut */}
      <div className="dash-grid-main">
        
        {/* Users Overview Line Growth Card */}
        <div className="card-widget">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Users Overview</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <TrendingUp size={16} /> +24% growth
            </span>
          </div>

          {/* SVG Line Graph */}
          <div style={{ width: '100%', height: '180px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
            {[
              { month: 'Jan', val: '40%' },
              { month: 'Feb', val: '55%' },
              { month: 'Mar', val: '65%' },
              { month: 'Apr', val: '80%' },
              { month: 'May', val: '95%' }
            ].map((item, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: item.val, background: 'linear-gradient(180deg, #2563eb 0%, #93c5fd 100%)', borderRadius: '6px 6px 0 0' }}></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs Overview Donut */}
        <div className="card-widget" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', width: '100%', textAlign: 'left' }}>Jobs Overview</h3>

          <div style={{ position: 'relative', width: '160px', height: '160px', borderRadius: '50%', background: 'conic-gradient(#059669 0% 70%, #f59e0b 70% 85%, #64748b 85% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
            <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>850</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Jobs</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%', marginTop: '0.5rem', fontSize: '0.8rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669' }}></span> Active Jobs</span>
              <span style={{ fontWeight: 700 }}>595</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span> Closed</span>
              <span style={{ fontWeight: 700 }}>127</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#64748b' }}></span> Draft</span>
              <span style={{ fontWeight: 700 }}>128</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
