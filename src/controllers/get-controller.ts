import { Response, Request, NextFunction } from 'express';
import { readUser, readUsers } from '../models/read-model.js';
import { readScores } from '../models/index.js';
import { ControllerError } from './controller-error-handling.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await readUsers();

    return res.send(users);
  } catch (error) {
    return next(
      new ControllerError({
        name: 'get-username-error',
        message: 'Failed to retrieve username',
        cause: error
      })
    );
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = req.params.user_id;
    const convertedUserIdToNumber = Number(user_id);

    const user = await readUser(convertedUserIdToNumber);

    return res.send({ user: user[0] });
  } catch (error) {
    return next(
      new ControllerError({
        name: 'get-username-error',
        message: 'invalid username',
        cause: error
      })
    );
  }
};

export const getScores = async (req: Request, res: Response) => {
  const { p } = req.query;
  const page = Number(p);

  const scores = await readScores(page || 1);

  res.send(scores);
};
