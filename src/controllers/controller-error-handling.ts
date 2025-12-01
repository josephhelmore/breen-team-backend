import { User, Score } from '../types/index.js';
import { readGame, readScore } from '../models/read-model.js';

export function validId(id: string) {
  const num = Number(id);
  if (isNaN(num)) {
    throw {
      status: 400,
      message: 'Please enter a valid user_id'
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
export function ValidGameId(game_id: number) {
  if (Number.isNaN(game_id)) {
    throw {
      status: 400,
      message: 'Please enter a valid game_id'
    };
  } else return game_id;
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

export function validScore(score: number) {
  if (isNaN(score)) {
    throw {
      status: 400,
      message: 'Please enter a valid score_id'
    };
  } else return score;
}
