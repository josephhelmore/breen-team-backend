import dotenv from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { users } from '../db/data/schema.js';
import type { User } from '../types/index.js';

const ENV = process.env.NODE_ENV || 'development';
const envPath = import.meta.dirname + '/.env.' + ENV;
dotenv.config({ path: envPath });

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/callback/google'
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await db.select().from(users).where(eq(users.google_id, profile.id));
        if (user) {
          console.log('User already exists');
          return done(null, user);
        }
        await db.insert(users).values({ username: profile.username, google_id: profile.id });
        console.log('User created');
        done(null, user);
      } catch (error) {
        console.error(error.message);
        done(error.message);
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user.google_id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.select().from(users).where(eq(users.user_id, id));
  done(null, user);
});

export default passport;
