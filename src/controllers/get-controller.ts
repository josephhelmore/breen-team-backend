import { Response, Request, NextFunction } from 'express';
import { readUser, readUsers } from '../models/read-model.js';
import { readScores } from '../models/index.js';
import { validId, isUser, ValidGameId } from './controller-error-handling.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await readUsers();
  return res.send(users);
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const numId = validId(user_id);
  const user = await readUser(numId);
  isUser(user);
  return res.status(200).json({ user: user[0] });
};

export const getScores = async (req: Request, res: Response, next: NextFunction) => {
  const { p } = req.query;
  const game_id = req.params
  
  
  ValidGameId(game_id.gameid);
  
  const page = Number(p);
  const scores = await readScores(page || 1);
  res.send(scores);
};
