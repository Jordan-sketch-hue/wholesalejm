// Protected route helper
import { isAuthenticated } from './authService.js';

export function requireAuth(callback) {
  if (!isAuthenticated()) {
    window.location.href = '/login';
    return;
  }
  callback();
}

export function redirectIfAuth(callback) {
  if (isAuthenticated()) {
    window.location.href = '/dashboard';
    return;
  }
  callback();
}
