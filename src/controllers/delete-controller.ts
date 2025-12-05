import { Response, Request } from 'express';
import {
  deleteUserById,
  deleteGameByGameId,
  readUserByUserId,
  readUserByGoogleId
} from '../models/index.js';
import { isValid, userExists } from './error-handling-controller.js';
import { RequestWithUser } from '../types/index.js';

export const deleteUser = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  isValid(user_id);
  const convertedUserIdToNumber = Number(user_id);

  const user = await readUserByUserId(convertedUserIdToNumber);
  userExists(user);

  const [deletedUser] = await deleteUserById(convertedUserIdToNumber);
  return res.send({ user: deletedUser });
};

export const deleteUserProfile = async (req: RequestWithUser, res: Response) => {
  const google_id: string = req.user.google_id;

  const profile = await readUserByGoogleId(google_id);

  userExists(profile);

  const [userProfile] = await deleteUserById(profile[0].user_id);

  return res.status(200).send({ user: userProfile });
};

export const deleteGames = async (req: Request, res: Response) => {
  const { game_id } = req.params;

  const [game] = await deleteGameByGameId(Number(game_id));

  return res.send({ game: game });
};
