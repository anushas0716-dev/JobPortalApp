import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getProfile: () => API.get('/auth/profile')
};

// Interviews
export const interviewAPI = {
  schedule: (data) => API.post('/interviews/schedule', data),
  getAll: (params) => API.get('/interviews', { params }),
  getById: (id) => API.get(`/interviews/${id}`),
  reschedule: (id, data) => API.put(`/interviews/${id}/reschedule`, data),
  cancel: (id, data) => API.put(`/interviews/${id}/cancel`, data),
  recordFeedback: (id, data) => API.post(`/interviews/${id}/feedback`, data),
  getStats: () => API.get('/interviews/stats'),
  sendReminder: (id) => API.post(`/interviews/${id}/send-reminder`)
};

export default API;
