import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const ENV = process.env.NODE_ENV;
import dotenv from 'dotenv';

dotenv.config({
  path: './src/db/.env.' + ENV
});

export default defineConfig({
  out: './drizzle',
  schema: './src/db/data/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true
});
