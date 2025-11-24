import { Response, Request } from "express"
import { find } from "../models"

export const findAllUsers = (req: Request, res: Response) => {
    return find().then((users) => {
        res.status(200).send({ msg: users[0] })
    })
}