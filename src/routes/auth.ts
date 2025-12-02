import { Router } from 'express';
import passport from '../auth/passport.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://breen-team-fe.vercel.app'
        : 'http://localhost:5173'
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
