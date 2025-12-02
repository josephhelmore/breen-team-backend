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
          expect(user.user_id).toBeNumber();
          expect(user.username).toBeString();
          expect(user.created_on).toBeDate();
        });
      });
  });

  test('Should check the users table has the correct data-types', () => {
    return db
      .select()
      .from(users)
      .then(users => {
        users.forEach(user => {
          expect(user.user_id).toBeNumber();
          expect(user.username).toBeString();
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
          expect(score.score_id).toBeNumber();
          expect(score.score).toBeNumber();
          expect(score.user_id).toBeNumber();
          expect(score.username).toBeString();
          expect(score.game_id).toBeNumber();
          expect(score.created_on).toBeDate();
        });
      });
  });
});
describe('Data insertion into the game table', () => {
  test('Should check that the game table has the correct columns', async () => {
    const resGames = await db.select().from(games);

    resGames.forEach(game => {
      expect(game).toHaveProperty('game_id');
      expect(game).toHaveProperty('name');
    });
  });
  test('Should check the game table to have the correct data-types', async () => {
    const resGames = await db.select().from(games);

    resGames.forEach(game => {
      expect(game.game_id).toBeNumber();
      expect(game.name).toBeString();
    });
  });
});
