const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Route imports
const auditRoutes = require('./routes/auditRoutes');
const reportRoutes = require('./routes/reportRoutes');
const leadRoutes = require('./routes/leadRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();

// Enable gzip compression
app.use(compression());

// Security Middleware
app.use(helmet());

// Enable CORS before routes (TEMPORARILY ALLOW ALL FOR DEBUGGING MVP)
app.use(cors()); 

/*
PRODUCTION NOTE: Restrict origins later using explicit config:
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
*/

// Body parsing Middleware
app.use(express.json({ limit: '10kb' })); // Production safeguard: limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

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
