import db from '../src/db/connection';
import { describe, test, expect } from 'vitest';
import * as matchers from 'jest-extended';
import { sql } from 'drizzle-orm';

expect.extend(matchers);

describe('users table', () => {
  test('users table exists', async () => {
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

  test('users table has user_id column as serial', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'user_id';`);

    expect(column.column_name).toBe('user_id');
    expect(column.data_type).toBe('integer');
    expect(column.column_default).toBe("nextval('users_user_id_seq'::regclass)");
  });

  test('users table has user_id column as the primary key', async () => {
    const {
      rows: [{ column_name }]
    } = await db.execute(sql`SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'users';`);

    expect(column_name).toBe('user_id');
  });

  test('users table has username column as varying character', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'username';`);
    expect(column.column_name).toBe('username');
    expect(column.data_type).toBe('character varying');
  });

  test('users table has created_on column as varying character', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'created_on';`);
    expect(column.column_name).toBe('created_on');
    expect(column.data_type).toBe('timestamp without time zone');
  });
});

describe('games table', () => {
  test('games table exists', async () => {
    const {
      rows: [{ exists }]
    } = await db.execute(sql`SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'games' 
            );`);

    expect(exists).toBe(true);
  });

  test('games table has game_id column as serial', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'games'
            AND column_name = 'game_id';`);

    expect(column.column_name).toBe('game_id');
    expect(column.data_type).toBe('integer');
    expect(column.column_default).toBe("nextval('games_game_id_seq'::regclass)");
  });

  test('games table has game_id column as the primary key', async () => {
    const {
      rows: [{ column_name }]
    } = await db.execute(sql`SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'games';`);

    expect(column_name).toBe('game_id');
  });

  test('games table has name column as character varying', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'games'
            AND column_name = 'name';`);

    expect(column.column_name).toBe('name');
    expect(column.data_type).toBe('character varying');
  });
});

describe('scores table', () => {
  test('scores table exists', async () => {
    const {
      rows: [{ exists }]
    } = await db.execute(sql`SELECT EXISTS (
            SELECT FROM 
                information_schema.tables 
            WHERE 
                table_name = 'scores' 
            );`);

    expect(exists).toBe(true);
  });

  test('scores table has score_id column as serial', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'scores'
            AND column_name = 'score_id';`);

    expect(column.column_name).toBe('score_id');
    expect(column.data_type).toBe('integer');
    expect(column.column_default).toBe("nextval('scores_score_id_seq'::regclass)");
  });

  test('scores table has score_id column as the primary key', async () => {
    const {
      rows: [{ column_name }]
    } = await db.execute(sql`SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'scores';`);

    expect(column_name).toBe('score_id');
  });

  test('scores table has score column as integer', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'scores'
            AND column_name = 'score';`);

    expect(column.column_name).toBe('score');
    expect(column.data_type).toBe('integer');
  });

  test('scores table has user_id column as integer', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'scores'
            AND column_name = 'user_id';`);

    expect(column.column_name).toBe('user_id');
    expect(column.data_type).toBe('integer');
  });

  test('scores table references user_id from users', async () => {
    const { rows } = await db.execute(
      sql`
        SELECT *
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'scores'
          AND kcu.column_name = 'user_id'
          AND ccu.table_name = 'users'
          AND ccu.column_name = 'user_id';
      `
    );
    expect(rows).toHaveLength(1);
  });

  test('scores table has username column as character varying', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'scores'
            AND column_name = 'username';`);

    expect(column.column_name).toBe('username');
    expect(column.data_type).toBe('character varying');
  });

  test('scores table references username from users', async () => {
    const { rows } = await db.execute(
      sql`
        SELECT *
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'scores'
          AND kcu.column_name = 'username'
          AND ccu.table_name = 'users'
          AND ccu.column_name = 'username';
      `
    );
    expect(rows).toHaveLength(1);
  });

  test('scores table has game_id column as integer', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'scores'
            AND column_name = 'game_id';`);

    expect(column.column_name).toBe('game_id');
    expect(column.data_type).toBe('integer');
  });

  test('scores table references game_id from games', async () => {
    const { rows } = await db.execute(
      sql`
        SELECT *
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'scores'
          AND kcu.column_name = 'game_id'
          AND ccu.table_name = 'games'
          AND ccu.column_name = 'game_id';
      `
    );
    expect(rows).toHaveLength(1);
  });

  test('scores table has created_on column as timestamp', async () => {
    const {
      rows: [column]
    } = await db.execute(sql`SELECT *
            FROM information_schema.columns
            WHERE table_name = 'scores'
            AND column_name = 'created_on';`);

    expect(column.column_name).toBe('created_on');
    expect(column.data_type).toBe('timestamp without time zone');
  });
});
