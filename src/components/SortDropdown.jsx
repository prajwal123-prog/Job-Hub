import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const SortDropdown = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
      <ArrowUpDown size={16} color="var(--primary)" />
      <span style={{ fontWeight: 600 }}>Sort By:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
        style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', width: 'auto', fontWeight: 600, cursor: 'pointer', borderRadius: '8px' }}
      >
        <option value="createdAt,desc">Most Recent</option>
        <option value="createdAt,asc">Oldest</option>
        <option value="salaryMax,desc">Salary: High to Low</option>
        <option value="salaryMin,asc">Salary: Low to High</option>
      </select>
    </div>
  );
};

export default SortDropdown;
