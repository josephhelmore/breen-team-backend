import { Response, Request, NextFunction } from 'express';
import { readUser, readUsers } from '../models/read-model.js';
import { readScores, readScoresByScoreId, readGames } from '../models/index.js';
import {
  validId,
  userExist,
  ValidGameId,
  gameExists,
  scoreExist,
  validScore
} from './controller-error-handling.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await readUsers();
  return res.send(users);
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const numId = validId(user_id);
  const user = await readUser(numId);
  
  userExist(user);
  
  return res.status(200).json({ user: user[0] });
};

export const getScores = async (req: Request, res: Response, next: NextFunction) => {
  const { p } = req.query;
  const { game_id } = req.params;

  const numGame_id = Number(game_id);

  ValidGameId(numGame_id);

  await gameExists(numGame_id);

  const page = Number(p);
  const scores = await readScores(page || 1, numGame_id);
  res.send(scores);
};

export const getScoresByScoreId = async (req: Request, res: Response, next: NextFunction) => {
  const { game_id, score_id } = req.params;

  const numScore_id = Number(score_id);
  const numGame_id = Number(game_id);

  ValidGameId(numGame_id);

  await gameExists(numGame_id);

  const scores = await readScoresByScoreId(numScore_id, numGame_id);

  validScore(numScore_id);
  await scoreExist(numScore_id);
  res.send(scores);
};

export const getGames = async (req: Request, res: Response, next: NextFunction) => {
  const games = await readGames();

  return res.send({ games: games });
};
