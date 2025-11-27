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
    const {user_id} = req.params
    const numId = Number(user_id);

    if(isNaN(numId)) {
      return next ({
        status:400,
        message:'Please enter a valid user_id'
      })
    }

    const user = await readUser(numId);
    if(user.length === 0){
      return next({
        status:404,
        message: 'Sorry, this user does not exist'
      })
    }

    return res.status(200).json({ user: user[0] });
  } catch (error) {
    return next(
      new ControllerError({
        name: 'get-username-error',
        message: 'unexpected error',
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
