import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isCandidate, isRecruiter, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardPath = isRecruiter ? '/recruiter-dashboard' : '/candidate-dashboard';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Briefcase color="var(--primary)" size={24} />
          Job <span>Hub</span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', color: 'var(--text-main)' }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Jobs
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Companies
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              About
            </NavLink>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <NavLink to={dashboardPath} onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
                  Dashboard
                </NavLink>
              </li>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem' }}>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit', padding: '0.35rem 0.75rem', background: 'var(--background)', borderRadius: 'var(--radius-full)' }}>
                  {user?.profilePic ? (
                    <img src={user.profilePic} alt="Profile" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <User size={16} color="var(--primary)" />
                  )}
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{user?.name}</span>
                </Link>

                <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ padding: '0.4rem 0.6rem' }} title="Logout">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
