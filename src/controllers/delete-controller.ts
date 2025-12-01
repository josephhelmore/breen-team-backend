import { Response, Request } from 'express';
import { deleteUser, deleteGameByGameId } from '../models/index.js';
import { userExist, validId } from './controller-error-handling.js';

export const deleteUserId = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  validId(user_id);
  const convertedUserIdToNumber = Number(user_id);
  const [user] = await deleteUser(convertedUserIdToNumber);
  userExist([user]);
  return res.send({ user: user });
};

export const deleteGames = async (req: Request, res: Response) => {
  const { game_id } = req.params;

  const [game] = await deleteGameByGameId(Number(game_id));

  return res.send({ game: game });
};
