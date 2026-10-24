import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, LayoutDashboard, User, Search, FileText, Bookmark, Sparkles, 
  PlusCircle, Building2, Users, FileSearch, Settings, BarChart2, CheckCircle2 
} from 'lucide-react';

const Sidebar = () => {
  const { user, isCandidate, isRecruiter, isAuthenticated } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div style={{ padding: '0.4rem', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <Briefcase size={20} color="#ffffff" />
          </div>
          Job<span>Hub</span>
        </div>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink 
            to={isRecruiter ? "/recruiter-dashboard" : "/candidate-dashboard"} 
            className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* CANDIDATE SECTION */}
        <div className="sidebar-section-label">Candidate</div>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
            <User size={18} />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ai-resume-analyzer" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
            <Sparkles size={18} color="#38bdf8" />
            <span>AI Resume Analyzer</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
            <Search size={18} />
            <span>Find Jobs</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/applications" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
            <FileText size={18} />
            <span>Applied Jobs</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/saved-jobs" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
            <Bookmark size={18} />
            <span>Saved Jobs</span>
          </NavLink>
        </li>

        {/* RECRUITER SECTION */}
        <div className="sidebar-section-label">Recruiter</div>
        <li>
          <NavLink to="/post-job" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
            <PlusCircle size={18} />
            <span>Post Job</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recruiter-dashboard" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
            <Building2 size={18} />
            <span>My Jobs & Applicants</span>
          </NavLink>
        </li>

        {/* ADMIN SECTION */}
        <div className="sidebar-section-label">Admin</div>
        <li>
          <NavLink to="/admin-dashboard" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}>
            <BarChart2 size={18} />
            <span>Admin Dashboard</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
