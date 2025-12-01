import express from 'express';
import type { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import passport from './auth/passport.js';
import { getUser, getUsers } from './controllers/get-controller.js';
import { deleteUserId } from './controllers/delete-controller.js';
import { postUser } from './controllers/post-controller.js';
import {
  getScores,
  postGuestUserAndPostScore,
  getScoresByScoreId,
  getGames,
  postGames,
  deleteGames
} from './controllers/index.js';

import authRoutes from './routes/auth.js';
import type { RequestWithUser } from './types/index.js';
import auth from './middleware/auth.js';

const ENV = process.env.NODE_ENV || 'development';
const envPath = import.meta.dirname + '/.env.' + ENV;
dotenv.config({ path: envPath });

const app = express();

app.use(
  cors({
    credentials: true
  })
);
app.use(express.json());

app.get('/api', express.static('public'));

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, sameSite: 'none' },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: RequestWithUser, res: Response) => {
  res.send(req.user ? `Logged in as ${req.user.email}` : 'Not logged in');
});

app.get('/protected_route', auth, (req: RequestWithUser, res: Response) => {
  res.send('You must be logged in to see this!');
});

app.use('/api/auth', authRoutes);

app.get('/api/users', getUsers);

app.get('/api/users/:user_id', getUser);

app.get('/api/games', getGames);

app.post('/api/games', postGames);

app.delete('/api/games/:game_id', deleteGames);

app.get('/api/games/:game_id/scores/', getScores);

app.get('/api/games/:game_id/scores/:score_id', getScoresByScoreId);

app.post('/api/games/:game_id/scores', postGuestUserAndPostScore);

app.post('/api/users', postUser);

app.delete('/api/users/:user_id', deleteUserId);

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
