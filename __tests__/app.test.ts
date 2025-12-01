import app from '../src/app.js';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import request from 'supertest';
import { seed } from '../src/db/seed/seed.js';
import dropTable from '../src/db/seed/drop.js';
import { data } from '../src/db/data/test/index.js';
import { Score, User, Game } from '../src/types';

expect.extend(matchers);

beforeAll(() => seed(data));
afterAll(() => dropTable());

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

      scores.forEach((score: Score) => {
        expect(score.score_id).toBeNumber();
        expect(score.score).toBeNumber();
        expect(score.user_id).toBeNumber();
        expect(score.username).toBeString();
        expect(score.game_id).toBeNumber();
        expect(score.created_on).toBeString();
        expect(
          /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(score.created_on!)
        ).toBeTrue();
      });
    });

    test('GET score sort by scores by default', async () => {
      const {
        body: { scores }
      } = await request(app).get('/api/games/1/scores').expect(200);

      for (let i = 0; i < scores.length - 1; i++) {
        expect(scores[i].score >= scores[i + 1].score).toBeTrue();
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

    test('GET scores with a score_id query will show the page of the queried score', async () => {
      const testScore = {
        score: 950,
        username: 'testUser'
      };

      const {
        body: {
          score: { score_id }
        }
      } = await request(app).post('/api/games/1/scores').send(testScore).expect(201);

      const {
        body: { scores }
      } = await request(app).get(`/api/games/1/scores/${score_id}`).expect(200);

      expect(scores.length).toBe(10);
      expect(scores[4].score_id).toBe(score_id);
      expect(scores[4].score).toBe(testScore.score);
      expect(scores[4].username).toBe(testScore.username);
    });

    test('GET scores with score_id of top score will show top 10 scores', async () => {
      const testScore = {
        score: 5000,
        username: 'testUser'
      };

      const {
        body: {
          score: { score_id }
        }
      } = await request(app).post('/api/games/1/scores').send(testScore).expect(201);

      const {
        body: { scores }
      } = await request(app).get(`/api/games/1/scores/${score_id}`).expect(200);

      expect(scores.length).toBe(10);
      expect(scores[0].score_id).toBe(score_id);
      expect(scores[0].score).toBe(testScore.score);
      expect(scores[0].username).toBe(testScore.username);
    });

    test('GET scores with score_id of top score will show top 10 scores', async () => {
      const testScore = {
        score: 50,
        username: 'testUser'
      };

      const {
        body: {
          score: { score_id }
        }
      } = await request(app).post('/api/games/1/scores').send(testScore).expect(201);

      const {
        body: { scores }
      } = await request(app).get(`/api/games/1/scores/${score_id}`).expect(200);

      expect(scores.length).toBe(10);
      expect(scores[9].score_id).toBe(score_id);
      expect(scores[9].score).toBe(testScore.score);
      expect(scores[9].username).toBe(testScore.username);
    });
  });
});

describe('POST', () => {
  describe('POST scores', () => {
    test('POST a score when user exists', async () => {
      const testScore = {
        score: 100,
        username: 'testUser1'
      };

      const {
        body: { score }
      } = await request(app).post('/api/games/1/scores').send(testScore).expect(201);

      expect(score.score).toBe(100);
      expect(score.username).toBe('testUser1');
      expect(score.game_id).toBe(1);
    });

    test('POST a guest user and POST a score when user does not exists', async () => {
      const testScore = {
        score: 200,
        username: 'testUser10'
      };

      const {
        body: { score }
      } = await request(app).post('/api/games/1/scores').send(testScore).expect(201);

      const {
        body: { user }
      } = await request(app).get(`/api/users/${score.user_id}`).expect(200);

      expect(user.username).toBe('testUser10');
      expect(score.score).toBe(200);
      expect(score.username).toBe('testUser10');
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
  test('Should return a 404 user not found when passed a user ID that does note exist', () => {
    return request(app)
      .delete('/api/users/99999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe('Sorry, this user does not exist');
      });
  });
  test('Should return a 400 invalud user_id when passed an invalid user_id', () => {
    return request(app)
      .delete('/api/users/invalid')
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe('Please enter a valid user_id');
      });
  });
});
describe('USER ERROR HANDLING', () => {
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
      .get('/api/users/999999999')
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
      .then(({ body }) => {
        expect(body.message).toBe('Please enter a valid game_id');
      });
  
  });
  test('Should return a 400 when passed an invalid score_id', () => {
    return request(app)
    .get('/api/games/1/scores/invalid')
    .expect(400)
    .then(({body}) => {
      expect(body.message).toBe('Please enter a valid score_id')
    })
  });
  test('Should return a 404 when passed a game_id that does not exist', () => {
    return request(app)
      .get('/api/games/9999999/scores')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe('Sorry, this game does not exist');
      });
  });
  test('Should return a 404 when passed a score_id that does not exist', () => {
    return request(app)
      .get('/api/games/1/scores/99999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe('Sorry, this score does not exist');
      });
  });
});
