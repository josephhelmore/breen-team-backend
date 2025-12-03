import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../db/connection.js';
import { users } from '../db/data/schema.js';
import { eq } from 'drizzle-orm';
import type { User } from '../types/index.js';

const ENV = process.env.NODE_ENV || 'development';
const envPath = import.meta.dirname + '/.env.' + ENV;
dotenv.config({ path: envPath });

passport.serializeUser((user: User, done) => {
  done(null, user.google_id);
});

passport.deserializeUser(async (id, done) => {
  const [user] = await db.select().from(users).where(eq(users.google_id, id));
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        ENV === 'production'
          ? 'https://breen-team-backend.vercel.app/api/auth/google/callback'
          : '/api/auth/google/callback'
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const picture = profile.photos?.[0]?.value;

        // const [existingUser] = await db.select().from(users).where(eq(users.google_id, googleId));
        const [existingUser] = await db
          .select({
            user_id: users.user_id,
            username: users.username,
            email: users.email,
            created_on: users.created_on,
            google_id: users.google_id,
            avatar_url: users.avatar_url
          })
          .from(users)
          .where(eq(users.google_id, googleId));

        if (existingUser) return done(null, existingUser);

        const [newUser] = await db
          .insert(users)
          .values({
            google_id: googleId,
            email: email || '',
            username: name,
            avatar_url: picture
          })
          .returning();

        return done(null, newUser);
      } catch (error) {
        console.error(error.message);
        done(error, null);
      }
    }
  )
);

export default passport;
