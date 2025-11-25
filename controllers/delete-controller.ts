import { Response, Request } from "express"
import { readUser, readUsers } from "../models/read-model"
import { deleteUser } from "../models/delete-model"

export const deleteUserId = (req: Request, res: Response) => {
    const article_id = req.params.user_id

    return deleteUser(article_id).then((users) => {
        res.status(204).send()
    })
}
