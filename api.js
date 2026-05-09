import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import { connectDB } from './server/database/connection.js';
import { setupMiddleware } from './server/middleware/index.js';
import authRoutes from './server/api/routes/auth.js';
import productRoutes from './server/api/routes/products.js';
import orderRoutes from './server/api/routes/orders.js';
import userRoutes from './server/api/routes/users.js';
import paymentRoutes from './server/api/routes/payments.js';
import whatsappRoutes from './server/api/routes/whatsapp.js';
import trackingRoutes from './server/api/routes/tracking.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIO(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || process.env.VITE_API_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

// CORS
const corsOrigin = process.env.FRONTEND_URL || process.env.VITE_API_URL || 'http://localhost:5173';
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Custom middleware
setupMiddleware(app);

// Database connection (only if MongoDB configured)
if (process.env.MONGODB_URI) {
  connectDB();
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/tracking', trackingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    database: process.env.MONGODB_URI ? 'configured' : 'not configured'
  });
});

// Serve static files from dist (frontend build)
app.use(express.static('dist'));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html').catch(() => {
    res.json({ message: 'Wholesale Jamaica API v1.0' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    environment: NODE_ENV
  });
});

// Socket.io connection for real-time features
io.on('connection', (socket) => {
  console.log('📱 New socket connection:', socket.id);

  socket.on('disconnect', () => {
    console.log('📱 Socket disconnected:', socket.id);
  });

  socket.on('track-order', (orderId) => {
    socket.join(`order-${orderId}`);
  });

  socket.on('notify', (data) => {
    io.emit('notification', data);
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 WHOLESALE JAMAICA PLATFORM READY   ║
╠════════════════════════════════════════╣
║  Server: ${NODE_ENV === 'production' ? 'https://wholesalejm.vercel.app' : 'localhost:' + PORT}
║  Environment: ${NODE_ENV}               
║  API: /api/health                      ║
╚════════════════════════════════════════╝
  `);
});

export { app, io };
