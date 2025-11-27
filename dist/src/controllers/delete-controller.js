import { deleteUser } from '../models';
export const deleteUserId = async (req, res) => {
    const user_id = req.params.user_id;
    const convertedUserIdToNumber = Number(user_id);
    const user = await deleteUser(convertedUserIdToNumber);
    res.send(user);
};
//# sourceMappingURL=delete-controller.js.map