import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import db from '../db/connection';
import { users } from '../db/data/schema/users';
import * as matchers from 'jest-extended';
import seedTable from '../db/seed/seed';
import { sql } from 'drizzle-orm';
import dropTable from '../db/seed/drop';

expect.extend(matchers);

beforeAll(() => seedTable());
afterAll(() => dropTable());

describe('Seed users table', () => {
  test('should check if users table has the correct fields and values', () => {
    return db
      .select()
      .from(users)
      .then(users => {
        users.forEach(user => {
          expect(user).toHaveProperty('user_id');
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('created_on');
        });
      });
  });
  test('Should check that the table containts 10 users', () => {
    return db
      .select()
      .from(users)
      .then(users => {
        expect(users.length).toBe(10);
      });
  });
});
