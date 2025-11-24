import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV = process.env.NODE_ENV || 'development';

console.log(ENV, '<<< env')

dotenv.config({ path: path.join(__dirname, `.env.${ENV}`) });

console.log(process.env.DATABASE_URL, '<<<')

if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL configured');
} else {
  console.log('Connected to:', process.env.DATABASE_URL);
}

const db = drizzle(process.env.DATABASE_URL!);
export default db;