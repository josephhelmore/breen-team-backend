import express from 'express';
import type { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import googleConfig from './services/passport.js';
import cookieSession from 'cookie-session';
import { getUser, getUsers } from './controllers/get-controller.js';
import { deleteUserId } from './controllers/delete-controller.js';
import { postUser } from './controllers/post-controller.js';
import { getScores, postGuestUserAndPostScore } from './controllers/index.js';
import auth from './middleware/auth.js';

const ENV = process.env.NODE_ENV || 'development';
const envPath = import.meta.dirname + '/.env.' + ENV;
dotenv.config({ path: envPath });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', createProxyMiddleware({ target: 'http://localhost:4000/' }));

app.get('/api', express.static('public'));

app.get('/api/google', googleConfig.authenticate('google', { scope: ['profile'] }));

app.get(
  '/api/auth/callback/google',
  googleConfig.authenticate('google'),
  (req: Request, res: Response) => {}
);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/testauth', auth, (req: Request, res: Response) => {
  res.send('You made it!');
});

app.get('/api/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout(error => {
    if (error) return next(error);
    res.redirect('/');
  });
});

app.get('/api/current_user', (req: Request, res: Response) => {
  res.send(req.user);
});

app.get('/api/users', getUsers);

app.get('/api/users/:user_id', getUser);

app.get('/api/games/:game_id/scores', getScores);

app.post('/api/games/:game_id/scores', postGuestUserAndPostScore);

app.post('/api/users', postUser);

app.delete('/api/users/:user_id', deleteUserId);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error, 'error<<<< ');
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
