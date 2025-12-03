import app from '../src/app.js';
import db from '../src/db/connection.js';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import request from 'supertest';
import { seed } from '../src/db/seed/seed.js';
import dropTable from '../src/db/seed/drop.js';
import { data } from '../src/db/data/test/index.js';
import { Score, User, Game } from '../src/types';
import jwt from 'jsonwebtoken';
import { users } from '../src/db/data/schema.js';
import { eq } from 'drizzle-orm';

expect.extend(matchers);

let testToken: string;

beforeAll(async () => {
  testToken = await jwt.sign({ google_id: 'test_google_id' }, process.env.SESSION_SECRET!, {
    expiresIn: '7d'
  });
  await seed(data);
});
afterAll(() => dropTable());

describe('GET', () => {
  describe('GET /users', () => {
    test('GET all users from database', async () => {
      const {
        body: { users }
      }: {
        body: { users: User[] };
      } = await request(app).get('/api/users').expect(200);

      expect(users.length).toBe(data.usersData.length);

      users.forEach(user => {
        expect(user.user_id).toBeNumber();
        expect(user.username).toBeString();
        expect(user.created_on).toBeString();
        expect(
          /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(user.created_on!)
        ).toBeTrue();
      });
    });

    test('GET user by google_id', async () => {
      const {
        body: {
          user: { profile }
        }
      }: {
        body: { user: { profile: User } };
      } = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      expect(profile.username).toBeString();
      expect(profile.avatar_url).toBe('test_avatar_url');
      expect(profile.email).toBe('test_email');
      expect(profile.bio).toBe('test bio');
    });

    test('GET user profile attached with a score object with scores with each game', async () => {
      const {
        body: {
          user: { scores }
        }
      } = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      expect(Object.keys(scores).length).toBe(data.gamesData.length);
      for (const game in scores) {
        scores[game].forEach(score => expect(score.game_id).toBe(Number(game)));
      }
    });

    describe('GET USER ERROR HANDLING', () => {
      test.skip('Unauthorised user profile get request will be status 401', async () => {
        const {
          body: { message }
        }: { body: { message: string } } = await request(app).get('/users/profile').expect(401);

        expect(message).toBe('You need to log in to see this page.');
      });
      // test('Should return with a status of 400 when passed an invalid user_id is passed', () => {
      //   return request(app)
      //     .get('/api/users/invalid')
      //     .expect(400)
      //     .then(({ body }) => {
      //       expect(body.message).toBe('Please enter a valid id!');
      //     });
      // });

      // test('Should return with a status of 404 when passed a user_id that does not exist', () => {
      //   return request(app)
      //     .get('/api/users/999999999')
      //     .expect(404)
      //     .then(({ body }) => {
      //       expect(body.message).toBe('Sorry, this user does not exist');
      //     });
      // });

      // test('Should return with a status of 200 when a user is fetched', () => {
      //   return request(app)
      //     .get('/api/users/1')
      //     .expect(200)
      //     .then(({ body }) => {
      //       expect(body.user.user_id).toBe(1);
      //       expect(typeof body.user.username).toBe('string');
      //     });
      // });
    });
  });

  describe('GET /games/:game_id/scores', () => {
    test('GET scores from database', async () => {
      const {
        body: { scores }
      }: {
        body: { scores: Score[] };
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
        expect(score.rank).toBeNumber();
        expect(score.rank! <= 10).toBeTrue();
      });
    });

    test('GET score sort by scores descending for game 1', async () => {
      const {
        body: { scores }
      }: {
        body: { scores: Score[] };
      } = await request(app).get('/api/games/1/scores').expect(200);

      for (let i = 0; i < scores.length - 1; i++) {
        expect(scores[i].score >= scores[i + 1].score).toBeTrue();
      }
    });

    test('GET scores pagination of 10 score per page and shows page 1 by default', async () => {
      const {
        body: { scores, page }
      }: {
        body: { scores: Score[]; page: number };
      } = await request(app).get('/api/games/1/scores').expect(200);

      expect(scores.length).toBe(10);
      expect(page).toBe(1);
    });

    test('GET scores shows the correct page and correct scores corresponding to the page', async () => {
      const {
        body: { scores: scores1, page: page1 }
      }: {
        body: { scores: Score[]; page: number };
      } = await request(app).get('/api/games/1/scores?p=1').expect(200);

      const {
        body: { scores: scores2, page: page2 }
      }: {
        body: { scores: Score[]; page: number };
      } = await request(app).get('/api/games/1/scores?p=2').expect(200);

      expect(page1).toBe(1);
      expect(page2).toBe(2);
      expect(scores1[0].score_id).not.toBe(scores2[0].score_id);
    });

    test('GET scores shows the correct score with the corresponding game', async () => {
      const {
        body: { scores }
      }: {
        body: { scores: Score[] };
      } = await request(app).get('/api/games/2/scores').expect(200);

      scores.forEach(score => {
        expect(score.game_id).toBe(2);
      });
    });

    test('GET scores for game 2 has ascending order by scores ', async () => {
      const {
        body: { scores }
      }: {
        body: { scores: Score[] };
      } = await request(app).get('/api/games/2/scores').expect(200);

      for (let i = 0; i < scores.length - 1; i++) {
        expect(scores[i].score <= scores[i + 1].score).toBeTrue();
      }
    });

    test('GET /scores/:score_id', async () => {
      const {
        body: { scores }
      }: {
        body: { scores: Score[] };
      } = await request(app).get('/api/games/1/scores/1').expect(200);

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
        expect(score.rank).toBeNumber();
      });
    });

    test('GET scores/:score_id shows the correct score with the corresponding game', async () => {
      const testScore = {
        username: 'testUser1',
        score: 500
      };

      const {
        body: { score }
      } = await request(app).post('/api/games/2/scores').send(testScore).expect(201);

      const {
        body: { scores }
      }: {
        body: { scores: Score[] };
      } = await request(app)
        .get('/api/games/2/scores/' + score.score_id)
        .expect(200);

      scores.forEach((score: Score) => {
        expect(score.game_id).toBe(2);
      });
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

    describe('SCORES ERROR HANDLING', () => {
      test('Should return a 400 when passed an invalid game_id', () => {
        return request(app)
          .get('/api/games/invalid/scores')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('Please enter a valid id!');
          });
      });

      test('Should return a 400 when passed an invalid score_id', () => {
        return request(app)
          .get('/api/games/1/scores/invalid')
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe('Please enter a valid id!');
          });
      });

      test('Should return a 404 when passed a game_id that does not exist', () => {
        return request(app)
          .get('/api/games/9999999/scores')
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe('Sorry, this game does not exist');
          });
      });

      test('Should return a 404 when passed a score_id that does not exist', async () => {
        return request(app)
          .get('/api/games/1/scores/99999999')
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe('Sorry, this score does not exist');
          });
      });
    });
  });

  describe('GET /games', () => {
    test('GET games table', async () => {
      const {
        body: { games }
      } = await request(app).get('/api/games').expect(200);

      games.forEach((game: Game) => {
        expect('game_id' in game).toBeTrue();
        expect('name' in game).toBeTrue();
      });
    });
  });
});

describe('POST', () => {
  describe('POST /games/:game_id/scores', () => {
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

      const [user] = await db.select().from(users).where(eq(users.username, score.username));

      expect(user.username).toBe('testUser10');
      expect(score.score).toBe(200);
      expect(score.username).toBe('testUser10');
      expect(score.game_id).toBe(1);
    });
  });

  describe('POST /users', () => {
    test('POST user to the database', async () => {
      const newUser = {
        username: 'testNewUser'
      };

      const {
        body: { user }
      } = await request(app).post('/api/users').send(newUser).expect(201);

      expect(user).toHaveProperty('user_id');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('created_on');
      expect(typeof user.user_id).toBe('number');
      expect(user.username).toBe('testNewUser');
      expect(typeof user.created_on).toBe('string');
      expect(/^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(user.created_on!)).toBeTrue();
    });

    describe('POST USER ERROR HANDLING', () => {
      test('Status 400 for duplicated username', async () => {
        const {
          body: { message }
        }: { body: { message: string } } = await request(app)
          .post('/api/users')
          .send({ username: 'testUser1' })
          .expect(400);

        expect(message).toBe('Username already exists');
      });
    });
  });

  test('POST /games', async () => {
    const {
      body: { game }
    } = await request(app).post('/api/games').send({ name: 'test_game' }).expect(201);

    expect(game.name).toBe('test_game');
  });
});

describe('PATCH', () => {
  describe('PATCH /users/:user_id', () => {
    test('Update username', async () => {
      const {
        body: { user }
      }: {
        body: { user: User };
      } = await request(app)
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ username: 'updatedTestUser8' })
        .expect(200);

      expect(Object.keys(user).length).toBe(5);
      expect(user.google_id).toBe('test_google_id');
      expect(user.username).toBe('updatedTestUser8');
      expect(user.bio).toBe('test bio');
      expect(user.email).toBe('test_email');
      expect(user.avatar_url).toBe('test_avatar_url');
    });

    test('Update bio', async () => {
      const {
        body: { user }
      }: {
        body: { user: User };
      } = await request(app)
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ bio: 'test updated bio' })
        .expect(200);

      expect(Object.keys(user).length).toBe(5);
      expect(user.google_id).toBe('test_google_id');
      expect(user.username).toBe('updatedTestUser8');
      expect(user.bio).toBe('test updated bio');
      expect(user.email).toBe('test_email');
      expect(user.avatar_url).toBe('test_avatar_url');
    });

    describe('Error handling', () => {
      test('Status 400, username already exists', async () => {
        const {
          body: { message }
        } = await request(app)
          .patch('/api/users/profile')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ username: 'testUser2' })
          .expect(400);

        expect(message).toBe('Username already exists');
      });
    });
  });
});

describe('DELETE', () => {
  describe('DELETE /users', () => {
    test('DELETE user by Id', async () => {
      const {
        body: { user }
      } = await request(app).delete('/api/users/9').expect(200);

      expect(user.user_id).toBe(9);
    });
  });

  describe('DELETE /games', () => {
    test('DELETE /games/:game_id', async () => {
      const {
        body: { game }
      } = await request(app).delete('/api/games/5').expect(200);

      expect(game.game_id).toBe(5);
    });
  });

  describe('Error handling', () => {
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
          expect(body.message).toBe('Please enter a valid id!');
        });
    });
  });
});

describe('Invalid Path', () => {
  test('Should provide a 404 error when passed an invalid path', async () => {
    const {
      body: { message }
    }: {
      body: { message: string };
    } = await request(app).get('/api/invalid/invalid').expect(404);

    expect(message).toBe('Path not found');
  });
});
