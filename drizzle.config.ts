import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const ENV = process.env.NODE_ENV || 'development';
const pathToCorrectEnvFile = `./db/.env.${ENV}`;
import dotenv from 'dotenv';

dotenv.config({
  path: pathToCorrectEnvFile
});

export default defineConfig({
  out: './drizzle',
  schema: './db/data/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
