import app from '../src/app';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import request from 'supertest';
import { seed } from '../src/db/seed/seed';
import dropTable from '../src/db/seed/drop';
import { data } from '../src/db/data/test/index';

expect.extend(matchers);

beforeAll(() => seed(data));
afterAll(() => dropTable());

describe('POST', () => {
  describe('POST scores', () => {
    test('POST a score', async () => {
      const testScore = {
        score: 100,
        user_id: 1,
        username: 'testUser1'
      };

      const {
        body: { score }
      } = await request(app).post('/api/games/1/scores').send(testScore).expect(201);

      expect(score.score).toBe(100);
      expect(score.user_id).toBe(1);
      expect(score.username).toBe('testUser1');
      expect(score.game_id).toBe(1);
    });
  });
  describe('POST /users', () => {
    test.only('POST user to the database', async () => {
      const newUser = {
        username: 'Gilson'
      };

      const {
        body: { user }
      } = await request(app).post('/api/users').send(newUser).expect(201);

      expect(user).toHaveProperty('user_id');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('created_on');
      expect(typeof user).toBe('object');
      expect(typeof user.user_id).toBe('number');
      expect(typeof user.username).toBe('string');
      expect(typeof user.created_on).toBe('string');
    });
  });
});

describe('DELETE', () => {
  describe('DELETE /users', () => {
    test.only('DELETE user by Id', async () => {
      return request(app).delete('/api/users/9').expect(200);
    });
  });
});
