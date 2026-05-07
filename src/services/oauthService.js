// OAuth Callback Handler
import { fetchWithAuth } from './authService.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function handleOAuthCallback(code, provider) {
  try {
    const response = await fetch(`${API_URL}/api/auth/oauth-callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, provider })
    });

    if (!response.ok) {
      throw new Error('OAuth callback failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    throw new Error(error.message || 'OAuth login failed');
  }
}

export async function refreshToken() {
  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    
    return data;
  } catch (error) {
    throw new Error(error.message || 'Token refresh failed');
  }
}

export async function verifyEmail(token) {
  try {
    const response = await fetchWithAuth(`/api/auth/verify-email?token=${token}`);

    if (!response.ok) {
      throw new Error('Email verification failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Email verification failed');
  }
}

export async function resetPassword(email) {
  try {
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('Password reset request failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Password reset failed');
  }
}

export async function confirmPasswordReset(token, newPassword) {
  try {
    const response = await fetch(`${API_URL}/api/auth/confirm-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, newPassword })
    });

    if (!response.ok) {
      throw new Error('Password reset confirmation failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Password reset confirmation failed');
  }
}
