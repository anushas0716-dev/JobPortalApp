import axios from 'axios';

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
