import React, { useState, useEffect } from 'react';
import { savedJobService } from '../services/api';
import JobCard from '../components/JobCard';
import Loading from '../components/Loading';
import { Bookmark, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const res = await savedJobService.getSavedJobs();
      setSavedJobs(res.data.data || []);
    } catch (err) {
      console.error('Error fetching saved jobs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToggle = (jobId, isSaved) => {
    if (!isSaved) {
      setSavedJobs(savedJobs.filter(s => s.job.id !== jobId));
    }
  };

  if (loading) return <Loading text="Fetching your bookmarked jobs..." />;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Saved Jobs</h1>
        <p style={{ color: 'var(--text-muted)' }}>Your bookmarked job opportunities</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Bookmark size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>No saved jobs found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Click the bookmark icon on any job card to save it for later.
          </p>
          <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
        </div>
      ) : (
        <div className="grid-3">
          {savedJobs.map(item => (
            <JobCard
              key={item.id}
              job={item.job}
              isSavedInitial={true}
              onSaveToggle={handleSaveToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
