import { drizzle } from 'drizzle-orm/node-postgres';
const ENV = process.env.NODE_ENV || 'development';
const pathToCorrectEnvFile = `${__dirname}/.env.${ENV}`;

require('dotenv').config({
  path: pathToCorrectEnvFile
});

if (!process.env.PGDATABASE) {
  throw new Error('No PGDATABASE configured');
} else {
  console.log('Connected to:', process.env.PGDATABASE);
}

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    max: 2,
    ssl: true
  }
});

export default db;
