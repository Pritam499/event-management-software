import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRoutes from './routes/userRoutes.js';
import './scheduler.js';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: [
    process.env.FRONTEND_URL  // add your production URL here
  ],
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/feedback', feedbackRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

export default app;
