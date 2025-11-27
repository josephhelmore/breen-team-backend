import app from '../src/app.js';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import request from 'supertest';
import { seed } from '../src/db/seed/seed.js';
import dropTable from '../src/db/seed/drop.js';
import { data } from '../src/db/data/test/index.js';

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
    test('POST user to the database', async () => {
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
    test('DELETE user by Id', async () => {
      return request(app).delete('/api/users/9').expect(200);
    });
  });
});
describe(' USER ERROR HANDLING', () => {
  test('Should return with a status of 400 when passed an invalid user_id is passed', () => {
    return request(app)
      .get('/api/users/invalid')
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe('Please enter a valid user_id');
      });
  });
  test('Should return with a status of 404 when passed a user_id that does not exist', () => {
    return request(app)
      .get('/api/users/99999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe('Sorry, this user does not exist');
      });
  });
  test('Should return with a status of 200 when a user is fetched', () => {
    return request(app)
      .get('/api/users/1')
      .expect(200)
      .then(({ body }) => {
        expect(body.user.user_id).toBe(1);
        expect(typeof body.user.username).toBe('string');
      });
  });
});
describe('SCORES ERROR HANDLING', () => {
  test('Should return a 400 when passed an invalid game_id', () => {
    return request(app)
    .get('/api/games/invalid/scores')
    .expect(400)
    .then(({body}) => {
      console.log(body)
     expect(body.message).toBe('Please enter a valid game_id')
    })
  });
});