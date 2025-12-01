import { Response, Request } from 'express';
import { deleteUser, deleteGameByGameId, readUser } from '../models/index.js';
import { userExist, validId } from './controller-error-handling.js';

export const deleteUserId = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  validId(user_id);
  const convertedUserIdToNumber = Number(user_id);
  const user = await readUser(convertedUserIdToNumber)
  userExist(user);
  const [deletedUser] = await deleteUser(convertedUserIdToNumber);
  return res.send({ user: deletedUser });
};

export const deleteGames = async (req: Request, res: Response) => {
  const { game_id } = req.params;

  const [game] = await deleteGameByGameId(Number(game_id));

  return res.send({ game: game });
};
