import { seed } from './seed.js';
import data from '../data/development';
import db from '../connection';

await seed(data);

await db.$client.end();
