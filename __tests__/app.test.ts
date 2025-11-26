import app from '../app';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import seedTable from '../db/seed/seed';
import dropTable from '../db/seed/drop';
import request from 'supertest';
import db from '../db/connection';
import { users } from '../db/data/schema/users';
import { games } from '../db/data/schema/games';

expect.extend(matchers);

beforeAll(() => seedTable());
afterAll(() => dropTable());

describe('GET', () => {
  describe('GET /scores', () => {
    test('GET scores from database', async () => {
      const {
        body: { scores }
      } = await request(app).get('/api/scores').expect(200);

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
      } = await request(app).get('/api/scores').expect(200);

      for (let i = 0; i < scores.length - 1; i++) {
        expect(scores[i].score > scores[i + 1].score).toBeTrue();
      }
    });

    test('GET scores pagination of 10 score per page and shows page 1 by default', async () => {
      const {
        body: { scores, page }
      } = await request(app).get('/api/scores').expect(200);

      expect(scores.length).toBe(10);
      expect(page).toBe(1);
    });

    test('GET scores shows the correct page and correct scores corresponding to the page', async () => {
      const {
        body: { scores: scores1, page: page1 }
      } = await request(app).get('/api/scores?p=1').expect(200);

      const {
        body: { scores: scores2, page: page2 }
      } = await request(app).get('/api/scores?p=2').expect(200);

      expect(page1).toBe(1);
      expect(page2).toBe(2);
      expect(scores1[0].score_id).not.toBe(scores2[0].score_id);
    });
  });

  describe('GET /users', () => {
    test.only('GET all users from database', async () => {
      const { body } = await request(app).get('/api/users').expect(200);
      const users = body
      users.forEach(user => {
        expect(user.user_id).toBeNumber();
        expect(user.username).toBeString();
        expect(user.created_on).toBeString();
        expect(
          /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(user.created_on)
        ).toBeTrue();
      });
    });

    test.only('GET user by id', async () => {
      const { body: { user } } = await request(app).get('/api/users/3').expect(200);
      expect(user.user_id).toBeNumber();
      expect(user.username).toBeString();
      expect(user.created_on).toBeString();
      expect(
        /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(user.created_on)
      ).toBeTrue();

    });

  });
});

describe('POST', () => {
  describe('POST scores', () => {
    test('POST a score', async () => {
      await dropTable();
      await db.insert(users).values({ user_id: 40, username: 'test_user' });
      await db.insert(games).values({ game_id: 50, name: 'test_game' });

      const testScore = {
        score: 100,
        user_id: 40,
        username: 'test_user',
        game_id: 50
      };

      const {
        body: { score }
      } = await request(app).post('/api/scores').send(testScore).expect(201);

      expect(score.score).toBe(100);
      expect(score.user_id).toBe(40);
      expect(score.username).toBe('test_user');
      expect(score.game_id).toBe(50);
      await seedTable();
    });
  });
  describe('POST /users', () => {
    test.only('POST user to the database', async () => {
      const newUser = {
        username: 'Gilson',
      }

      const {
        body: { user }
      } = await request(app).post('/api/users').send(newUser).expect(201);

      console.log(user)
      expect(user).toHaveProperty("user_id");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("created_on");
      expect(typeof user).toBe("object");
      expect(typeof user.user_id).toBe("number");
      expect(typeof user.username).toBe("string");
      expect(typeof user.created_on).toBe("string");
    })
  })
});

describe('DELETE', () => {
  describe('DELETE /users', () => {
    test.only('DELETE user by Id', async () => {
      return request(app).delete('/api/users/9').expect(200)
    })
  })
});