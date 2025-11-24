import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import db from '../db/connection';
import * as matchers from 'jest-extended';

expect.extend(matchers);

describe('Seed users table', () => {
  test('should check if users table has the correct fields and values', () => {});
});
