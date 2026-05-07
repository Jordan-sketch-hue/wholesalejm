// Authentication Service
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}

export async function registerUser(data) {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
}

export async function loginWithOAuth(provider) {
  const clientIds = {
    google: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    facebook: import.meta.env.VITE_FACEBOOK_APP_ID || 'YOUR_FB_APP_ID',
    apple: import.meta.env.VITE_APPLE_CLIENT_ID || 'YOUR_APPLE_CLIENT_ID'
  };

  const redirectUri = `${window.location.origin}/auth/callback`;

  switch (provider) {
    case 'google':
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientIds.google}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
      break;
    case 'facebook':
      window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientIds.facebook}&redirect_uri=${redirectUri}&scope=public_profile,email`;
      break;
    case 'apple':
      window.location.href = `https://appleid.apple.com/auth/authorize?client_id=${clientIds.apple}&redirect_uri=${redirectUri}&response_type=code`;
      break;
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    logout();
    throw new Error('Session expired');
  }

  return response;
}
