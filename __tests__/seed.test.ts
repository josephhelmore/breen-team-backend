import db from '../db/connection';
import data from '../db/data/test';
import seed from '../db/seeds/seed';

beforeAll(() => seed(data));

describe('seed', () => {
  test('users table', () => {
    return db.select().from();
  });
});
