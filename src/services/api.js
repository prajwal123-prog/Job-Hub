import axios from 'axios';

// Ensure base URL always ends with /api regardless of Vercel env variable formatting
const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  url = url.trim().replace(/\/+$/, ''); // Remove trailing slashes
  if (!url.endsWith('/api')) {
    url += '/api';
  }
  return url;
};

const API_BASE_URL = getApiBaseUrl();

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 35000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Persistent LocalStorage + In-Memory Fast Caching Engine (24 Hours Fallback)
const inMemoryCache = new Map();
const CACHE_KEY_PREFIX = 'jh_cache_';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

const getCachedData = (key) => {
  // 1. Check fast in-memory map
  const inMemory = inMemoryCache.get(key);
  if (inMemory) return inMemory.data;

  // 2. Check persistent localStorage
  try {
    const stored = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        inMemoryCache.set(key, parsed);
        return parsed.data;
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
};

const setCachedData = (key, data) => {
  const item = { data, timestamp: Date.now() };
  inMemoryCache.set(key, item);
  try {
    localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(item));
  } catch (e) {
    // ignore quota errors
  }
};

export const clearApiCache = () => {
  inMemoryCache.clear();
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(CACHE_KEY_PREFIX)) {
        localStorage.removeItem(k);
      }
    });
  } catch (e) {
    // ignore
  }
};

// Request Interceptor: Attach JWT Bearer Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jobhub_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global error handling, auto-retry on cold-start timeouts & cache invalidation
API.interceptors.response.use(
  (response) => {
    // Invalidate cache on mutations (POST, PUT, DELETE)
    if (['post', 'put', 'delete'].includes(response.config.method?.toLowerCase())) {
      clearApiCache();
    }
    return response;
  },
  async (error) => {
    const config = error.config;
    // Automatic 1-retry for network errors or timeouts during server cold start
    if (config && !config._retry && (error.code === 'ECONNABORTED' || !error.response)) {
      config._retry = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return API(config);
    }

    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('jobhub_token');
      localStorage.removeItem('jobhub_user');
      clearApiCache();
    }
    return Promise.reject(error);
  }
);

// Helper for Live GET Requests with Local Cache Fallback & Safe Error Protection
const cachedGet = async (url, config = {}) => {
  const cacheKey = url + JSON.stringify(config.params || {});

  try {
    const response = await API.get(url, config);
    setCachedData(cacheKey, response);
    return response;
  } catch (err) {
    // If network / server error, return stale cache if available
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    return { data: { success: false, data: null, message: err.message } };
  }
};

// API Endpoints Services
export const authService = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
};

export const userService = {
  getUserById: (id) => cachedGet(`/users/${id}`),
  updateUser: (id, data) => API.put(`/users/${id}`, data),
};

export const jobService = {
  getAllJobs: () => cachedGet('/jobs'),
  getLatestJobs: () => cachedGet('/jobs/latest'),
  getCategories: () => cachedGet('/jobs/categories'),
  getJobById: (id) => cachedGet(`/jobs/${id}`),
  searchJobs: (params) => cachedGet('/jobs/search', { params }),
  createJob: (data) => API.post('/jobs', data),
  updateJob: (id, data) => API.put(`/jobs/${id}`, data),
  deleteJob: (id) => API.delete(`/jobs/${id}`),
  getRecruiterJobs: (recruiterId) => cachedGet(`/jobs/recruiter/${recruiterId}`),
};

export const companyService = {
  getAllCompanies: (params) => cachedGet('/companies', { params }),
  searchCompanies: (params) => cachedGet('/companies/search', { params }),
  getCompanyById: (id) => cachedGet(`/companies/${id}`),
  getCompanyJobs: (id, params) => cachedGet(`/companies/${id}/jobs`, { params }),
  getCompanyStats: () => cachedGet('/companies/stats'),
  createOrUpdateCompany: (data) => API.post('/companies', data),
  deleteCompany: (id) => API.delete(`/companies/${id}`),
};

export const homeService = {
  getHomeStats: () => cachedGet('/home/stats'),
};

export const applicationService = {
  applyForJob: (data) => API.post('/applications', data),
  getMyApplications: () => cachedGet('/applications/my'),
  getApplicationById: (id) => cachedGet(`/applications/${id}`),
  getJobApplications: (jobId) => cachedGet(`/applications/job/${jobId}`),
  updateStatus: (id, status) => API.put(`/applications/${id}/status`, { status }),
  withdrawApplication: (id) => API.delete(`/applications/${id}`),
};

export const savedJobService = {
  saveJob: (jobId) => API.post(`/saved-jobs/${jobId}`),
  getSavedJobs: () => cachedGet('/saved-jobs'),
  removeSavedJob: (jobId) => API.delete(`/saved-jobs/${jobId}`),
};

export const dashboardService = {
  getCandidateDashboard: () => cachedGet('/dashboard/candidate'),
  getRecruiterDashboard: () => cachedGet('/dashboard/recruiter'),
};

export const aiService = {
  getRecommendations: () => cachedGet('/ai/recommendations'),
};

export default API;
