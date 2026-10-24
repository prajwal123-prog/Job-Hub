import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Briefcase, ChevronRight, Globe, Building2 } from 'lucide-react';

const CompanyCard = ({ company }) => {
  const [imgError, setImgError] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'CO';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(company.name);

  return (
    <div className="card" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
      <div>
        {/* Company Header: Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          {company.logoUrl && !imgError ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              onError={() => setImgError(true)}
              style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border)' }}
            />
          ) : (
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', flexShrink: 0 }}>
              {initials}
            </div>
          )}

          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem', lineHeight: 1.3 }}>
              <Link to={`/companies/${company.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {company.name}
              </Link>
            </h3>
            {company.industry && (
              <span className="badge badge-jobtype" style={{ fontSize: '0.75rem', textTransform: 'none' }}>
                {company.industry}
              </span>
            )}
          </div>
        </div>

        {/* Short Description */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {company.description || 'Pioneering technology and innovative software solutions.'}
        </p>

        {/* Location & Size Metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={15} color="var(--primary)" />
            <span>{company.location || 'Bangalore, India'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Users size={15} color="var(--primary)" />
            <span>{company.companySize || '50-200 employees'}</span>
          </div>
        </div>
      </div>

      {/* Footer: Open Jobs Count & View Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Briefcase size={15} />
          {company.openJobsCount ?? 0} {(company.openJobsCount === 1) ? 'Open Job' : 'Open Jobs'}
        </span>

        <Link to={`/companies/${company.id}`} className="btn btn-outline btn-sm" style={{ fontWeight: 700, gap: '0.2rem' }}>
          View Company <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
