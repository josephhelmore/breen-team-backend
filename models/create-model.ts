import db from '../db/connection'
import { users } from '../db/data/schema/users'

export const createUser = async (username: string) => {
    return await db.insert(users).values({ username: username })
}