import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jobService, savedJobService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import JobFilters from '../components/JobFilters';
import JobCard from '../components/JobCard';
import SortDropdown from '../components/SortDropdown';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { Search, MapPin, Filter, X } from 'lucide-react';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Filters state initialized from URL query params
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    jobType: searchParams.get('jobType') || '',
    experienceLevel: searchParams.get('experienceLevel') || '',
    minimumSalary: searchParams.get('minimumSalary') || '',
    skills: searchParams.get('skills') || '',
    sort: 'createdAt,desc',
    page: 0,
    size: 6,
  });

  const { isAuthenticated, isCandidate } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [sortBy, sortDir] = filters.sort.split(',');
      const params = {
        keyword: filters.keyword || undefined,
        location: filters.location || undefined,
        jobType: filters.jobType || undefined,
        experienceLevel: filters.experienceLevel || undefined,
        minimumSalary: filters.minimumSalary ? parseFloat(filters.minimumSalary) : undefined,
        skills: filters.skills || undefined,
        page: filters.page,
        size: filters.size,
        sortBy,
        sortDir
      };

      const res = await jobService.searchJobs(params);
      const data = res.data.data;
      setJobs(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
      setCurrentPage(data.page || 0);

      // Fetch saved jobs to mark bookmarked items
      if (isAuthenticated && isCandidate) {
        try {
          const savedRes = await savedJobService.getSavedJobs();
          const ids = new Set((savedRes.data.data || []).map(s => s.job.id));
          setSavedJobIds(ids);
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      console.error('Error searching jobs', err);
      setError('Unable to load jobs right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilterValues) => {
    setFilters(prev => ({ ...prev, ...newFilterValues }));
  };

  const handleClearFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      jobType: '',
      experienceLevel: '',
      minimumSalary: '',
      skills: '',
      sort: 'createdAt,desc',
      page: 0,
      size: 6,
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
        padding: '3rem 1.5rem 3.5rem',
        borderRadius: '20px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.75rem', color: '#ffffff' }}>
          Find your next opportunity
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
          Search thousands of opportunities and discover jobs that match your skills and career goals.
        </p>

        {/* Real Backend Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-bar-form" style={{
          maxWidth: '850px',
          margin: '0 auto',
          background: '#ffffff',
          padding: '0.75rem',
          borderRadius: '16px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 220px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Job title, skill or keyword..."
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.4rem', border: 'none', background: 'transparent', color: '#0f172a', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>

          <div className="search-bar-location" style={{ flex: '1 1 180px', position: 'relative', display: 'flex', alignItems: 'center', borderLeft: '1px solid #e2e8f0', paddingLeft: '0.5rem' }}>
            <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.4rem', border: 'none', background: 'transparent', color: '#0f172a', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.75rem', fontSize: '0.95rem', fontWeight: 800, borderRadius: '12px', flexShrink: 0 }}>
            Search Jobs
          </button>
        </form>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="mobile-filter-btn-container" style={{ marginBottom: '1.5rem', display: 'none' }}>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', fontWeight: 700, padding: '0.75rem' }}
        >
          <Filter size={18} color="var(--primary)" />
          {showMobileFilters ? 'Hide Filters' : 'Filter Jobs'}
        </button>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="jobs-layout-grid">
        
        {/* Left Filter Sidebar */}
        <div className={`filters-sidebar ${showMobileFilters ? 'mobile-visible' : ''}`}>
          <JobFilters
            filters={filters}
            onFilterChange={(newVals) => {
              handleFilterChange(newVals);
              setShowMobileFilters(false);
            }}
            onClearFilters={() => {
              handleClearFilters();
              setShowMobileFilters(false);
            }}
          />
        </div>

        {/* Right Job Results Workspace */}
        <div>
          {/* Header Bar: Job Count & Sorting Dropdown */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                {loading ? 'Searching...' : `${totalElements} ${totalElements === 1 ? 'Job Found' : 'Jobs Found'}`}
              </h2>
              {filters.keyword && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Matching keyword: "<strong>{filters.keyword}</strong>"
                </span>
              )}
            </div>

            <SortDropdown
              value={filters.sort}
              onChange={(val) => setFilters({ ...filters, sort: val, page: 0 })}
            />
          </div>

          {/* Results Grid / Skeleton / Error / Empty State */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="card" style={{ padding: '2rem', textAlign: 'center', background: '#ffe4e6', color: '#be123c', borderRadius: '16px' }}>
              <p style={{ fontWeight: 700, marginBottom: '1rem' }}>{error}</p>
              <button onClick={fetchJobs} className="btn btn-primary btn-sm">Try Again</button>
            </div>
          ) : jobs.length === 0 ? (
            <EmptyState onClearFilters={handleClearFilters} />
          ) : (
            <div>
              <div className="grid-2">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} isSavedInitial={savedJobIds.has(job.id)} />
                ))}
              </div>

              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setFilters({ ...filters, page })}
              />
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Jobs;
