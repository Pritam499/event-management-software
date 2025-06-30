// services/auth.js
import api from './api';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  // return the user that the server sent back
  return data.user;
}

export async function register(name, email, password, role = 'employee') {
  await api.post('/auth/register', { name, email, password, role });
}

export function logout() {
  localStorage.removeItem('token');
}

// Used on page‐refresh to repopulate from the JWT:
export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');
  // Fetch full user object (including role) from /auth/me
  const { data } = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;     // { id, name, email, role, … }
}
