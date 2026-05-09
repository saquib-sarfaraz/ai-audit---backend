const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Route imports
const auditRoutes = require('./routes/auditRoutes');
const reportRoutes = require('./routes/reportRoutes');
const leadRoutes = require('./routes/leadRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all API requests
app.use('/api/', apiLimiter);

// API Routes
app.use('/api/audit', auditRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/lead', leadRoutes);
app.use('/api/summary', summaryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
