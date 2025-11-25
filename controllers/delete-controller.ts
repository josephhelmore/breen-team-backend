import { Response, Request } from "express"
import { deleteUser } from "../models/delete-model"

export const deleteUserId = (req: Request, res: Response) => {
    const user_id = req.params.user_id

    return deleteUser(user_id).then(() => {
        return res.status(204).send()
    })
}
