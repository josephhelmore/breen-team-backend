import { User } from '../types/index.js';
import { readGame, readScore } from '../models/index.js';

export function isValid(id: string) {
  const num = Number(id);
  if (isNaN(num)) {
    throw {
      status: 400,
      message: 'Please enter a valid id!'
    };
  }
  return num;
}

export function userExist(user: User[]) {
  if (user.length === 0) {
    throw {
      status: 404,
      message: 'Sorry, this user does not exist'
    };
  } else return user;
}
export async function gameExists(game_id: number) {
  const resGame = await readGame(game_id);

  if (resGame.length === 0) {
    throw {
      status: 404,
      message: 'Sorry, this game does not exist'
    };
  }
}
export async function scoreExist(score: number) {
  const resScore = await readScore(score);

  if (resScore.length === 0) {
    throw {
      status: 404,
      message: 'Sorry, this score does not exist'
    };
  }
}
