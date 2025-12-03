import { Response, Request, NextFunction } from 'express';
import { RequestWithUser } from '../types/index.js';
import {
  readScores,
  readScoresByScoreId,
  readGames,
  readUserByGoogleId,
  readUsers,
  readScoresByUser
} from '../models/index.js';
import { userExist, gameExists, scoreExist, isValid } from './controller-error-handling.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await readUsers();
  return res.send({ users: users });
};

export const getUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const google_id: string = req.user.userId;

  const profile = await readUserByGoogleId(google_id);

  userExist(profile);

  const userProfile = profile[0];

  const scores = await readScoresByUser(userProfile.user_id);

  return res.status(200).json({ user: { profile: userProfile, scores: scores } });
};

export const getScores = async (req: Request, res: Response, next: NextFunction) => {
  const { p } = req.query;
  const { game_id } = req.params;

  const numGame_id = Number(game_id);

  isValid(game_id);

  await gameExists(numGame_id);

  const page = Number(p);
  const scores = await readScores(page || 1, numGame_id);
  return res.send(scores);
};

export const getScoresByScoreId = async (req: Request, res: Response, next: NextFunction) => {
  const { game_id, score_id } = req.params;

  const numScore_id = Number(score_id);
  const numGame_id = Number(game_id);

  isValid(game_id);

  await gameExists(numGame_id);

  const scores = await readScoresByScoreId(numScore_id, numGame_id);

  isValid(score_id);
  await scoreExist(numScore_id);
  return res.send(scores);
};

export const getGames = async (req: Request, res: Response, next: NextFunction) => {
  const games = await readGames();

  return res.send({ games: games });
};
