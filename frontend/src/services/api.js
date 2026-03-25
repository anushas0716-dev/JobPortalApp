import axios from 'axios';

<<<<<<< HEAD
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001/api';

const api = {
  // Auth endpoints
  login: (credentials) => axios.post(`${API_BASE_URL}/users/login/`, credentials),
  logout: () => axios.post(`${API_BASE_URL}/users/logout/`),
  register: (userData) => axios.post(`${API_BASE_URL}/users/register/`, userData),
  
  // Company endpoints
  registerCompany: (companyData) => axios.post(`${API_BASE_URL}/companies/register/`, companyData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }),
  getCompany: (id) => axios.get(`${API_BASE_URL}/companies/${id}/`),
  updateCompany: (id, data) => axios.put(`${API_BASE_URL}/companies/${id}/`, data),
  
  // Job endpoints
  getJobs: () => axios.get(`${API_BASE_URL}/jobs/`),
  createJob: (jobData) => axios.post(`${API_BASE_URL}/jobs/`, jobData),
  
  // Application endpoints
  getApplications: () => axios.get(`${API_BASE_URL}/applications/`),
  createApplication: (appData) => axios.post(`${API_BASE_URL}/applications/`, appData),
};

export default api;
=======
const API_BASE_URL = 'http://127.0.0.1:8000';

// ✅ Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Auto-attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Auto-refresh token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) {
          localStorage.clear();
          window.location.href = '/';
          return Promise.reject(error);
        }
        const res = await axios.post(`${API_BASE_URL}/api/token/refresh/`, { refresh });
        const newAccess = res.data.access;
        localStorage.setItem('token', newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(original);
      } catch {
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// ✅ Helper for fetch-based requests (FormData uploads)
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/';
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

// ✅ Upload file with FormData
export const uploadFile = async (url, formData) => {
  const token = localStorage.getItem('token');
  if (!token) { window.location.href = '/'; return null; }
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return response;
};

// ✅ All API endpoints
const api = {
  // ── Auth ──
  login:    (data) => axiosInstance.post('/api/token/', data),
  refresh:  (data) => axiosInstance.post('/api/token/refresh/', data),
  register: (data) => axiosInstance.post('/api/users/register/', data),
  verifyOTP:(data) => axiosInstance.post('/api/users/verify-otp/', data),
  resendOTP:(data) => axiosInstance.post('/api/users/resend-otp/', data),
  forgotPassword: (data) => axiosInstance.post('/api/users/forgot-password/', data),
  resetPassword:  (data) => axiosInstance.post('/api/users/reset-password/', data),

  // ── User Profile ──
  getProfile:    ()     => axiosInstance.get('/api/users/profile/'),
  updateProfile: (data) => axiosInstance.patch('/api/users/profile/', data),

  // ── Jobs ──
  getJobs:     (params) => axiosInstance.get('/api/jobs/', { params }),
  getJob:      (id)     => axiosInstance.get(`/api/jobs/${id}/`),
  createJob:   (data)   => axiosInstance.post('/api/jobs/', data),
  updateJob:   (id, data) => axiosInstance.patch(`/api/jobs/${id}/`, data),
  deleteJob:   (id)     => axiosInstance.delete(`/api/jobs/${id}/`),

  // ── Candidates ──
  getCandidateProfile:    ()     => axiosInstance.get('/api/candidates/me/'),
  updateCandidateProfile: (data) => axiosInstance.patch('/api/candidates/', data),

  // ── Resumes ──
  getResumes:   ()     => axiosInstance.get('/api/resumes/'),
  deleteResume: (id)   => axiosInstance.delete(`/api/resumes/${id}/`),
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name.replace(/\.[^/.]+$/, ''));
    return uploadFile('/api/resumes/', formData);
  },

  // ── Applications ──
  getApplications:  ()     => axiosInstance.get('/api/applications/'),
  createApplication:(data) => axiosInstance.post('/api/applications/', data),

  // ── Notifications ──
  getNotifications: ()  => axiosInstance.get('/api/notifications/'),
  getUnreadCount:   ()  => axiosInstance.get('/api/notifications/unread-count/'),
  markAllRead:      ()  => axiosInstance.patch('/api/notifications/mark-all-read/'),

  // ── Saved Jobs ──
  getSavedJobs:  ()     => axiosInstance.get('/api/saved-jobs/'),
  saveJob:       (data) => axiosInstance.post('/api/saved-jobs/', data),
  unsaveJob:     (id)   => axiosInstance.delete(`/api/saved-jobs/${id}/`),

  // ── Messaging ──
  getMessages:  ()     => axiosInstance.get('/api/messaging/'),
  sendMessage:  (data) => axiosInstance.post('/api/messaging/', data),

  // ── Companies ──
  getCompany:    (id)   => axiosInstance.get(`/api/companies/${id}/`),
  updateCompany: (id, data) => axiosInstance.patch(`/api/companies/${id}/`, data),
};

export default api;
>>>>>>> upstream/jobportelteam
