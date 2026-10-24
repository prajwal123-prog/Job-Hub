import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { companyService } from '../services/api';
import CompanyCard from '../components/CompanyCard';
import CompanyStats from '../components/CompanyStats';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { Search, MapPin, Building2, Filter, ArrowUpDown } from 'lucide-react';

const Companies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Filters state initialized from URL search params
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    industry: searchParams.get('industry') || '',
    location: searchParams.get('location') || '',
    sort: 'name,asc',
    page: 0,
    size: 12,
  });

  const industriesList = [
    'Software / IT',
    'Fintech',
    'E-commerce',
    'Healthcare',
    'Education',
    'Cloud Computing',
    'AI & Machine Learning',
    'Cybersecurity'
  ];

  useEffect(() => {
    fetchCompanies();
  }, [filters]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError('');

      const [sortBy, sortDir] = filters.sort.split(',');
      const params = {
        keyword: filters.keyword || undefined,
        industry: filters.industry || undefined,
        location: filters.location || undefined,
        page: filters.page,
        size: filters.size,
        sortBy,
        sortDir
      };

      const res = await companyService.searchCompanies(params);
      const data = res.data.data;
      setCompanies(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
      setCurrentPage(data.page || 0);
    } catch (err) {
      console.error('Error fetching companies', err);
      setError('Unable to load companies right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      keyword: '',
      industry: '',
      location: '',
      sort: 'name,asc',
      page: 0,
      size: 12,
    });
    setSearchParams({});
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 0 }));
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* 1. Hero Search Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        color: '#ffffff',
        padding: '3.5rem 2rem 4rem',
        borderRadius: '24px',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1.25rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Building2 size={16} color="#38bdf8" /> COMPANY DISCOVERY PORTAL
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 900, marginBottom: '1rem', color: '#ffffff' }}>
          Explore Companies
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 2.25rem' }}>
          Discover companies, explore their opportunities, and find the right workplace for your career.
        </p>

        {/* Real Backend Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#ffffff',
          padding: '0.75rem',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 240px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Search company name..."
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.4rem', border: 'none', background: 'transparent', color: '#0f172a', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>

          <select
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value, page: 0 })}
            style={{ flex: '1 1 180px', padding: '0.75rem', border: 'none', background: 'transparent', borderLeft: '1px solid #e2e8f0', color: '#0f172a', fontSize: '0.95rem', outline: 'none', cursor: 'pointer' }}
          >
            <option value="">All Industries</option>
            {industriesList.map((ind, i) => (
              <option key={i} value={ind}>{ind}</option>
            ))}
          </select>

          <div style={{ flex: '1 1 180px', position: 'relative', display: 'flex', alignItems: 'center', borderLeft: '1px solid #e2e8f0', paddingLeft: '0.5rem' }}>
            <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.4rem', border: 'none', background: 'transparent', color: '#0f172a', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.75rem', fontSize: '0.95rem', fontWeight: 800, borderRadius: '12px' }}>
            Search
          </button>
        </form>
      </div>

      {/* 2. Live Company Statistics Bar */}
      <CompanyStats />

      {/* 3. Header Bar: Count & Sorting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            {loading ? 'Searching...' : `${totalElements} ${totalElements === 1 ? 'Company Found' : 'Companies Found'}`}
          </h2>
          {filters.keyword && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Filtered by: "<strong>{filters.keyword}</strong>"
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <ArrowUpDown size={16} color="var(--primary)" />
          <span style={{ fontWeight: 600 }}>Sort By:</span>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 0 })}
            className="form-select"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', width: 'auto', fontWeight: 600, cursor: 'pointer', borderRadius: '8px' }}
          >
            <option value="name,asc">Company Name A-Z</option>
            <option value="name,desc">Company Name Z-A</option>
            <option value="createdAt,desc">Recently Added</option>
          </select>
        </div>
      </div>

      {/* 4. Company Grid / Loading / Error / Empty State */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', background: '#ffe4e6', color: '#be123c', borderRadius: '16px' }}>
          <p style={{ fontWeight: 700, marginBottom: '1rem' }}>{error}</p>
          <button onClick={fetchCompanies} className="btn btn-primary btn-sm">Try Again</button>
        </div>
      ) : companies.length === 0 ? (
        <EmptyState onClearFilters={handleClearFilters} />
      ) : (
        <div>
          <div className="grid-3">
            {companies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        </div>
      )}

    </div>
  );
};

export default Companies;
