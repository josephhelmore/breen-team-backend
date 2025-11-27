import { readUser, readUsers } from '../models/read-model';
import { readScores } from '../models/index';
export const getUsers = async (req, res) => {
    const users = await readUsers();
    return res.send(users);
};
export const getUser = async (req, res) => {
    const user_id = req.params.user_id;
    const convertedUserIdToNumber = Number(user_id);
    const user = await readUser(convertedUserIdToNumber);
    return res.send({ user: user[0] });
};
export const getScores = async (req, res) => {
    const { p } = req.query;
    const page = Number(p);
    const scores = await readScores(page || 1);
    res.send(scores);
};
//# sourceMappingURL=get-controller.js.map