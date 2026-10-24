import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginTop: '2.5rem' }}>
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn btn-outline btn-sm"
        style={{ padding: '0.4rem 0.75rem', gap: '0.2rem', opacity: currentPage === 0 ? 0.5 : 1 }}
      >
        <ChevronLeft size={16} /> Previous
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`btn btn-sm ${currentPage === p ? 'btn-primary' : 'btn-outline'}`}
          style={{ width: '34px', height: '34px', padding: 0, justifyContent: 'center', fontWeight: 700 }}
        >
          {p + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn btn-outline btn-sm"
        style={{ padding: '0.4rem 0.75rem', gap: '0.2rem', opacity: currentPage === totalPages - 1 ? 0.5 : 1 }}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
