import app from '../src/app.js';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import seedTable from '../src/db/seed/seed-test.js';
import dropTable from '../src/db/seed/drop.js';
import request from 'supertest';

expect.extend(matchers);

beforeAll(() => seedTable(50));
afterAll(() => dropTable())
describe('GET', () => {
  describe('GET /users', () => {
    interface User {
      user_id: number;
      username: string;
      created_on: string;
    }

    test('GET all users from database', async () => {
      const { body } = await request(app).get('/api/users').expect(200);
      const users: User[] = body;
      users.forEach(user => {
        expect(user.user_id).toBeNumber();
        expect(user.username).toBeString();
        expect(user.created_on).toBeString();
        expect(
          /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(user.created_on)
        ).toBeTrue();
      });
    });

    test('GET user by id', async () => {
      const {
        body: { user }
      } = await request(app).get('/api/users/3').expect(200);
      expect(user.user_id).toBeNumber();
      expect(user.username).toBeString();
      expect(user.created_on).toBeString();
      expect(/^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(user.created_on)).toBeTrue();
    });
  });
  describe('GET /scores', () => {
    test('GET scores from database', async () => {
      const {
        body: { scores }
      } = await request(app).get('/api/games/1/scores').expect(200);

      scores.forEach(score => {
        expect(score.score_id).toBeNumber();
        expect(score.score).toBeNumber();
        expect(score.user_id).toBeNumber();
        expect(score.username).toBeString();
        expect(score.game_id).toBeNumber();
        expect(score.created_on).toBeString();
        expect(
          /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(score.created_on)
        ).toBeTrue();
      });
    });

    test('GET score sort by scores by default', async () => {
      const {
        body: { scores }
      } = await request(app).get('/api/games/1/scores').expect(200);

      for (let i = 0; i < scores.length - 1; i++) {
        expect(scores[i].score > scores[i + 1].score).toBeTrue();
      }
    });

    test('GET scores pagination of 10 score per page and shows page 1 by default', async () => {
      const {
        body: { scores, page }
      } = await request(app).get('/api/games/1/scores').expect(200);

      expect(scores.length).toBe(10);
      expect(page).toBe(1);
    });

    test('GET scores shows the correct page and correct scores corresponding to the page', async () => {
      const {
        body: { scores: scores1, page: page1 }
      } = await request(app).get('/api/games/1/scores?p=1').expect(200);

      const {
        body: { scores: scores2, page: page2 }
      } = await request(app).get('/api/games/1/scores?p=2').expect(200);

      expect(page1).toBe(1);
      expect(page2).toBe(2);
      expect(scores1[0].score_id).not.toBe(scores2[0].score_id);
    });
  });
});
