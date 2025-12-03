import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || 'development';
const envPath = import.meta.dirname + '/.env.' + ENV;

dotenv.config({ path: envPath });

if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL configured');
} else {
  console.log('Connected to:', process.env.DATABASE_URL);
}

const db = drizzle(process.env.DATABASE_URL!);
export default db;
