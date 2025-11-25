import { Response, Request } from "express"
import { deleteUser } from "../models/delete-model"

export const deleteUserId = async (req: Request, res: Response) => {
    const user_id = req.params.user_id
    const convertedUserIdToNumber = Number(user_id)
    const user = await deleteUser(convertedUserIdToNumber)

    res.send(user)
}



