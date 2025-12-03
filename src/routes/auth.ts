import { Router } from 'express';
import passport from '../auth/passport.js';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../types/index.js';
const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/failure' }),
  (req: RequestWithUser, res) => {
    const token = jwt.sign({ google_id: req.user.userId }, process.env.SESSION_SECRET, {
      expiresIn: '7d'
    });

    res.redirect(
      process.env.NODE_ENV === 'production'
        ? `https://breen-team-fe.vercel.app/profile?token=${token}`
        : `http://localhost:5173/profile?token=${token}`
    );
  }
);

router.get('/current_user', (req, res) => {
  res.send(req.user || { err: 'Not logged in' });
});

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.get('/failure', (req, res) => {
  res.send('Failed to authenticate.');
});

export default router;
