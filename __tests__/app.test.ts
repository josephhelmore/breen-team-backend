import app from '../app';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import seedTable from '../db/seed/seed';
import dropTable from '../db/seed/drop';
import request from 'supertest';

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
  });
});
