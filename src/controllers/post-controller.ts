import { Response, Request } from 'express';
import { createScore, readUserIdByUsername, createUser, createGame } from '../models/index.js';

export const postUser = async (req: Request, res: Response) => {
  const { username }: { username: string } = req.body;

  const [resUsername] = await createUser(username);

  return res.status(201).send({ user: resUsername });
};
export const postGuestUserAndPostScore = async (req: Request, res: Response) => {
  const { score, username } = req.body;
  const { game_id } = req.params;
  const game_id_num = Number(game_id);

  const response = await readUserIdByUsername(username);

  let user_id: number;

  if (response.length === 0) {
    const resUser = await createUser(username);

    user_id = resUser[0].user_id;
  } else if (typeof response[0].user_id === 'number') {
    user_id = response[0].user_id;
  }
  const [resScore] = await createScore(score, user_id, username, game_id_num);

  return res.status(201).send({ score: resScore });
};

export const postGames = async (req: Request, res: Response) => {
  const { name } = req.body;

  const [resGame] = await createGame(name);

  return res.status(201).send({ game: resGame });
};
