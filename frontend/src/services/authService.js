import API from './api';

export const login = async (username, password) => {
    const response = await API.post('/token/', { username, password });
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
};