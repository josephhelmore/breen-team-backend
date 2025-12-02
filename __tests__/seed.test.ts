import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import { users, scores, games } from '../src/db/data/schema.js';
import matchers from 'jest-extended';
import db from '../src/db/connection.js';
import dropTable from '../src/db/seed/drop.js';
import { seed } from '../src/db/seed/seed.js';
import { data } from '../src/db/data/test/index.js';

expect.extend(matchers);

beforeAll(() => seed(data));
afterAll(() => dropTable());

describe('Data Insertion for user table', () => {
  test('should check if users table has the correct columns and data types', () => {
    return db
      .select()
      .from(users)
      .then(users => {
        expect(users).toHaveLength(data.usersData.length);
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
          expect(user.created_on).toBeDate();
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
        expect(scores).toHaveLength(data.scoresData.length);
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
          expect(score.created_on).toBeDate();
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
        expect(games).toHaveLength(data.gamesData.length);
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
