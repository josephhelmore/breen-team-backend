import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const pathToCorrectEnvFile = `./src/db/.env.production`;
import dotenv from 'dotenv';

dotenv.config({
  path: pathToCorrectEnvFile
});

export default defineConfig({
  out: './drizzle',
  schema: './src/db/data/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true
});
