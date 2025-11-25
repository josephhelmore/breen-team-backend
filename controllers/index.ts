import { Response, Request } from 'express';
// import { find } from '../models';
import { getScores } from './get-controller';

// export const findAllUsers = (req: Request, res: Response) => {
//   return find().then(users => {
//     res.status(200).send({ msg: users[0] });
//   });
// };

export { getScores };
