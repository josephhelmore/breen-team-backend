import { User } from '../types/index.js';
import { readGame, readScore } from '../models/index.js';

export const isValid = (id: string): number => {
  const num = Number(id);
  if (isNaN(num)) {
    throw {
      status: 400,
      message: 'Please enter a valid id!'
    };
  }
  return num;
};

export const userExists = (user: User[]): User[] => {
  if (user.length === 0) {
    throw {
      status: 404,
      message: 'Sorry, this user does not exist'
    };
  } else return user;
};
export const gameExists = async (game_id: number) => {
  const resGame = await readGame(game_id);

  if (resGame.length === 0) {
    throw {
      status: 404,
      message: 'Sorry, this game does not exist'
    };
  }
};
export const scoreExists = async (score: number) => {
  const resScore = await readScore(score);

  if (resScore.length === 0) {
    throw {
      status: 404,
      message: 'Sorry, this score does not exist'
    };
  }
};

export const validPatchBody = <ColumnType>(columnArray: ColumnType[]) => {
  if (columnArray.every(column => column === undefined)) {
    throw {
      status: 400,
      message: 'Missing patch body'
    };
  }
};
