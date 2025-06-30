import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import './scheduler.js';

dotenv.config();
const app = express();

// === CORS CONFIG ===
// Whitelist both your local dev origin and your Netlify frontend URL
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL    // e.g. https://your-site.netlify.app
];

app.use(cors({
  origin: (incomingOrigin, callback) => {
    // allow requests with no origin (e.g. mobile apps, curl)
    if (!incomingOrigin) return callback(null, true);

    if (allowedOrigins.includes(incomingOrigin)) {
      return callback(null, true);
    }

    console.error(`CORS blocked: ${incomingOrigin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
}));

// Optionally respond to all preflight requests
app.options('*', cors());

// === END CORS ===
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/feedback', feedbackRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ error: err.message });
});

export default app;
