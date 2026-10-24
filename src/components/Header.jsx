import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, User, LogOut, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="top-header">
      <div className="header-title">
        <h2>AI-Powered JobHub</h2>
        <p>Intelligent Recruitment & Job Recommendation System</p>
      </div>

      <div className="header-actions">
        <button style={{ position: 'relative', padding: '0.5rem', background: '#f1f5f9', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>
          <Bell size={18} color="#64748b" />
          <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
        </button>

        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', color: '#0f172a' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem' }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.2 }}>{user?.name || 'Nitish Kumar'}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'capitalize' }}>{user?.role || 'Candidate'}</span>
              </div>
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ padding: '0.4rem 0.6rem' }} title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
