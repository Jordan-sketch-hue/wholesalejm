import { verifyToken } from '../auth/jwt.js';
import { logRequest } from './loggerMiddleware.js';

export function setupMiddleware(app) {
  // Request logging
  app.use(logRequest);

  // Trust proxy
  app.set('trust proxy', 1);

  // Add request ID
  app.use((req, res, next) => {
    req.id = Math.random().toString(36).substr(2, 9);
    next();
  });
}

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export { authMiddleware as auth };
