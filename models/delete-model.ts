import { sql } from 'drizzle-orm'
import db from '../db/connection'
import { users } from '../db/data/schema/users'

export const deleteUser = async (user_id: string) => {
    return await db.delete(users).where(sql`${users.user_id} = ${user_id}`)
}