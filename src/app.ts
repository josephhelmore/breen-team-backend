import express from 'express';
import type { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from './auth/passport.js';

import authRoutes from './routes/auth.js';
import type { RequestWithUser } from './types/index.js';
import { apiRoutes } from './routes/apiRoutes.js';
import auth from './middleware/auth.js';

const ENV = process.env.NODE_ENV || 'development';
const envPath = import.meta.dirname + '/.env.' + ENV;
dotenv.config({ path: envPath });

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.get('/jwt', auth, (req: RequestWithUser, res: Response) => {
  res.send(req.user ? req.user : 'Not logged in');
});

app.use('/api/auth', authRoutes);

app.use('/api', apiRoutes);

app.use((req, res, next) => {
  const error = {
    status: 404,
    message: 'Path not found'
  };
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
    return res.status(error.status).json({
      error: error.name || 'CustomError',
      message: error.message,
      cause: error.cause
    });
  }

  return res.status(500).json({
    error: 'unknown error',
    message: error.message || 'An error occurred'
  });
});

export default app;
