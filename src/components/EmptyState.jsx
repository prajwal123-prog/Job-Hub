import React from 'react';
import { Briefcase, RotateCcw } from 'lucide-react';

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
      <div style={{ width: '64px', height: '64px', background: '#eff6ff', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
        <Briefcase size={32} />
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
        No jobs found
      </h3>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '450px', margin: '0 auto 1.75rem' }}>
        Try changing your search criteria, keyword filters, or location parameters.
      </p>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="btn btn-outline"
          style={{ gap: '0.5rem', fontWeight: 700, padding: '0.65rem 1.5rem' }}
        >
          <RotateCcw size={16} /> Clear All Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
