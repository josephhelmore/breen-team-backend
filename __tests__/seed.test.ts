import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import { users, scores, games } from '../src/db/data/schema.js';
import matchers from 'jest-extended';
import db from '../src/db/connection.js';
import seedTable from '../src/db/seed/seed-test.js';
import dropTable from '../src/db/seed/drop.js';

expect.extend(matchers);

beforeAll(() => seedTable());
afterAll(() => dropTable());

describe('Data Insertion for user table', () => {
  test('should check if users table has the correct columns and data types', () => {
    return db
      .select()
      .from(users)
      .then(users => {
        expect(users).toHaveLength(10);
        users.forEach(user => {
          expect(user).toHaveProperty('user_id');
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('created_on');
          expect(typeof user.user_id).toBe('number');
          expect(typeof user.username).toBe('string');
          expect(typeof user.created_on).toBe('object');
        });
      });
  });
  test('Should check the users table has the correct data-types', () => {
    return db
      .select()
      .from(users)
      .then(users => {
        users.forEach(user => {
          expect(typeof user.user_id).toBe('number');
          expect(typeof user.username).toBe('string');
          expect(typeof user.created_on).toBe('object');
        });
      });
  });
});
describe('Data insertion for scores table', () => {
  test('Should check that the scores table has the correct columns', () => {
    return db
      .select()
      .from(scores)
      .then(scores => {
        expect(scores).toHaveLength(10);
        scores.forEach(score => {
          expect(score).toHaveProperty('score_id');
          expect(score).toHaveProperty('score');
          expect(score).toHaveProperty('user_id');
          expect(score).toHaveProperty('username');
          expect(score).toHaveProperty('game_id');
          expect(score).toHaveProperty('created_on');
        });
      });
  });
  test('Should check the scores table has the correct data-types', () => {
    return db
      .select()
      .from(scores)
      .then(scores => {
        scores.forEach(score => {
          expect(typeof score.score_id).toBe('number');
          expect(typeof score.score).toBe('number');
          expect(typeof score.user_id).toBe('number');
          expect(typeof score.username).toBe('string');
          expect(typeof score.game_id).toBe('number');
          expect(typeof score.created_on).toBe('object');
        });
      });
  });
});
describe('Data insertion into the game table', () => {
  test('Should check that the game table has the correct columns', () => {
    return db
      .select()
      .from(games)
      .then(games => {
        expect(games).toHaveLength(10);
        games.forEach(game => {
          expect(game).toHaveProperty('game_id');
          expect(game).toHaveProperty('name');
        });
      });
  });
  test('Should check the game table to have the correct data-types', () => {
    return db
      .select()
      .from(games)
      .then(games => {
        games.forEach(game => {
          expect(typeof game.game_id).toBe('number');
          expect(typeof game.name).toBe('string');
        });
      });
  });
});
