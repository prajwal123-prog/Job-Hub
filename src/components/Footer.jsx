import React from 'react';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <div className="logo" style={{ color: '#ffffff', marginBottom: '1rem' }}>
            <Briefcase size={24} /> Job<span>Hub</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Connecting talented people with meaningful opportunities.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>Platform</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/jobs">Companies</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>For Candidates</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><Link to="/jobs">Find Jobs</Link></li>
            <li><Link to="/saved-jobs">Saved Jobs</Link></li>
            <li><Link to="/candidate-dashboard">Applications</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>For Recruiters</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><Link to="/post-job">Post a Job</Link></li>
            <li><Link to="/recruiter-dashboard">Recruiter Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>Support</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); alert("JobHub Support: support@jobhub.com"); }}>Contact</a></li>
            <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert("JobHub Privacy Policy: All user data is secured with BCrypt and JWT encryption."); }}>Privacy Policy</a></li>
            <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert("JobHub Terms of Service: Standard software platform terms apply."); }}>Terms</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JobHub. All rights reserved. Powered by Spring Boot & React.</p>
      </div>
    </footer>
  );
};

export default Footer;
