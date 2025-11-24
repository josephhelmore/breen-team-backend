import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

const ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// dotenv config using module way instead of require
dotenv.config({ path: path.join(__dirname, '.env') })

console.log(path.join(__dirname, '.env'))
console.log(path.join(__dirname, '.env'))

if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL configured');
} else {
  console.log('Connected to:', process.env.DATABASE_URL);
}

const db = drizzle(process.env.DATABASE_URL!);

export default db;
