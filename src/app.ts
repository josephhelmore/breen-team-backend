import express from 'express';
import type { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import passport from './auth/passport.js';

import authRoutes from './routes/auth.js';
import type { RequestWithUser } from './types/index.js';
import { apiRoutes } from './routes/apiRoutes.js';

const ENV = process.env.NODE_ENV || 'development';
const envPath = import.meta.dirname + '/.env.' + ENV;
dotenv.config({ path: envPath });

const app = express();

app.use(
  cors({
    origin: ENV === 'production' ? 'https://breen-team-fe.vercel.app' : 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: RequestWithUser, res: Response) => {
  console.log(req.user);
  res.send(req.user ? `Logged in as ${req.user.email}` : 'Not logged in');
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
