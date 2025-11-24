import db from '../db/connection';
import { describe, test, expect } from 'vitest';
import * as matchers from 'jest-extended';
import { sql } from 'drizzle-orm';

expect.extend(matchers);

describe('create table', () => {
  test('user table exists', async () => {
    const {
      rows: [{ exists }]
    } = await db.execute(sql`SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'users' 
            );`);

    expect(exists).toBe(true);
  });

  test('table table has user_id column as integer', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'user_id';`);

    expect(column.column_name).toBe('user_id');
    expect(column.data_type).toBe('integer');
  });

  test('topics table has slug column as the primary key', () => {
    return db
      .execute(
        sql`SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'users';`
      )
      .then(({ rows: [{ column_name }] }) => {
        expect(column_name).toBe('user_id');
      });
  });
});
