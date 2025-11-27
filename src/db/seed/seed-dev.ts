import { seed } from './seed.js';
import data from '../data/development/index.js';
import db from '../connection.js';

await seed(data);

await db.$client.end();
