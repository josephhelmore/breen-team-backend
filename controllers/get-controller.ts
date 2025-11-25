import { Response, Request } from 'express';
import { readUser, readUsers } from '../models/read-model';
import { readScores } from '../models/read-model';

export const getUsers = (req: Request, res: Response) => {
  return readUsers().then(users => {
    res.status(200).send({ msg: users[0] });
  });
};

export const getUser = (req: Request, res: Response) => {
  const article_id = req.params.user_id;

  return readUser(article_id).then(users => {
    res.status(200).send({ msg: users[0] });
  });
};

export const getScores = (req: Request, res: Response) => {
  return readScores().then(scores => {
    res.send(scores);
  });
};
